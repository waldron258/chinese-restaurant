import { Fragment } from "react";
import { NavLink } from "react-router-dom";

import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>
          <NavLink to="/" className={classes.title}>
            Chinese Food
          </NavLink>
        </h1>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink to="/create-food" activeclassname={classes.active}>
                Create a Food
              </NavLink>
            </li>
            <li>
              <NavLink to="/find-food" activeclassname={classes.active}>
                Find Food
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
