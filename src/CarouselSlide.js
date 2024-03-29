import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DefaultImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: ${props =>
    typeof props.imgHeight === 'number'
      ? `${props.imgHeight}px`
      : props.imgHeight};
`;

const CarouselSlide = ({
  Img,
  imgUrl,
  imgHeight,
  description,
  attribution,
  ...rest
}) => (
  <figure {...rest}>
    <Img src={imgUrl} imgHeight={imgHeight} />
    <figcaption>
      <strong>{description}</strong> {attribution}
    </figcaption>
  </figure>
);

CarouselSlide.propTypes = {
  Img: PropTypes.elementType,
  imgUrl: PropTypes.string.isRequired,
  imgHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  description: PropTypes.string.isRequired,
  attribution: PropTypes.string,
};

CarouselSlide.defaultProps = {
  imgHeight: 500,
  Img: DefaultImg,
};

export default CarouselSlide;
