import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const Alerts = ({ alerts }) => {
  return (
    <div data-test='component-alerts'>
      {alerts &&
        alerts.length > 0 &&
        alerts.map(alert => (
          <div
            data-test='alerts-item'
            key={alert.id}
            className={`alert ${alert.type}`}
          >
            <i className='fas fa-info-circle' />
            {alert.msg}
          </div>
        ))}
    </div>
  );
};
Alerts.propTypes = {
  alerts: PropTypes.array
};

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(Alerts);
