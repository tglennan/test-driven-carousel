import React from 'react';
import { shallow } from 'enzyme';
import AutoAdvances from '../AutoAdvances';

describe('AutoAdvances()', () => {
  const MockComponent = () => null;
  MockComponent.displayName = 'MockComponent';

  const MockComponentWithAutoAdvance = AutoAdvances(
    MockComponent,
    'index',
    'upperBound'
  );

  it('has the expected display name', () => {
    expect(MockComponentWithAutoAdvance.displayName).toBe(
      'AutoAdvances(MockComponent)'
    );
  });

  const autoAdvanceDelay = 10e3;
  const upperBound = 5;
  let indexIncrement;
  let wrapper;

  beforeEach(() => {
    indexIncrement = jest.fn();
    jest.useFakeTimers();

    wrapper = shallow(
      <MockComponentWithAutoAdvance
        autoAdvanceDelay={autoAdvanceDelay}
        index={0}
        indexIncrement={indexIncrement}
        upperBound={upperBound}
      />
    );
  });

  it('calls the increment function after `autoAdvanceDelay`', () => {
    jest.advanceTimersByTime(autoAdvanceDelay);
    expect(indexIncrement).toHaveBeenCalledWith(upperBound);
  });

  it('uses `upperBound.length - 1` if upperBound is an array', () => {
    wrapper.setProps({ upperBound: [1, 2, 3] });
    jest.advanceTimersByTime(autoAdvanceDelay);
    expect(indexIncrement).toHaveBeenCalledWith(2);
  });

  it('does not set a timer if `autoAdvanceDelay` ≤ 0', () => {
    wrapper.setProps({ index: 1, autoAdvanceDelay: 0 });
    jest.advanceTimersByTime(999999);
    expect(indexIncrement).not.toHaveBeenCalled();
  });

  it('resets the timer when the target prop changes', () => {
    jest.advanceTimersByTime(autoAdvanceDelay - 1);
    wrapper.setProps({ index: 1 });
    jest.advanceTimersByTime(1);
    expect(indexIncrement).not.toHaveBeenCalled();
    jest.advanceTimersByTime(autoAdvanceDelay);
    expect(indexIncrement).toHaveBeenCalled();
  });

  it('clears the timer on unmount', () => {
    wrapper.unmount();
    jest.advanceTimersByTime(autoAdvanceDelay);
    expect(indexIncrement).not.toHaveBeenCalled();
  });
});
