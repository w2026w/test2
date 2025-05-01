import React from "react";

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="all-pages">
      Страница не найдена <Link to="/home">Вернутсья назад</Link>
    </div>
  );
};

export default NotFound;
