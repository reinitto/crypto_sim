import React, { Fragment } from 'react';
import { connect } from 'react-redux';

export const Alerts = ({ alerts }) => {
  return (
    <div data-test='component-alerts'>
      {alerts &&
        alerts.length > 0 &&
        alerts.map(alert => (
          <div
            data-test='component-alert'
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

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(Alerts);
