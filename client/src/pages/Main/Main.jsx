import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { getAllProducts } from "../../redux/features/productSlice";
import config from "../../utils/config";
import styles from "./Main.module.scss";

function Main() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const renderItems = () => {
    return products.map((product) => (
      <Card
        key={product._id}
        id={product._id}
        title={product.title}
        imageUrl={`${config.apiUrl}/${config.imgGoods}/${product.imageUrl}`}
        price={product.price}
        product={product}
      />
    ));
  };

  return (
    <div className={`all-pages container ${styles.root}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Все товары</h1>
        <div className={styles.filterControls}>
          <button className={styles.filterButton}>Фильтры</button>
          <select className={styles.sortSelect}>
            <option>По популярности</option>
            <option>По возрастанию цены</option>
            <option>По убыванию цены</option>
          </select>
        </div>
      </div>

      <div className={styles.productGrid}>{renderItems()}</div>
    </div>
  );
}

export default Main;