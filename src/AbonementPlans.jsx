import React from "react";
import "./AbonementPlans.css";

const AbonementPlans = () => {
  return (
    <section className="abonement-section">
      <h2 className="playfair-font abonement-title">Наши абонементы</h2>
      <p className="abonement-intro">
        В студии <span className="playfair-font">Serine Oasis</span> вы можете выбрать формат,
        который подходит именно вам — от разового посещения до безлимитных пакетов.
      </p>

      <div className="abonement-cards">
        <div className="abonement-card">
          <h3>Разовое занятие</h3>
          <p>Познакомьтесь со студией и атмосферой.</p>
          <span className="price">900 ₽</span>
        </div>

        <div className="abonement-card">
          <h3>4 занятия</h3>
          <p>Идеально, если вы практикуете 1 раз в неделю.</p>
          <span className="price">3 200 ₽</span>
        </div>

        <div className="abonement-card">
          <h3>8 занятий</h3>
          <p>Подходит для устойчивой практики 2 раза в неделю.</p>
          <span className="price">5 800 ₽</span>
        </div>

        <div className="abonement-card">
          <h3>12 занятий</h3>
          <p>Для тех, кто хочет заметного прогресса.</p>
          <span className="price">7 800 ₽</span>
        </div>

        <div className="abonement-card">
          <h3>Безлимит</h3>
          <p>Посещайте любое количество занятий в течение месяца.</p>
          <span className="price">9 900 ₽</span>
        </div>

        <div className="abonement-card">
          <h3>Онлайн-доступ</h3>
          <p>Занимайтесь где угодно с нашими преподавателями.</p>
          <span className="price">4 500 ₽</span>
        </div>
      </div>

      <div className="abonement-specials">
        <h3>Специальные предложения</h3>
        <ul>
          <li>Приведи друга — <strong>скидка 10%</strong> каждому</li>
          <li>Безлимит на 3 месяца — <strong>25 000 ₽</strong> вместо 29 700 ₽</li>
          <li>Утренние занятия (до 11:00) — <strong>-15%</strong></li>
        </ul>
      </div>
    </section>
  );
};

export default AbonementPlans;
