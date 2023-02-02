import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../actions/authActions";
import {
  CLEAR_AUTH_ERRORS,
  CLEAR_AUTH_MESSAGES,
} from "../constants/authConstants";
import Button from "./Button";
import MessageBox from "./MessageBox";
import { FaTimes, FaEye } from "react-icons/fa";

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);
  const { loading, error, message } = authState;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const submitForm = () => {
    dispatch(updatePassword(oldPassword, newPassword));
    setOldPassword("");
    setNewPassword("");
  };

  useEffect(() => {
    if (oldPassword === "") {
      setInputType("password");
    }
  }, [oldPassword]);
  return (
    <div className="change-password-card">
      <div className="card-header">
        <h3>Change Password</h3>
      </div>
      <div className="card-body">
        <div>
          <div className="form-input">
            <label htmlFor="old-pswd">Old Password</label>
            <input
              type={inputType}
              name="oldPassword"
              className="old-password"
              value={oldPassword}
              placeholder="Enter your old password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <span className="field-icon">
              {oldPassword && (
                <FaEye
                  className="showPswd-btn"
                  onClick={() => {
                    if (inputType === "password") {
                      setInputType("text");
                    } else {
                      setInputType("password");
                    }
                  }}
                />
              )}
            </span>
          </div>
          <div className="form-input">
            <label htmlFor="new-pswd">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              placeholder="Enter your new password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {error && (
            <MessageBox variant="danger">
              <div className="row">
                <p>{error}</p>
                <FaTimes
                  className="icon"
                  onClick={() => dispatch({ type: CLEAR_AUTH_ERRORS })}
                />
              </div>
            </MessageBox>
          )}
          {message && (
            <MessageBox variant="success">
              <div className="row">
                <p>{message}</p>
                <FaTimes
                  className="icon"
                  onClick={() => dispatch({ type: CLEAR_AUTH_MESSAGES })}
                />
              </div>
            </MessageBox>
          )}

          <Button
            className="btn btn-sm primary mt-2"
            handleClick={submitForm}
            disabled={loading}
          >
            Change Password
          </Button>
        </div>
        <div className="text-muted p-4">
          <li> Password must be 8 character long</li>
          <li>Logout is required to apply changes</li>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
