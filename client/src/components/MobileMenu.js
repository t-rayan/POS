import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaTachometerAlt,
  FaShoppingBag,
  FaBox,
  FaShopify,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { authLogout } from "../actions/authActions";
const MobileMenu = ({ toggleMenu, setToggleMenu }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);
  const { isLoggedIn } = authState;

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

    {
      name: "Settings",
      icon: <FaCog className="nav-icon" />,
      url: "/settings",
    },
  ];

  const closeMenu = (e) => {
    e.preventDefault();
    setToggleMenu(false);
  };

  return (
    <AnimatePresence>
      {isLoggedIn && (
        <motion.div
          initial={{ opacity: 0, x: -400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className="mobile-menu closeMenu"
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
            <li
              className="nav-link row start align-center nav-link"
              onClick={(e) => {
                dispatch(authLogout());
                closeMenu(e);
              }}
            >
              <FaSignOutAlt className="nav-icon" />
              <p className="nav-link">Logout</p>
            </li>
          </ul>
          <ul></ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
