import shallowEqual from 'shallowequal';
import ReactDOMServer from 'react-dom/server';
import React, { Children } from 'react';
import sideEffect from './side-effect';

const Head = props => null;
const HEAD_ATTR = 'data-head-react';

const REACT_CUSTOM_TAGS = {
  charSet: 'charset',
  httpEquiv: 'http-equiv',
};

const generateComponents = (components) => {
  const buffer = components.map((comp) => {
    switch (comp.type) {
      case 'title':
        return comp;
      case 'style':
      case 'script':
      case 'noscript':
        return comp.props.children ? React.createElement(comp.type, {
          dangerouslySetInnerHTML: { __html: comp.props.children },
          'data-head-react': true,
        }) : comp;
      default:
        return React.createElement(comp.type, {
          ...comp.props,
          'data-head-react': true,
        });
    }
  });

  buffer.reverse();
  const filteredTags = [];
  for (let i = 0; i < buffer.length; i += 1) {
    const element = buffer[i];
    const canTitle = element.type === 'title' && !filteredTags.some(obj => obj.type === 'title');
    const canBase = element.type === 'base' && !filteredTags.some(obj => obj.type === 'base');
    if (canTitle) {
      filteredTags.push(element);
    } else if (canBase) {
      filteredTags.push(element);
    } else if (element.type !== 'title' && element.type !== 'base' &&
        !filteredTags.some(obj => shallowEqual(element.props, obj.props))) {
      filteredTags.push(element);
    }
    // }
  }
  filteredTags.reverse();
  return filteredTags;
};

function isComponentInCollection(comp, collection) {
  if (!comp.props.dangerouslySetInnerHTML) {
    return collection.some(item => shallowEqual(comp.props, item.props));
  }
  return collection.some(item =>
    shallowEqual(comp.props.dangerouslySetInnerHTML, item.props.dangerouslySetInnerHTML));
}

let virtualHead;
function headDiff(comps) {
  let addedTags = [];
  let removedTags = [];
  if (virtualHead) {
    addedTags = comps.filter(comp => !isComponentInCollection(comp, virtualHead));
    removedTags = virtualHead.filter(comp => !isComponentInCollection(comp, comps));
  } else {
    addedTags = comps;
  }
  virtualHead = comps;
  return { addedTags, removedTags };
}

function updateTag(comp, remove) {
  const headEl = document.head;
  const genericTag = comp.props.dangerouslySetInnerHTML;
  let query;
  for (let key in comp.props) {
    if (key !== 'children' && key !== 'dangerouslySetInnerHTML' && key !== 'data-head-react') {
      if (comp.props.hasOwnProperty(key)) {
        const htmlKey = REACT_CUSTOM_TAGS[key] ? REACT_CUSTOM_TAGS[key] : key;
        query = query ? `${query}[${htmlKey}='${comp.props[key]}']` : `[${htmlKey}='${comp.props[key]}']`;
      }
    }
  }
  const el = headEl.querySelectorAll(query)[0];
  if (remove) {
    el.parentNode.removeChild(el);
    return;
  }
  if (el && el.hasAttribute(HEAD_ATTR)) {
    el.removeAttribute(HEAD_ATTR);
  } else {
    const newTag = document.createElement(comp.type);
    for (let key in comp.props) {
      if (comp.props.hasOwnProperty(key) && key !== 'children' && key !== 'dangerouslySetInnerHTML') {
        newTag[key] = comp.props[key];
      }
    }
    if (genericTag) {
      newTag.innerHTML = genericTag.__html;
    }
    headEl.appendChild(newTag);
  }
}

function toStatic(comp) {
  return ReactDOMServer.renderToStaticMarkup(comp);
}

function getHeadStatic(comps) {
  let head;
  for (let i = 0; i < comps.length; i += 1) {
    head = !head ? toStatic(comps[i]) : head + toStatic(comps[i]);
  }
  return head;
}

function reduceComponentsToState(headMountedInstances) {
  const headTags = headMountedInstances // Array of mounted instances
    .map(child => child.props.children) // Return each instance with children
    .filter(child => !!child) // Check each child to be an object
    .map(child => Children.toArray(child)) // If child is only one convert to array
    .reduce((a, b) => a.concat(b), []); // Generate an unique array

  return generateComponents(headTags); // Remove duplicated tags and filter unique tags like title
}

function handleClientChange(comps) {
  const diff = headDiff(comps); // Get components diff
  diff.addedTags.forEach((comp) => { // Update each diff tag
    if (comp.type === 'title') {
      document.title = comp.props.children;
    } else {
      updateTag(comp);
    }
  });
  diff.removedTags.forEach((comp) => { // Remove unused tags
    if (comp.type !== 'title') {
      updateTag(comp, true);
    }
  });
}

// What returns when I call rewind()
function mapStateOnServer(comps) {
  return getHeadStatic(comps);
}

module.exports = sideEffect(reduceComponentsToState, handleClientChange, mapStateOnServer)(Head);
