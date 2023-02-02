import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "../actions/msgActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
const Layout = ({ children, loading }) => {
  const dispatch = useDispatch();
  const msgState = useSelector((state) => state.messageState);
  const { message } = msgState;
  if (loading) {
    return <LoadingBox classname="loader" />;
  }
  return (
    <div className="wrapper">
      <div className="centered-grid">
        {children}
        {message && (
          <MessageBox>
            <div className="row">
              <FaCheck />
              <p>{message}</p>
              <FaTimes
                className="icon"
                onClick={() => dispatch(clearMessage())}
              />
            </div>
          </MessageBox>
        )}
      </div>
    </div>
  );
};

export default Layout;
