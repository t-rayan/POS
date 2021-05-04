import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import AddCategoryForm from "./AddCategoryForm";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import Pagination from "./Pagination";
import Toolbar from "./Toolbar";
import { motion } from "framer-motion";
const Layout = ({ children, message, clearMessage, loading }) => {
  if (loading) {
    return <LoadingBox classname="loader" />;
  }
  return (
    <div className="wrapper">
      <motion.div
        className="centered-grid"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
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
      </motion.div>
    </div>
  );
};

export default Layout;
