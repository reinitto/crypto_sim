import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../../actions/userActions';

export const Navbar = ({ title, icon, user, logoutUser }) => {
  const logout = () => {
    logoutUser();
  };
  const guestLinks = (
    <ul data-test='navbar-links-guest'>
      <li>
        <Link to='/'>Home</Link>
      </li>
    </ul>
  );
  const authLinks = (
    <ul data-test='navbar-links-auth'>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <a onClick={logout} data-test='logout-button'>
          Logout
        </a>
      </li>
    </ul>
  );

  return (
    <div className='navbar-fixed' data-test='component-navbar'>
      <nav className='amber'>
        <div className='nav-wrapper'>
          <div className='navbar  bg-primary'>
            <a href='/#' className='brand-logo center' data-test='navbar-title'>
              <i className={icon} />
              {title}
            </a>
            {user ? authLinks : guestLinks}
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
  title: 'CryptoSim',
  icon: 'fas fa-id-card-alt'
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
