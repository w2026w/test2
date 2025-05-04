import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { getAllProducts } from "../../redux/features/productSlice";
import config from "../../utils/config";
import styles from "./Main.module.scss";

import { toast } from "react-toastify";

import { addToCart, removeCartItem } from "../../redux/features/cartSlice";
import { selectUserId } from "../../redux/features/authSlice";
function Main() {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);

  const [loading, setLoading] = React.useState({});

  React.useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleAddToCart = async (productId) => {
    if (loading[productId]) return;

    setLoading((prev) => ({ ...prev, [productId]: true }));

    try {
      if (userId) {
        const isInCart = cart.some((item) => item.product._id === productId);
        if (isInCart) {
          await dispatch(removeCartItem({ userId, productId }));
        } else {
          await dispatch(addToCart({ userId, productId }));
        }
      } else {
        toast.error("Пользователь не авторизован");
      }
    } catch (error) {
      console.error("Ошибка обновления корзины:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const renderItems = () => {
    return products.map((product) => (
      <Card
        key={product._id}
        id={product._id}
        title={product.title}
        imageUrl={`${config.apiUrl}/${config.imgGoods}/${product.imageUrl}`}
        price={product.price}
        product={product}
        loading={loading[product._id]}
        onPlus={() => {
          handleAddToCart(product._id);
        }}
        isItemAdded={cart.some(
          (item) => item.product._id === product._id
      )}
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
