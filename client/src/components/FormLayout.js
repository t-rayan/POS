import React from "react";
import { motion } from "framer-motion";

const FormLayout = ({ children }) => {
  return (
    <div className="w">
      <motion.div
        className="form-container"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default FormLayout;
