import React from "react";
import { useSelector } from "react-redux";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";

function Card({ id, title, imageUrl, price, loading, onPlus, isItemAdded }) {
  const { isLoading } = useSelector((state) => state.products);

  const onClickPlus = () => {
    if (!loading) {
      onPlus({ id, title, imageUrl, price });
    }
  };

  return (
    <div className={styles.card}>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={220}
          height={320}
          viewBox="0 0 220 320"
          backgroundColor="#f5f5f5"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="12" ry="12" width="220" height="180" />
          <rect x="0" y="200" rx="4" ry="4" width="220" height="18" />
          <rect x="0" y="230" rx="4" ry="4" width="120" height="16" />
          <rect x="0" y="270" rx="6" ry="6" width="100" height="28" />
          <circle cx="190" cy="270" r="20" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.imageContainer}>
            <img src={imageUrl} alt={title} className={styles.productImage} />
            <button className={styles.wishlistButton}>
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                <path
                  d="M10 1.61804C12.0557 -0.077496 15.061 -0.538924 17.5538 1.61804C20.0466 3.775 20.3705 7.37603 18.2466 9.88235L10 18L1.75338 9.88235C-0.370545 7.37603 -0.0466236 3.775 2.44622 1.61804C4.93906 -0.538924 7.94435 -0.077496 10 1.61804Z"
                  fill="white"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>{title}</h3>
            <div className={styles.priceContainer}>
              <span className={styles.priceLabel}>Цена:</span>
              <span className={styles.priceValue}>{price} руб.</span>
            </div>
            {isItemAdded ? (
              <button onClick={onClickPlus} className={styles.removeButton}>
                Удалить из корзины
              </button>
            ) : (
              <button onClick={onClickPlus} className={styles.addButton}>
                Добавить в корзину
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
