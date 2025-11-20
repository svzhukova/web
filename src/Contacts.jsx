import React from 'react';
import './Contacts.css';

function Contacts() {
  return (
    <div className="contacts-container">
      <h1>Контакты</h1>
      
      <div className="contacts-content">
        {/* Карта теперь СЛЕВА */}
        <div className="map-section">
          <h2>Как добраться</h2>
          <div className="map-container">
            <div className="yandex-map">
              <iframe 
                src="https://yandex.ru/map-widget/v1/?ll=37.603747%2C55.710702&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NjY4MjU1ORJC0KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINGD0LvQuNGG0LAg0J7RgNC00LbQvtC90LjQutC40LTQt9C1LCAzIgoNPWoWQhXC115C&z=16" 
                width="100%" 
                height="400" 
                frameBorder="0" 
                allowFullScreen 
                title="Карта расположения студии йоги Serine Oasis"
                style={{ border: 'none', borderRadius: '10px' }}
              ></iframe>
            </div>
          </div>
        </div>

        {/* Контактная информация теперь СПРАВА */}
        <div className="contacts-info">
          
          <div className="contact-section">
            <h2>Адрес</h2>
            <div className="contact-card">
              <div className="icon">📍</div>
              <div className="details">
                <p className="address">ул. Орджоникидзе, 3</p>
                <p className="city">Москва, Россия</p>
                <p className="metro">м. Ленинский проспект</p>
              </div>
            </div>
          </div>

          <div className="contact-section">
            <h2>Контакты</h2>
            <div className="contact-card">
              <div className="icon">📞</div>
              <div className="details">
                <p><strong>Тел.:</strong> +8 (123) 456-78-90</p>
                <p><strong>Email:</strong> info@serine-oasis.com</p>
                <p><strong>Telegram:</strong> @serine_oasis</p>
                <p><strong>Instagram:</strong> @serine_oasis_studio</p>
              </div>
            </div>
          </div>

          <div className="contact-section">
            <h2>Режим работы</h2>
            <div className="contact-card">
              <div className="icon">🕒</div>
              <div className="details">
                <div className="working-hours">
                  <div className="day-row">
                    <span>Понедельник - Пятница</span>
                    <span>7:00 - 22:00</span>
                  </div>
                  <div className="day-row">
                    <span>Суббота</span>
                    <span>8:00 - 20:00</span>
                  </div>
                  <div className="day-row">
                    <span>Воскресенье</span>
                    <span>9:00 - 18:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contacts;