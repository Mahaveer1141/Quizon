import "../App.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

function Nvbar() {
  const [showCollapsedMenu, setCollapseMenu] = useState(false);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const toggleMenu = () => {
    setCollapseMenu(() => !showCollapsedMenu);
  };
  const dropdowneMenu = () => {
    setShowDropdownMenu(() => !showDropdownMenu);
  };

  const show = showCollapsedMenu ? "show" : "";
  const showDropdown = showDropdownMenu ? "show" : "";

  useEffect(() => {
    setAuth(Boolean(window.localStorage.getItem("isAuth")));
    setUser(JSON.parse(window.localStorage.getItem("CurrentUser")));
  }, [isAuth]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <a className="navbar-brand" style={{ fontSize: "2rem" }} href="/">
            Quizon
          </a>
          {isAuth ? (
            <ul className="navbar-nav ml-lg-auto">
              <li className="nav-item dropdown">
                <a
                  onClick={dropdowneMenu}
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {user.username}
                </a>
                <div
                  className={"dropdown-menu " + showDropdown}
                  aria-labelledby="navbarDropdown"
                >
                  <a className="dropdown-item" href="/my_quiz">
                    My Quiz
                  </a>
                  <a className="dropdown-item" href="#">
                    Quiz scores
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/logout">
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          ) : (
            <>
              <button
                onClick={toggleMenu}
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className={"collapse navbar-collapse " + show}
                id="navbarNav"
              >
                <ul className="navbar-nav ml-lg-auto">
                  <li className="nav-item">
                    {" "}
                    <a href="/login" className="nav-link smoothScroll">
                      Login
                    </a>{" "}
                  </li>
                  <li className="nav-item">
                    {" "}
                    <a href="/register" className="nav-link smoothScroll">
                      Register
                    </a>{" "}
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nvbar;
