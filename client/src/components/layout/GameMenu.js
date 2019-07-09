import React, { useEffect } from 'react';
import { advanceTime, saveUser } from '../../actions/userActions';
import { removeTodaysCryptos } from '../../actions/cryptoActions';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import { addEvent, addQuest } from '../../actions/eventActions';

const GameMenu = ({
  user,
  advanceTime,
  saveUser,
  addEvent,
  addQuest,
  removeTodaysCryptos,
  events,
  quests
}) => {
  useEffect(() => {
    //Init Materialize JS
    M.AutoInit();
  });

  const nextWeek = () => {
    if (user.timesToInvestLeft < 1) {
      addEvent();
      addQuest();
      removeTodaysCryptos(user.time);
      advanceTime();
    }
  };
  const save = () => {
    if (user) {
      saveUser(user);
    }
  };
  if (user) {
    return (
      <div className='fixed-action-btn'>
        <button
          disabled={user.timesToInvestLeft > 0}
          className='btn-floating btn-large red'
          onClick={nextWeek}
        >
          <i className='large material-icons'>arrow_forward</i>
          Next Week
        </button>
        <ul>
          <li>
            <a href='#!' className='btn-floating blue btn-small' onClick={save}>
              <i className='tiny material-icons'>save</i>
            </a>
          </li>
        </ul>
      </div>
    );
  } else {
    return '';
  }
};

const mapStateToProps = ({ user, events }) => ({
  user,
  events: events.events,
  quests: events.quests
});

export default connect(
  mapStateToProps,
  { advanceTime, saveUser, addEvent, addQuest, removeTodaysCryptos }
)(GameMenu);
