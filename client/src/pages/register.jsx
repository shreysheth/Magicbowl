import { NavLink } from "react-router-dom";

export const Register = () => {
  return (
    <>
      <div className="card position-absolute top-50 start-50 translate-middle">
        <div className="card-header">
          <h2 className=" text-center">Register</h2>
        </div>
        <form className="p-4">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="name"
              />
              <div id="name" className="form-text">
                We&apos;ll never share your name with anyone else.
              </div>
            </div>
            <div className="col">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                aria-describedby="username"
              />
              <div id="username" className="form-text">
                We&apos;ll never share your username with anyone else.
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We&apos;ll never share your email with anyone else.
              </div>
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Username
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We&apos;ll never share your email with anyone else.
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                aria-describedby="password"
              />
              <div id="password" className="form-text">
                We&apos;ll never share your password with anyone else.
              </div>
            </div>
            <div className="col">
              <label htmlFor="confirmPassword" className="form-label">
                Username
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                aria-describedby="confirmPassword"
              />
              <div id="confirmPassword" className="form-text">
                We&apos;ll never share your conf-pass with anyone else.
              </div>
            </div>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="chefSignUpCheck"
            />
            <label className="form-check-label" htmlFor="chefSignUpCheck">
              are you registering as a chef ?
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <NavLink className="link-offset-3 pb-4 text-center" to="/login">
          Already have an account? Login
        </NavLink>
      </div>
    </>
  );
};
