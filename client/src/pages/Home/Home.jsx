import React from "react";

import { useSelector } from "react-redux";

import { checkIsAuth } from "../../redux/features/authSlice";

import styles from "./Home.module.scss";

const Home = () => {
  const isAuth = useSelector(checkIsAuth);
  const { user } = useSelector((state) => state.auth);

  if (!isAuth) {
    return (
      <div>
        <h1 className="all-pages">
          Home. Чтобы зайти в профиль вам нужно авторизоваться.
        </h1>
      </div>
    );
  }
  return (
    <div className="all-pages">
      <h1>Home. Привет {user.username}! Как дела?</h1>
    </div>
  );
};

export default Home;
