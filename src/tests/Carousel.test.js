import React from 'react';
import { shallow } from 'enzyme';
import Carousel, { Carousel as CoreCarousel } from '../Carousel.js';
import CarouselButton from '../CarouselButton.js';
import CarouselSlide from '../CarouselSlide.js';

describe('Carousel', () => {
  let wrapper;
  const slides = [
    {
      imgUrl: 'https://example/com/slide1.png',
      description: 'Slide 1',
      attribution: 'John Smith',
    },
    {
      imgUrl: 'https://example/com/slide2.png',
      description: 'Slide 2',
      attribution: 'Jan Smath',
    },
    {
      imgUrl: 'https://example/com/slide3.png',
      description: 'Slide 3',
      attribution: 'Jon Smoth',
    },
  ];

  describe('component with HOC', () => {
    /// Tests against Carousel
    beforeEach(() => {
      wrapper = shallow(<Carousel slides={slides} />);
    });

    it('sets slideIndex={0} on the coreComponent', () => {
      expect(wrapper.find(CoreCarousel).prop('slideIndex')).toBe(0);
    });

    it('passes down `slides` to the core component', () => {
      expect(wrapper.find(CoreCarousel).prop('slides')).toBe(slides);
    });
  });

  describe('core component', () => {
    // Tests against core carousel
    const slideIndexDecrement = jest.fn();
    const slideIndexIncrement = jest.fn();

    beforeEach(() => {
      wrapper = shallow(
        <CoreCarousel
          slides={slides}
          slideIndex={0}
          slideIndexIncrement={slideIndexIncrement}
          slideIndexDecrement={slideIndexDecrement}
        />
      );
    });

    it('renders a div', () => {
      expect(wrapper.type()).toBe('div');
    });

    it('renders a CarouselButton labelled "Prev"', () => {
      expect(
        wrapper
          .find(CarouselButton)
          .at(0)
          .prop('children')
      ).toBe('Prev');
    });

    it('renders a CarouselButton labelled "Next"', () => {
      expect(
        wrapper
          .find(CarouselButton)
          .at(1)
          .prop('children')
      ).toBe('Next');
    });

    beforeEach(() => {
      wrapper.setState({ slideIndex: 1 });
    });

    it('decrements `slideIndex` when prev is clicked', () => {
      wrapper.find('[data-action="prev"]').simulate('click');
      expect(slideIndexDecrement).toHaveBeenCalledWith(slides.length);
    });

    it('increments `slideIndex` when next is clicked', () => {
      wrapper.find('[data-action="next"]').simulate('click');
      expect(slideIndexIncrement).toHaveBeenCalledWith(slides.length);
    });

    it('renders the current slide as a CarouselSlide', () => {
      let slideProps;
      slideProps = wrapper.find(CarouselSlide).props();
      expect(slideProps).toEqual({
        ...CarouselSlide.defaultProps,
        ...slides[0],
      });

      wrapper.setProps({ slideIndex: 1 });
      slideProps = wrapper.find(CarouselSlide).props();
      expect(slideProps).toEqual({
        ...CarouselSlide.defaultProps,
        ...slides[1],
      });
    });

    it('passes defaultImg and defaultImgHeight to the CarouselSlide', () => {
      const defaultImg = () => 'test';
      const defaultImgHeight = 1234;

      wrapper.setProps({ defaultImg, defaultImgHeight });
      expect(wrapper.find(CarouselSlide).prop('Img')).toBe(defaultImg);
      expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(
        defaultImgHeight
      );
    });

    it('allows individual slides to override Img and imgHeight', () => {
      const Img = () => 'test';
      const imgHeight = 1234;
      wrapper.setProps({
        slides: [{ ...slides[0], Img, imgHeight }, slides[1]],
      });
      expect(wrapper.find(CarouselSlide).prop('Img')).toBe(Img);
      expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(imgHeight);
    });
  });
});
