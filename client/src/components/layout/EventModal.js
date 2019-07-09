import React from 'react';
import { connect } from 'react-redux';
import { removeQuest, removeEvent } from '../../actions/eventActions';

export const EventModal = ({
  events = [],
  quests = [],
  removeQuest,
  removeEvent
}) => {
  const messages = events.concat(quests);

  const dismissEventById = id => {
    console.log(id);
    removeQuest(id);
    removeEvent(id);
  };
  const createEvent = e => {
    return (
      <div
        key={e.id}
        id={e.id}
        style={{ background: 'teal', opacity: '0.75' }}
        data-test='modal-event'
      >
        <div className='modal-content'>
          <h4>New Event</h4>
          <p>{e.message}</p>
          Cost: {e.details.cost}
          ID: {e.id}
        </div>
        <div className='modal-footer'>
          <button
            onClick={() => dismissEventById(e.id)}
            className='modal-close waves-effect waves-green btn-flat'
          >
            Agree
          </button>
        </div>
      </div>
    );
  };

  let content;
  if (messages.length > 0) {
    content = messages.map(m => createEvent(m));
  }

  return (
    <div
      id='event-modal'
      data-test='component-eventModal'
      /// that style doesnt work
      style={{ position: 'fixed', top: '35%', left: '10%' }}
    >
      {(content && content[0]) || ''}
    </div>
  );
};

const mapStateToProps = ({ events: { events, quests } }) => ({
  events,
  quests
});

export default connect(
  mapStateToProps,
  { removeQuest, removeEvent }
)(EventModal);
