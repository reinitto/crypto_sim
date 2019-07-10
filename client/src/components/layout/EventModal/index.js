import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeQuest, removeEvent } from '../../../actions/eventActions';
import EventModalItem from './Item';

export class EventModal extends Component {
  constructor(props) {
    super(props);
  }
  dismissEventById = id => {
    this.props.removeQuest(id);
    this.props.removeEvent(id);
  };

  render() {
    const { events, quests } = this.props;
    const messages = events.concat(quests);
    let content;
    //Render only if messages length > 0
    if (messages.length > 0) {
      content = (
        <EventModalItem
          event={messages[0]}
          onClickFunction={this.dismissEventById}
        />
      );

      return (
        <div
          id='event-modal'
          data-test='component-eventModal'
          /// that style doesnt work
          style={{ position: 'fixed', top: '35%', left: '10%' }}
        >
          {content}
        </div>
      );
    } else {
      return null;
    }
  }
}

EventModal.propTypes = {
  removeQuest: PropTypes.func.isRequired,
  removeEvent: PropTypes.func.isRequired,
  events: PropTypes.array,
  quests: PropTypes.array
};

EventModal.defaultProps = {
  events: [],
  quests: []
};

const mapStateToProps = ({ events: { events, quests } }) => ({
  events,
  quests
});

export default connect(
  mapStateToProps,
  { removeQuest, removeEvent }
)(EventModal);
