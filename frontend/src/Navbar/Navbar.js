import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = function (props) {
  // make a call to the backend to log the user out
  async function userLoggedOut() {
    const logoutResult = await fetch("/auth/logout", {
      method: "GET",
    });
    const parsedLogoutResult = await logoutResult.json();
    if (parsedLogoutResult.loggedOut) {
      toast.success("Logged out");
      props.logoutPressed();
    } else {
      toast.error("Couldn't logout. Please try again.");
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MediMind
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* we will only render the dashboard and profile links if they're loggedin  */}
            {props.isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/dashboard">
                  Pill Box
                </Link>
              </li>
            )}
            {props.isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/medications">
                  Manage Medications
                </Link>
              </li>
            )}
            {props.isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            )}
          </ul>
          {props.isLoggedIn ? (
            <button className="btn" onClick={userLoggedOut}>
              Logout
            </button>
          ) : (
            <Link className="btn" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
