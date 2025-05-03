import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <div className={styles.heroImage}></div>
      </div>
      
      <section className={styles.about}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>О нас</h2>
          <p className={styles.aboutText}>
            Cailin Kelai — это дорогой бренд мужской и женской одежды. Мы
            занимаемся созданием уникальных и стильных вещей, которые
            подчеркнут вашу индивидуальность и элегантность. Наш бренд
            стремится к совершенству в каждой детали, чтобы вы всегда
            чувствовали себя уверенно и комфортно.
          </p>
        </div>
      </section>

      <section className={styles.partners}>
        <h2 className={styles.sectionTitle}>Наши партнеры</h2>
        <div className={styles.marquee}>
          <div className={styles.track}>
            <div className={styles.content}>
              {[...Array(4)].map((_, i) => (
                <React.Fragment key={i}>
                  <span>Gucci</span>
                  <span>Prada</span>
                  <span>Chanel</span>
                  <span>Louis Vuitton</span>
                  <span>Dior</span>
                  <span>Burberry</span>
                  <span>Versace</span>
                  <span>Armani</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>На шопинг!</h2>
          <p className={styles.ctaText}>
            Найдите свой стиль с Cailin Kelai. Получите эксклюзивные предложения
            и скидки на нашу коллекцию.
          </p>
          <Link to="/main" className={styles.ctaButton}>
            Перейти к покупкам
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;