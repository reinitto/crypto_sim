import React from 'react';
import PropTypes from 'prop-types';

export function Item({ event, onClickFunction }) {
  return (
    <div
      key={event.id}
      id={event.id}
      style={{ background: 'teal', opacity: '0.75' }}
      data-test='eventModal-item'
    >
      <div className='modal-content'>
        <h4>New Event</h4>
        <p>{event.message}</p>
        Cost: {event.details && event.details.cost && event.details.cost}
        ID: {event.id}
      </div>
      <div className='modal-footer'>
        <button
          data-test='modal-accept-button'
          onClick={() => onClickFunction(event.id)}
          className='modal-close waves-effect waves-green btn-flat'
        >
          Agree
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  event: PropTypes.object.isRequired,
  onClickFunction: PropTypes.func.isRequired
};

export default Item;
