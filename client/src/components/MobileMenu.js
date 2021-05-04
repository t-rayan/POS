import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaShoppingBag,
  FaBox,
  FaShopify,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
const MobileMenu = ({ toggleMenu, setToggleMenu }) => {
  const links = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt className="nav-icon" />,
      url: "/dashboard",
    },
    {
      name: "Products",
      icon: <FaShoppingBag className="nav-icon" />,
      url: "/products",
    },
    {
      name: "Categories",
      icon: <FaBox className="nav-icon" />,
      url: "/categories",
    },
    {
      name: "Orders",
      icon: <FaShopify className="nav-icon" />,
      url: "/orders",
    },
  ];

  const closeMenu = (e) => {
    e.preventDefault();
    setToggleMenu(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -400 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        className="mobile-menu"
      >
        <div className="sidebar-top">
          <Link className="brand" to="/" onClick={setToggleMenu}>
            POS
          </Link>
        </div>

        <ul>
          {links.map((link) => (
            <li
              key={link.name}
              className="row start align-center"
              onClick={closeMenu}
            >
              {link.icon}
              <Link to={link.url} className="nav-link">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileMenu;
