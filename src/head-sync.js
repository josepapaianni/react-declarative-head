import React, { Children } from 'react';
import ReactDOMServer from 'react-dom/server';
import sideEffect from './side-effect';
import shallowEqual from 'shallowequal';

// Plain empty component;
const Head = props => null;
const HEAD_ATTR = 'data-head-react';

const REACT_CUSTOM_TAGS = {
  charSet: 'charset',
  httpEquiv: 'http-equiv',
};

const generateComponents = (components) => {
  const buffer = [];
  const filteredTags = [];
  const tags = components.reverse();
  for (let i = 0; i < tags.length; i += 1) {
    let component;
    switch (tags[i].type) {
      case 'title':
        component = tags[i];
        break;
      case 'style':
      case 'script':
      case 'noscript':
        component = tags[i].props.children ? React.createElement(tags[i].type, {
          dangerouslySetInnerHTML: {__html: tags[i].props.children},
          'data-head-react': true,
        }) : tags[i];
        break;
      default:
        component = React.createElement(tags[i].type, {
          ...tags[i].props,
          'data-head-react': true,
        });
    }
    buffer.push(component);
  }

  for (let i = 0; i < buffer.length; i += 1) {
    const element = buffer[i];
    if (filteredTags.length === 0) filteredTags.push(element);
    const notSameProps = !filteredTags.some(obj => shallowEqual(buffer[i].props, obj.props));
    const notTitle = buffer[i].type === 'title' && !filteredTags.some(obj => obj.type === 'title');
    const notBase = buffer[i].type === 'base' && !filteredTags.some(obj => obj.type === 'base');
    if (notSameProps && (notTitle || notBase)) filteredTags.push(element);
  }
  filteredTags.reverse();
  console.log(filteredTags)
  return filteredTags;
};

let virtualHead;
// TODO: Check removed components
function headDiff(comps) {
  let diff = [];
  if (virtualHead) {
    diff = comps.filter((comp) => {
      if (!comp.props.dangerouslySetInnerHTML) {
        const notSameProps = !virtualHead.some(item => shallowEqual(comp.props, item.props));
        return notSameProps ? comp : null;
      } else {
        const notSameChilds = !virtualHead.some(item =>
          shallowEqual(comp.props.dangerouslySetInnerHTML, item.props.dangerouslySetInnerHTML));
        return notSameChilds ? comp : null;
      }
    });
  } else {
    diff = comps;
  }
  virtualHead = comps;
  return diff;
}

function updateTag(comp) {
  const headEl = document.head;
  const genericTag = comp.props.dangerouslySetInnerHTML;
  let query;
  for (let key in comp.props) {
    if (key !== 'children' && key !== 'dangerouslySetInnerHTML') {
      if (comp.props.hasOwnProperty(key)) {
        const htmlKey = REACT_CUSTOM_TAGS[key] ? REACT_CUSTOM_TAGS[key] : key;
        query = query ? `${query}[${htmlKey}='${comp.props[key]}']` : `[${htmlKey}='${comp.props[key]}']`;
      }
    }
  }
  const el = headEl.querySelectorAll(query)[0];
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
  const diffed = headDiff(comps); // Get components diff
  diffed.forEach((comp) => { // Update each diff tag
    if (comp.type === 'title') {
      document.title = comp.props.children;
    } else {
      updateTag(comp);
    }
  });
}

// What returns when I call rewind()
function mapStateOnServer(comps) {
  return {
    toStatic: () => getHeadStatic(comps),
    // toComponent: () => {
    //   return createElement('head', null, comps);
    // }
  };
}

export default sideEffect(reduceComponentsToState, handleClientChange, mapStateOnServer)(Head);
