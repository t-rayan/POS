import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";
import MobileMenu from "./MobileMenu";
import { authLogout } from "../actions/authActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const [toggleMenu, setToggleMenu] = useState(false);
  const cartState = useSelector((state) => state.cartState);
  const { cartItems } = cartState;

  const authState = useSelector((state) => state.authState);
  const { isLoggedIn } = authState;

  const showMenu = () => setToggleMenu(!toggleMenu);

  return (
    <>
      {isLoggedIn && toggleMenu && (
        <MobileMenu toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      )}
      <div className="row p-2">
        <div>
          <Link className="brand" to="/">
            POS
          </Link>
        </div>
        {isLoggedIn && (
          <>
            <div className="menuIcon-container">
              {!toggleMenu ? (
                <FaBars className="icon" onClick={showMenu} />
              ) : (
                <FaTimes className="icon" onClick={showMenu} size="20" />
              )}
            </div>
            <div className="middle-links">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/shop" className="nav-link">
                Shop
              </Link>

              <Link to="/categories" className="nav-link">
                Categories
              </Link>
              <Link to="/products" className="nav-link">
                Products
              </Link>
              <Link to="/orders" className="nav-link">
                Orders
              </Link>
            </div>
            <div className="row right-links">
              <div className="cart-number">
                <FaShoppingCart className="icon header-icons cart-icon" />

                <span className="badge">
                  {cartItems === 0 ? "0" : cartItems.length}
                </span>
              </div>
              <Link to="/settings">
                <FaCog className="icon header-icons setting-icon" />
              </Link>

              <FaSignOutAlt
                className="icon header-icons logout-icon"
                onClick={() => dispatch(authLogout())}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
