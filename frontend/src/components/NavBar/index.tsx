import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { useEffect, useContext } from 'react';
import { getTokenData, isAuthenticated } from '../../util/auth';
import { removeAuthData } from '../../util/storage';
import history from '../../util/history';

import './styles.css';

const NavBar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="navbar navbar-expand-md bg-primary main-nav">
      <div className="container-fluid">
        {authContextData.authenticated ? (
          <Link to="/movies" className="nav-logo-text">
            <h4>MovieFlix</h4>
          </Link>
        ) : (
          <Link to="/" className="nav-logo-text">
            <h4>MovieFlix</h4>
          </Link>
        )}

        <div className="nav-login-logout">
          {authContextData.authenticated && (
            <button className="nav-button-logout" onClick={handleLogoutClick}>
              Sair
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
