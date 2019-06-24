import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CarouselButton from './CarouselButton.js';
import CarouselSlide from './CarouselSlide.js';
import HasIndex from './HasIndex';
import AutoAdvances from './AutoAdvances';

export class Carousel extends PureComponent {
  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
      .isRequired,
    defaultImgHeight: CarouselSlide.propTypes.imgHeight,
    defaultImg: CarouselSlide.propTypes.Img,
    slideIndex: PropTypes.number.isRequired,
    slideIndexIncrement: PropTypes.func.isRequired,
    slideIndexDecrement: PropTypes.func.isRequired,
  };

  static defaultProps = {
    defaultImg: CarouselSlide.defaultProps.Img,
    defaultImgHeight: CarouselSlide.defaultProps.imgHeight,
  };

  handlePrevClick = () => {
    const { slideIndexDecrement, slides } = this.props;
    slideIndexDecrement(slides.length - 1);
  };

  handleNextClick = () => {
    const { slideIndexIncrement, slides } = this.props;
    slideIndexIncrement(slides.length - 1);
  };

  render() {
    const {
      slideIndex,
      defaultImg,
      defaultImgHeight,
      slides,
      slideIndexIncrement: _slideIndexIncrement,
      slideIndexDecrement: _slideIndexDecrement,
      ...rest
    } = this.props;
    return (
      <div {...rest}>
        <CarouselSlide
          Img={defaultImg}
          imgHeight={defaultImgHeight}
          {...slides[slideIndex]}
        />
        <CarouselButton data-action="prev" onClick={this.handlePrevClick}>
          Prev
        </CarouselButton>
        <CarouselButton data-action="next" onClick={this.handleNextClick}>
          Next
        </CarouselButton>
      </div>
    );
  }
}

Carousel.propTypes = {};

export default HasIndex(
  AutoAdvances(Carousel, 'slideIndex', 'slides'),
  'slideIndex'
);
