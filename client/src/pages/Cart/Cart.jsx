import React from "react";

import { useSelector } from "react-redux";
import config from "../../utils/config";

import styles from "./Cart.module.scss";

function Order() {
  const { cart } = useSelector((state) => state.cart);
  const { totalPrice } = useSelector((state) => state.cart);

  if (cart.length === 0) {
    return (
      <div className={`container ${styles.emptyCart}`}>
        <h2>Ваша корзина пуста</h2>
        <p>Добавьте товары в корзину</p>
      </div>
    );
  }

  return (
    <div className={`container ${styles.root}`}>
      <h1 className={styles.title}>Корзина</h1>

      <div className={styles.orderContainer}>
        <div className={styles.itemsSection}>
          <h2 className={styles.sectionTitle}>Ваши товары ({cart.length})</h2>
          <div className={styles.itemsList}>
            {cart.map((item) => (
              <div key={item.product._id} className={styles.cartItem}>
                <div className={styles.imageContainer}>
                  <img
                    src={`${config.apiUrl}/${config.imgGoods}/${item.product.imageUrl}`}
                    alt={item.product.title}
                  />
                </div>

                <div className={styles.details}>
                  <h3 className={styles.productTitle}>{item.product.title}</h3>
                  <p className={styles.price}>
                    Цена: ₽{item.product.price.toFixed(2)}
                  </p>
                  <p className={styles.quantity}>Количество: {item.quantity}</p>
                </div>

                <div className={styles.itemTotal}>
                  ₽{(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.summarySection}>
          <h2 className={styles.sectionTitle}>Итого</h2>

          <div className={styles.summaryRow}>
            <span>Товары:</span>
            <span>₽{totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Доставка:</span>
            <span>Бесплатно</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Общая сумма:</span>
            <span>₽{totalPrice.toFixed(2)}</span>
          </div>

          <button className={styles.submitButton}>Перейти к оформлению</button>
        </div>
      </div>
    </div>
  );
}

export default Order;
