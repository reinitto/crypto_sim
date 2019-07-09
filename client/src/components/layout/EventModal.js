import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

const EventModal = ({ events, quests }) => {
  const [event, setEvents] = useState([]);
  const [quest, setQuests] = useState([]);

  useEffect(() => {
    setEvents(events);
    setQuests(quests);
  }, [events, quests]);

  const messages = event.concat(quest);

  //   let instance = M.Modal.getInstance(
  //     document.getElementById(`event-modal`).children[0]
  //   );

  const dismissEvent = id => {
    let newEvents = event.filter(e => e.id !== id);
    let newQuests = quest.filter(e => e.id !== id);
    setEvents(newEvents);
    setQuests(newQuests);
  };
  const createEvent = e => {
    return (
      <div key={e.id} id={e.id} style={{ background: 'teal', opacity: '0.75' }}>
        <div className='modal-content'>
          <h4>New Event</h4>
          <p>{e.message}</p>
          Cost: {e.details.cost}
          ID: {e.id}
        </div>
        <div className='modal-footer'>
          <button
            onClick={() => dismissEvent(e.id)}
            className='modal-close waves-effect waves-green btn-flat'
          >
            Agree
          </button>
        </div>
      </div>
    );
  };

  //   const eventContent =
  //     event.length > 0 &&
  //     event.map(e => (
  //       <div key={e.id} id={e.id} className='modal'>
  //         <div className='modal-content'>
  //           <h4>New Event</h4>
  //           <p>{e.message}</p>
  //           {e.details.cost}
  //           {e.id}
  //         </div>
  //         <div className='modal-footer'>
  //           <button
  //             onClick={() => dismissEvent(e.id)}
  //             className='modal-close waves-effect waves-green btn-flat'
  //           >
  //             Agree
  //           </button>
  //         </div>
  //       </div>
  //     ));

  //   const questContent =
  //     quest.length > 0 &&
  //     quest.map(q => (
  //       <div key={q.id} id={q.id} className='modal'>
  //         <div className='modal-content'>
  //           <h4>New Event</h4>
  //           <p>{q.message}</p>
  //           {q.details.cost}
  //           {q.id}
  //         </div>
  //         <div className='modal-footer'>
  //           <button
  //             onClick={() => dismissEvent(q.id)}
  //             className='modal-close waves-effect waves-green btn-flat'
  //           >
  //             Agree
  //           </button>
  //         </div>
  //       </div>
  //     ));
  let content;
  if (messages.length > 0) {
    content = messages.map(m => createEvent(m));
  }

  return (
    <div
      id='event-modal'
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

export default connect(mapStateToProps)(EventModal);
