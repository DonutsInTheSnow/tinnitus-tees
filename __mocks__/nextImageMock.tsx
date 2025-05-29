// const NextImageMock = (props) => {
//   // eslint-disable-next-line @next/next/no-img-element
//   return <img alt={props.alt || ''} {...props} />;
// };

// export default NextImageMock;

/* eslint-disable @next/next/no-img-element */
// This is a test mock of next/image. Using <img> is fine here.


import React from 'react';
import type { ImgHTMLAttributes } from 'react';

// This silences "any" and still mocks Image correctly
const Image = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  return <img {...props} alt={props.alt || ''} />;
};

export default Image;




