import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import { authLogin, loadUser } from "../../actions/authActions";
import MessageBox from "../../components/MessageBox";
import { CLEAR_AUTH_ERRORS } from "../../constants/authConstants";
import { FaTimes } from "react-icons/fa";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);
  const { error, isLoggedIn, loading } = authState;

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    error && dispatch({ type: CLEAR_AUTH_ERRORS });
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (state.email && state.password) {
    //   dispatch(authLogin(state.email, state.password));
    // }
    dispatch(authLogin(state.email, state.password));
  };

  useEffect(() => {
    localStorage.getItem("token") && dispatch(loadUser());
  }, [dispatch]);

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="email"
        name="email"
        value={state.email}
        placeholder="Enter your email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={state.password}
        placeholder="Enter your password"
        onChange={handleChange}
      />
      {error ? (
        <MessageBox variant="danger">
          <div className="row">
            <p>{error}</p>
            <FaTimes
              className="icon"
              onClick={() => dispatch({ type: CLEAR_AUTH_ERRORS })}
            />
          </div>
        </MessageBox>
      ) : null}
      <Button className="btn primary btn-lg" disabled={loading}>
        {loading ? "Loading" : "Login"}
      </Button>

      <div className="row ">
        <p className="demo-class">
          Demo email: <span>demo@demo.com</span>{" "}
        </p>
        <p className="demo-class">
          Demo password: <span>12345678</span>{" "}
        </p>
      </div>
    </form>
  );
};

export default LoginScreen;
