import React, { useEffect } from 'react';
import { advanceTime, saveUser } from '../../actions/userActions';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
const GameMenu = ({ user, advanceTime, saveUser }) => {
  useEffect(() => {
    //Init Materialize JS
    M.AutoInit();
  });
  const nextWeek = () => {
    advanceTime();
  };
  const save = () => {
    if (user) {
      saveUser(user);
    }
  };
  if (user) {
    return (
      <div className='fixed-action-btn'>
        <button className='btn-floating btn-large red' onClick={nextWeek}>
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

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(
  mapStateToProps,
  { advanceTime, saveUser }
)(GameMenu);
