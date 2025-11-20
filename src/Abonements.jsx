import React from "react";
import Videoabonements from "./Videoabonements";
import AbonementPlans from "./AbonementPlans";
import "./Abonements.css"; // 👈 создадим для стилей этого блока
import rulesImage from "./rules.jpg";

function Abonements() {
  return (
    <div className="abonements-page">
      <Videoabonements />


      <AbonementPlans />

      {/* 🔥 Новый блок правил */}
      <section className="rules-section">
        <div className="rules-image">

        <img src={rulesImage} alt="Правила" />;

        </div>

        <div className="rules-content">
          <h2>Правила использования абонементов и услуг</h2>

          <div className="rule-item">
            <div className="rule-number">1</div>
            <p>
              Абонемент или услуга <strong>оформляется персонально на клиента</strong> и не может быть
              передан или использован другими лицами.
            </p>
          </div>

          <div className="rule-item">
            <div className="rule-number">2</div>
            <p>
              Для оформления абонемента/услуги необходимо <strong>зарегистрироваться</strong>,
              указав имя, фамилию, действующий номер телефона и адрес электронной почты{" "}
              <a href="/register" className="rule-link">на сайте</a> или через администратора студии.
            </p>
          </div>

          <div className="rule-item">
            <div className="rule-number">3</div>
            <p>
              Абонемент даёт право на посещение любых групповых классов студии.
            </p>
          </div>

          <div className="rule-item">
            <div className="rule-number">4</div>
            <p>
              После покупки услуги или абонемента <strong>не забудьте записаться</strong> на выбранное занятие.
              Если хотите записать друзей или близких — обратитесь к администратору студии.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Abonements;
