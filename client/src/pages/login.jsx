import { NavLink } from "react-router-dom";

export const Login = () => {
  return (
    <>
    <div className="card position-absolute top-50 start-50 translate-middle">
        <div className="card-header">

        <h2 className=" text-center">Login</h2>
        </div>
      <form className="p-4">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Username or Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <NavLink className="link-offset-3 pb-4 text-center" to="/register">Don&apos;t have an account? Register</NavLink>
    </div>
    
    </>
    );
};
