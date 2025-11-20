import React from 'react';
import { Link } from 'react-router-dom'; 
import image1 from './1.jpg';
import image2 from './2.jpeg';
import image3 from './3.jpg';
import image4 from './4.jpg';
import aboutImage1 from './about1.png';
import aboutImage2 from './about2.png';
import aboutImage3 from './about3.png';
import image from './image.png';
import AboutSection from '../src/components/AboutSection';

const About = () => {
  return (
    <div className="about-page-wrapper">
      {/* Секция с одной картинкой, текстом и кнопкой */}
      <section className="intro-section">
        <div className="intro-content">
          <div className="intro-image">
            <img src={image} alt="Йога и гармония" />
          </div>
          <div className="intro-text">
            <h2>О нас</h2>
            <p>
              Наша студия — это пространство, где можно замедлиться, почувствовать тело и обрести внутренний баланс.
              Мы находимся в самом центре города, но здесь царит тишина, покой и ощущение уединения.
              Опытные преподаватели помогут подобрать стиль и темп, чтобы практика приносила радость и лёгкость.
              Если вы чувствуете, что готовы начать — свяжитесь с нами, и мы поможем сделать первый шаг.
            </p>
            <Link to="/contacts">
              <button className="intro-button">Узнать подробнее</button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Текстовый раздел с картинками */}
      <section id="about" className="section-section">
        <div className="about-content">
          <div className="about-block image-left">
            <div className="about-image">
              <img src={aboutImage1} alt="История йоги" />
            </div>
            <div className="about-text">
              <p className="regular-font">
                <span className="playfair-font">Йога</span> — это древняя система практик, возникшая более 5000 лет назад в Индии. 
                Она объединяет тело, ум и дух, помогая достичь гармонии и внутреннего спокойствия.
              </p>
            </div>
          </div>
          
          <div className="about-block image-right">
            <div className="about-text">
              <p className="about-quote playfair-font">
                Йога — это не только то, что происходит на коврике, но и то, каким человеком ты становишься за его пределами.
              </p>
            </div>
            <div className="about-image">
              <img src={aboutImage2} alt="Йога за пределами коврика" className="larger-image" />
            </div>
          </div>
          
          <div className="about-block image-left">
            <div className="about-image">
              <img src={aboutImage3} alt="Пространство Serine Oasis" />
            </div>
            <div className="about-text">
              <p className="regular-font">
                <span className="playfair-font">Serine Oasis</span> — это пространство, где под внимательным руководством опытных наставников 
                каждый сможет исследовать возможности своего тела и разума. Мы помогаем интегрировать йогу в повседневную жизнь.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Существующий компонент с рамкой */}
      <AboutSection />
      
      {/* Секция с картинками и фоном */}
      <h2><span className="playfair-font">Наши секции</span></h2>
      <section className="home-images-section">
        <div className="home-images-container">
          <div className="images-grid">
            <div className="images-row">
              <div className="image-item">
                <Link to="/sections#hatha-yoga">
                  <img src={image1} alt="Для начинающих" />
                  <p>Для начинающих</p>
                </Link>
              </div>
              <div className="image-item">
                <Link to="/sections#online-yoga">
                  <img src={image2} alt="Онлайн йога" />
                  <p>Онлайн йога</p>
                </Link>
              </div>
            </div>
            <div className="images-row">
              <div className="image-item">
                <Link to="/sections#vinyasa-yoga">
                  <img src={image3} alt="Для продвинутых" />
                  <p>Для продвинутых</p>
                </Link>
              </div>
              <div className="image-item">
                <Link to="/sections#animal-yoga">
                  <img src={image4} alt="С животными" />
                  <p>С животными</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>    
    </div>
  );
};

export default About;
