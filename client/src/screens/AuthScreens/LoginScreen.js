import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import { authLogin } from "../../actions/authActions";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const authState = useSelector((state) => state.authState);
  const { isLoggedIn, token } = authState;

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;

    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.email && state.password) {
      dispatch(authLogin(state.email, state.password));
    }
    if (token) {
      history.push("/products");
    }
  };
  // useeffect hook
  useEffect(() => {
    if (token) {
      history.push("/dashboard");
    }
  }, [token, history]);

  return (
    <form onSubmit={handleSubmit}>
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

      <Button className="btn primary btn-lg">Login</Button>
    </form>
  );
};

export default LoginScreen;
