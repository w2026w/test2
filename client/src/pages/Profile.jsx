import React from "react";

import { useSelector } from "react-redux";

import { checkIsAuth } from "../redux/features/authSlice";

const Profile = () => {
  const isAuth = useSelector(checkIsAuth);
  const { user } = useSelector((state) => state.auth);

  if (!isAuth) {
    return (
      <div>
        <h1 className="container all-pages">
          Привет! Чтобы зайти в аккаунт вам нужно авторизоваться.
        </h1>
      </div>
    );
  }
  return (
    <div className="container all-pages">
      <h1>Привет {user.username}! Это ваш аккаунт. Как дела?</h1>
    </div>
  );
};

export default Profile;
