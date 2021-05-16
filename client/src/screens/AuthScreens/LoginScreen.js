import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import { authLogin } from "../../actions/authActions";
import MessageBox from "../../components/MessageBox";
import { CLEAR_AUTH_ERRORS } from "../../constants/authConstants";
import { FaTimes } from "react-icons/fa";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const authState = useSelector((state) => state.authState);
  const { error, token, loading } = authState;

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
  // useeffect hook
  useEffect(() => {
    if (token) {
      history.push("/dashboard");
    }
  }, [token, history]);

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
        Login
      </Button>
    </form>
  );
};

export default LoginScreen;
