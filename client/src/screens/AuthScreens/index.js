import React, { useState } from "react";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

const AuthIndex = () => {
  const [toggleAuthForm, setToggleAuthForm] = useState(false);

  const handleToggleAuthForm = () => {
    setToggleAuthForm(!toggleAuthForm);
  };

  return (
    <div className="auth-screen">
      <div className="auth-container">
        <div className="auth-header">
          <h2> {!toggleAuthForm ? "Login to continue" : "Please Register"} </h2>
          <p className="text-muted">
            {!toggleAuthForm
              ? "Enter your username and password"
              : "Enter your detaiils to register"}
          </p>
        </div>
        <div className="auth-body">
          {toggleAuthForm ? <RegisterScreen /> : <LoginScreen />}
        </div>
        {/* <div className="auth-footer">
          {!toggleAuthForm ? (
            <p className="text-muted">
              {" "}
              Don`t have an account ?{" "}
              <strong className="auth-link" onClick={handleToggleAuthForm}>
                Register
              </strong>
            </p>
          ) : (
            <p className="text-muted">
              {" "}
              Already have an account ?{" "}
              <strong className="auth-link" onClick={handleToggleAuthForm}>
                Login
              </strong>
            </p>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default AuthIndex;
