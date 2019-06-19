import React from 'react';
import { shallow } from 'enzyme';
import CarouselSlide from '../CarouselSlide';
import { wrap } from 'module';

describe('CarouselSlide', () => {
  let wrapper;
  const imgUrl = 'https://example.com/image.png';
  const description = 'A truly poetic description of the displayed image.';

  beforeEach(() => {
    wrapper = shallow(
      <CarouselSlide imgUrl={imgUrl} description={description} />
    );
  });

  it('Renders a figure', () => {
    expect(wrapper.type()).toEqual('figure');
  });

  it('Renders an <img> and a <figcaption> as children', () => {
    expect(wrapper.childAt(0).type()).toEqual('img');
    expect(wrapper.childAt(1).type()).toEqual('figcaption');
  });

  it('passes `imgUrl` through to the <img>', () => {
    const img = wrapper.find('img');
    expect(img.prop('src')).toBe(imgUrl);
  });

  it('uses `description` and `attribution` as the <figcaption>', () => {
    const attribution = 'John Smith';

    wrapper.setProps({ attribution });
    expect(wrapper.find('figcaption').text()).toBe(
      `${description} ${attribution}`
    );

    expect(wrapper.find('figcaption strong').text()).toBe(description);
  });

  it('passes other props to the <figure>', () => {
    const style = {};
    const onClick = () => {};
    const className = 'my-carousel-slide';

    wrapper.setProps({ style, onClick, className });

    expect(wrapper.prop('style')).toBe(style);
    expect(wrapper.prop('onClick')).toBe(onClick);
    expect(wrapper.prop('className')).toBe(className);
  });
});
