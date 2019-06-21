import React from 'react';
import { shallow, mount } from 'enzyme';
import CarouselSlide from '../CarouselSlide';

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

  it('Renders props.Img and a <figcaption> as children', () => {
    expect(wrapper.childAt(0).type()).toEqual(CarouselSlide.defaultProps.Img);
    expect(wrapper.childAt(1).type()).toEqual('figcaption');
  });

  it('passes `imgUrl` through to the props.Img', () => {
    const img = wrapper.find(CarouselSlide.defaultProps.Img);
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

describe('Img', () => {
  let mounted;
  const imgUrl = 'https://example.com/image.png';

  beforeEach(() => {
    const Img = CarouselSlide.defaultProps.Img;
    mounted = mount(<Img src={imgUrl} height={500} />);
  });

  it('renders an <img> with the given src', () => {
    expect(mounted.containsMatchingElement(<img src={imgUrl} />)).toBe(true);
  });
});
