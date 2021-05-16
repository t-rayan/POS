import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
const Layout = ({ children, message, clearMessage, loading }) => {
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
              <FaTimes className="icon" onClick={clearMessage} />
            </div>
          </MessageBox>
        )}
      </div>
    </div>
  );
};

export default Layout;
