import React, { Component } from 'react';
import { advanceTime, saveUser } from '../../../actions/userActions';
import { removeTodaysCryptos } from '../../../actions/cryptoActions';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import { addEvent, addQuest } from '../../../actions/eventActions';
import NextWeekButton from './NextWeekButton';
import PropTypes from 'prop-types';

export class GameMenu extends Component {
  componentDidMount() {
    //Init Materialize JS
    M.AutoInit();
  }
  nextWeek = () => {
    this.props.addEvent();
    this.props.addQuest();
    this.props.removeTodaysCryptos(this.props.user.time);
    this.props.advanceTime();
  };
  save = user => {
    if (user) {
      this.props.saveUser(user);
    }
  };

  render() {
    const { user } = this.props;

    if (user) {
      return (
        <div className='fixed-action-btn' data-test='component-gameMenu'>
          <NextWeekButton nextWeek={this.nextWeek.bind(this)} user={user} />
          <ul>
            <li>
              <a
                href='#!'
                className='btn-floating blue btn-small'
                onClick={this.save.bind(this)}
              >
                <i className='tiny material-icons'>save</i>
              </a>
            </li>
          </ul>
        </div>
      );
    } else {
      return '';
    }
  }
}

GameMenu.propTypes = {
  user: PropTypes.object,
  advanceTime: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  addEvent: PropTypes.func.isRequired,
  addQuest: PropTypes.func.isRequired,
  removeTodaysCryptos: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(
  mapStateToProps,
  { advanceTime, saveUser, addEvent, addQuest, removeTodaysCryptos }
)(GameMenu);
