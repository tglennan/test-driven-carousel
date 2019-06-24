import React from 'react';
import PropTypes from 'prop-types';

const capitalize = s => `${s[0].toUpperCase()}${s.slice(1)}`;

export default (Component, indexPropName) => {
  const defaultIndexPropName = `default${capitalize(indexPropName)}`;

  return class ComponentWithIndex extends React.PureComponent {
    static displayName = `HasIndex(${Component.displayName || Component.name})`;

    static propTypes = {
      [indexPropName]: PropTypes.number,
      [defaultIndexPropName]: PropTypes.number,
      onIndexChange: PropTypes.func,
    };

    static defaultProps = {
      [defaultIndexPropName]: 0,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      if (
        nextProps[indexPropName] !== undefined &&
        nextProps[indexPropName] !== null &&
        nextProps[indexPropName] !== prevState.index
      ) {
        return { index: nextProps[indexPropName] };
      }

      return null;
    }

    constructor(props) {
      super(props);
      this.state = {
        index: props[defaultIndexPropName],
      };
    }

    handleIncrement = upperBound => {
      const { onIndexChange } = this.props;
      this.setState(({ index }) => {
        const newIndex = upperBound && index + 1 > upperBound ? 0 : index + 1;
        if (onIndexChange) {
          onIndexChange({ target: { value: newIndex } });
        }

        return { index: newIndex };
      });
    };

    handleDecrement = upperBound => {
      const { onIndexChange } = this.props;
      this.setState(({ index }) => {
        const newIndex = upperBound && index - 1 < 0 ? upperBound : index - 1;
        if (onIndexChange) {
          onIndexChange({ target: { value: newIndex } });
        }

        return { index: newIndex };
      });
    };

    render() {
      const { [defaultIndexPropName]: _defaultIndexProp, ...rest } = this.props;

      const indexProps = {
        [indexPropName]: this.state.index,
        [`${indexPropName}Increment`]: this.handleIncrement,
        [`${indexPropName}Decrement`]: this.handleDecrement,
      };

      return <Component {...rest} {...indexProps} />;
    }
  };
};
