import { Link} from "react-router-dom";
import { useContext } from "react";

import classes from "./MainNavigation.module.css";
import AuthContext from "../../store/authContext";

const MainNavigation = () => {
  const authCntx = useContext(AuthContext);
  const loggedIn = authCntx.isLoggedIn;

  const logOutHandler=()=>{
    authCntx.logout();
  }

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!loggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {loggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {loggedIn && (
            <li>
              <button onClick={logOutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
