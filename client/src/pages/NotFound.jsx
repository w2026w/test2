import React from "react";

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="all-pages notFoundPage">
      Страница не найдена <Link to="/home"><button>Вернуться на главную</button></Link>
    </div>
  );
};

export default NotFound;
