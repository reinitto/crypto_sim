import React from 'react';
import PropTypes from 'prop-types';

const NextWeekButton = ({ nextWeek, user }) => {
  return (
    <button
      data-test='nextweek-button'
      disabled={user.timesToInvestLeft > 0}
      className='btn-floating btn-large red'
      onClick={() => nextWeek()}
    >
      <i className='large material-icons'>arrow_forward</i>
      Next Week
    </button>
  );
};

NextWeekButton.propTypes = {
  nextWeek: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default NextWeekButton;
