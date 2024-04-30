import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ThemeToggler } from "./themeToggler";

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowMenu(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <header className="p-2">
      <div className="container mt-2">
        <div className="row ">
          <nav className="navbar navbar-expand-lg bg-body-tertiary p-2 rounded">
            <div className="col">
              <NavLink
                className="navbar-brand d-flex justify-content-start ms-1 text-primary fw-bold"
                to="/"
              >
                Magic Bowl
              </NavLink>
            </div>
            <div className="col">
              <div
                className="collapse multi-collapse navbar-collapse justify-content-center"
                id="navbarNav"
              >
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <NavLink
                      style={({ isActive, isTransitioning }) => {
                        return {
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "#007bff" : "",
                          viewTransitionName: isTransitioning ? "slide" : "",
                        };
                      }}
                      className="nav-link"
                      to="/"
                    >
                      Recipes
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      style={({ isActive, isTransitioning }) => {
                        return {
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "#007bff" : "",
                          viewTransitionName: isTransitioning ? "slide" : "",
                        };
                      }}
                      className="nav-link"
                      to="/chefs"
                    >
                      Chefs
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      style={({ isActive, isTransitioning }) => {
                        return {
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "#007bff" : "",
                          viewTransitionName: isTransitioning ? "slide" : "",
                        };
                      }}
                      className="nav-link"
                      to="/search"
                    >
                      Search
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      style={({ isActive, isTransitioning }) => {
                        return {
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "#007bff" : "",
                          viewTransitionName: isTransitioning ? "slide" : "",
                        };
                      }}
                      className="nav-link"
                      to="/dashboard"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col d-flex justify-content-end me-1">
              <ThemeToggler />
              <NavLink to="/login" className="btn btn-outline-primary">
                Login
              </NavLink>
              <button
                className="navbar-toggler ms-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav1"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            {showMenu && (
              <div
                className="collapse multi-collapse navbar-collapse ms-1"
                id="navbarNav1"
              >
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <NavLink className="nav-link" to="#">
                      Recipes
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="#">
                      Chefs
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="#">
                      Search
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
