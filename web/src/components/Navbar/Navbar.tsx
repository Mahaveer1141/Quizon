import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../utills/types";
import { useNavigate } from "react-router-dom";

import "./Navbar.scss";
import { clearToken } from "../../utills/utils";

function Navbar() {
  const navigate = useNavigate();
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const dropdowneMenu = () => {
    setShowDropdownMenu(!showDropdownMenu);
  };

  const showDropdown = showDropdownMenu ? "show" : "";

  const { me, status } = useSelector((state: RootState) => state.user);
  const isAuth = status === "success";

  const logout = () => {
    clearToken();
    navigate("/login");
  };

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
                <div
                  onClick={dropdowneMenu}
                  className="nav-link dropdown-toggle"
                  role="button"
                >
                  {me.username}
                </div>
                <div
                  className={"dropdown-menu " + showDropdown}
                  aria-labelledby="navbarDropdown"
                >
                  <a className="dropdown-item" href="/my_quiz">
                    My Quiz
                  </a>
                  {/* <a className="dropdown-item" href="#">
                    Quiz scores
                  </a> */}
                  <div className="dropdown-divider"></div>
                  <div onClick={logout} className="dropdown-item">
                    Logout
                  </div>
                </div>
              </li>
            </ul>
          ) : (
            <>
              <button
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

              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-lg-auto">
                  <li className="nav-item">
                    {" "}
                    <a href="/login" className="nav-link smoothScroll">
                      Login
                    </a>{" "}
                  </li>
                  <li className="nav-item">
                    <a href="/register" className="nav-link smoothScroll">
                      Register
                    </a>
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

export default Navbar;
