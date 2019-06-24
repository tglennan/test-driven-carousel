import React from 'react';
import { shallow } from 'enzyme';
import HasIndex from '../HasIndex';
import { wrap } from 'module';

describe('HasIndex()', () => {
  const MockComponent = () => null;
  MockComponent.displayName = 'MockComponent';

  const MockComponentWithIndex = HasIndex(MockComponent, 'index');

  it('has the expected display name', () => {
    expect(MockComponentWithIndex.displayName).toBe('HasIndex(MockComponent)');
  });

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MockComponentWithIndex />);
  });

  it('has an initial index of 0', () => {
    expect(wrapper.state('index')).toBe(0);
  });

  it('passes the `index` state down as the `index` prop', () => {
    expect(wrapper.prop('index')).toBe(0);
    wrapper.setState({ index: 1 });
    expect(wrapper.prop('index')).toBe(1);
  });

  it('has an `index` state of 2 when decremented from 3', () => {
    wrapper.setState({ index: 3 });
    wrapper.prop('indexDecrement')();
    expect(wrapper.prop('index')).toBe(2);
  });

  it('has an `index` state of 1 when incremented', () => {
    wrapper.prop('indexIncrement')();
    expect(wrapper.prop('index')).toBe(1);
  });

  it('loops around to the max `index` when decremented from 0', () => {
    wrapper.setState({ index: 0 });
    wrapper.prop('indexDecrement')(3);
    expect(wrapper.prop('index')).toBe(3);
  });

  it('loops around to 0 when incremented passed the max `index`', () => {
    wrapper.setState({ index: 3 });
    wrapper.prop('indexIncrement')(3);
    expect(wrapper.prop('index')).toBe(0);
  });
});