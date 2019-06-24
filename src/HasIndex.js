import React from 'react';

export default (Component, indexPropName) =>
  class ComponentWithIndex extends React.PureComponent {
    static displayName = `HasIndex(${Component.displayName || Component.name})`;

    state = {
      index: 0,
    };

    indexIncrement = upperBound => {
      this.setState(({ index }) => ({
        index: upperBound && index + 1 > upperBound ? 0 : index + 1,
      }));
    };

    indexDecrement = upperBound => {
      this.setState(({ index }) => ({
        index: upperBound && index - 1 < 0 ? upperBound : index - 1,
      }));
    };

    render() {
      const indexProps = {
        [indexPropName]: this.state.index,
        [`${indexPropName}Increment`]: this.indexIncrement,
        [`${indexPropName}Decrement`]: this.indexDecrement,
      };

      return <Component {...indexProps} {...this.props} />;
    }
  };
