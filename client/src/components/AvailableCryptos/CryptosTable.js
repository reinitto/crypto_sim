import React from 'react';
import PropTypes from 'prop-types';

export const CryptosTable = ({ children, sortCryptos }) => (
  <table data-test='component-cryptos-table' className='centered'>
    <thead>
      <tr>
        <th>
          <a
            style={{ display: 'block' }}
            data-test='button-sort-by-name'
            href='#!'
            onClick={() => sortCryptos('name')}
          >
            <span>Name</span>
            <small className='left valign-wrapper'>
              <i className='material-icons tiny '>sort_by_alpha</i>
            </small>
          </a>
        </th>
        <th>
          <a
            data-test='button-sort-by-change'
            style={{ display: 'block' }}
            href='#!'
            onClick={() => sortCryptos('change')}
          >
            <span>Change</span>
            <small className='left valign-wrapper'>
              <i className='material-icons tiny '>sort</i>
            </small>
          </a>
        </th>
        <th>
          <a
            data-test='button-sort-by-price'
            style={{ display: 'block' }}
            href='#!'
            onClick={() => sortCryptos('price')}
          >
            <span>Price</span>
            <small className='left valign-wrapper'>
              <i className='material-icons tiny '>sort</i>
            </small>
          </a>
        </th>

        <th>Buy</th>
        <th>Sell</th>
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

CryptosTable.propTypes = {
  sortCryptos: PropTypes.func.isRequired,
  children: PropTypes.array
};

export default CryptosTable;
