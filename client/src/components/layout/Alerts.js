import React from 'react';
import { connect } from 'react-redux';

const Alerts = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;
  return (
    alerts &&
    alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.id} className={`alert ${alert.type}`}>
        <i className='fas fa-info-circle' />
        {alert.msg}
      </div>
    ))
  );
};

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(Alerts);
