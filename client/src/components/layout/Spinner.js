import React, { Fragment } from 'react';
import spinner from './spinner.gif';
export const Spinner = () => {
  return (
    <Fragment>
      <img
        data-test='component-spinner'
        src={spinner}
        alt='spinner'
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </Fragment>
  );
};

export default Spinner;
