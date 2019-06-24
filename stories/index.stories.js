import React from 'react';

import { storiesOf } from '@storybook/react';
import Carousel from '../src/Carousel';
import slides from '../example/slides';

import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Carousel', module).add('deafult', () => (
  <Carousel slides={slides} />
));
