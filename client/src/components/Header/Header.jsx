import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearCart } from "../../redux/features/cartSlice";

import { logout } from "../../redux/features/authSlice";

import {
  MdAdminPanelSettings,
  MdAccountCircle,
  MdShoppingCart,
  MdFavorite,
  MdCreditScore,
  MdOutlineStorefront,
  MdLogin,
  MdLogout,
  MdManageAccounts,
} from "react-icons/md";
import { toast } from "react-toastify";
import styles from "./Header.module.scss";

import { checkIsAuth } from "../../redux/features/authSlice";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isAuth = useSelector(checkIsAuth);
  const { totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = React.useRef();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
    window.localStorage.removeItem("token");
    toast("Вы вышли из системы.");
    navigate("/");
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <header className={styles.root}>
      <div className={styles.headerRow}>
        <Link to="/home">
          <button className={styles.logoBtn} data-text="Awesome">
            <span className="logo__text">&nbsp;Cailin Kelai&nbsp;</span>
            <span aria-hidden="true" className={styles.logoTextHover}>
              &nbsp;Cailin&nbsp;Kelai&nbsp;
            </span>
          </button>
        </Link>
        <Link className={styles.link} to="/main">
          <div className={styles.inLink}>
            <MdOutlineStorefront className={styles.mr10} size={25} />
            <p className="">На шопинг!</p>
          </div>
        </Link>
      </div>
      <div className={styles.headerRow}>
        <ul className={styles.headerRow}>
          <Link to="/cart" className={styles.headerRowLi}>
            <MdShoppingCart className={styles.mr10} size={25} />
            <span>{totalPrice} руб.</span>
          </Link>

          <Link className={styles.link} to="/favorites">
            <li className={styles.headerRowFav}>
              <MdFavorite className={styles.mr10} size={25} />
              <p>Закладки</p>
            </li>
          </Link>
          <li
            className={styles.profileButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ref={menuRef}
          >
            <MdAccountCircle className={styles.mr10} size={25} />
            <p>Профиль</p>
            {isMenuOpen && (
              <div className={styles.dropdownMenu}>
                <Link to="/profile" className={styles.dropdownItem}>
                  <MdManageAccounts size={20} />
                  <span>Аккаунт</span>
                </Link>
                <Link to="/orders" className={styles.dropdownItem}>
                  <MdCreditScore size={20} />
                  <span>Мои заказы</span>
                </Link>
                <div className={styles.dropdownItem}>
                  {isAuth ? (
                    <>
                      <MdLogout size={20} />
                      <span onClick={logoutHandler}>Выйти</span>
                    </>
                  ) : (
                    <Link to="/register">
                      <div className={styles.login}>
                        <MdLogin size={25} />
                        <span>Войти</span>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
