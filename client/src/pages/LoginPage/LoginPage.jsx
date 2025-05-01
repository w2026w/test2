import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, loginUser } from "../../redux/features/authSlice";
import { toast } from "react-toastify";

import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (status) {
      toast(status);
    }
    if (isAuth) navigate("/");
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }));
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`all-pages ${styles.allPages} ${styles.loginPage}`}>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <h2>Авторизация:</h2>
        <span className={styles.inputSpan}>
          <label className={styles.label}>Логин:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="email"
            id="email"
          />
        </span>
        <span className={styles.inputSpan}>
          <label className={styles.label}>Пароль:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
        </span>
        <span className={styles.span}></span>
        <input
          onClick={handleSubmit}
          className={styles.submit}
          type="submit"
          value="Войти в аккаунт"
        />
        <span className={styles.span}>
          Нет аккаунта? <Link to={"/register"}>Регистрация</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginPage;
