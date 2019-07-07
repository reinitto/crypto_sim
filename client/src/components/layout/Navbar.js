import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/userActions';

const Navbar = ({ title, icon, user, logoutUser }) => {
  const logout = () => {
    logoutUser();
    console.log('logout user');
  };
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/'>Home</Link>
      </li>
    </Fragment>
  );
  const authLinks = (
    <Fragment>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <a onClick={logout}>Logout</a>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar-fixed'>
      <nav className='amber'>
        <div className='nav-wrapper'>
          <div className='navbar  bg-primary'>
            <a href='/#' className='brand-logo center'>
              <i className={icon} />
              {title}
            </a>
            <ul>{user ? authLinks : guestLinks}</ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'CryptoSim'
  //   icon: 'fas fa-id-card-alt'
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
