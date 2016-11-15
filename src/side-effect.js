const React = require('react');
const Component = React.Component;

module.exports = function withSideEffect (reduceComponentsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reduceComponentsToState !== 'function') {
    throw new Error('Expected reduceComponentsToState to be a function.')
  }

  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.')
  }

  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.')
  }

  function getDisplayName (WrappedComp) {
    return WrappedComp.displayName || WrappedComp.name || 'Component'
  }

  return (WrappedComp) => {
    if (typeof WrappedComp !== 'function') {
      throw new Error('Expected WrappedComp to be a React component.')
    }
    let mountedInstances = [];
    let state;

    function emitChange (component) {
      state = reduceComponentsToState([...mountedInstances]);

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient.call(component, state)
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state)
      }
    }

    class SideEffect extends Component {

      static peek () {
        return state
      }

      static rewind () {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.')
        }

        const recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      }

      componentWillMount () {
        mountedInstances.push(this);
        emitChange(this);
      }

      componentDidUpdate () {
        emitChange(this);
      }

      componentWillUnmount () {
        const ind = mountedInstances.indexOf(this);
        mountedInstances.splice(ind, 1);
        emitChange(this);
      }

      render () {
        return <WrappedComp>{ this.props.children }</WrappedComp>;
      }
    }

    SideEffect.canUseDOM = typeof window !== 'undefined';
    SideEffect.displayName = `SideEffect(${getDisplayName(WrappedComp)})`;

    return SideEffect
  }
};