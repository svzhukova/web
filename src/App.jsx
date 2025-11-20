import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import About from './about';
import VideoComponent from './VideoComponent';
import React from 'react';
import image1 from './1.jpg';
import image2 from './2.jpeg';
import ScrollToTop from "./components/ScrollToTop";
import image3 from './3.jpg';
import image4 from './4.jpg';
import ScrollToHashElement from "./components/ScrollToHashElement";
import aboutImage1 from './about1.png';
import aboutImage2 from './about2.png';
import aboutImage3 from './about3.png';
import image from './image.png';
import Contacts from './Contacts';
import AboutSection from './components/AboutSection';
import YogaSchedule from './components/YogaSchedule/YogaSchedule';
import Sections from './components/Sections/Sections';
import Videoabonements from './Videoabonements';
import Abonements from "./Abonements";


// Компонент-обертка для отображения видео только на главной
function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <>
      <header className="main-header">
        <nav>
          {/* Добавляем название студии слева */}
          <div className="logo">
            <Link to="/" className="studio-name">Serine Oasis</Link>
          </div>
          <ul>
            <li><Link to="/about">О нас</Link></li>
            <li><Link to="/sections">Секции</Link></li>
            <li><Link to="/abonements">Абонементы</Link></li>
            <li><Link to="/schedule">Расписание</Link></li>
            <li><Link to="/account">Личный кабинет</Link></li>
            <li><Link to="/contacts">Контакты</Link></li>
          </ul>
          <div className="auth-buttons">
            <Link to="/account">
              <button className="login-btn">Вход</button>
            </Link>
         </div>
        </nav>
      </header>
      
      {/* Видео показывается ТОЛЬКО на главной странице */}
      {isHomePage && <VideoComponent />}
      
      <main>
        {children}
      </main>
      
      <footer>
        <p>&copy; 2025 Студия йоги. Все права защищены.</p>
        <div className="contact-info">
          <p>Адрес: ул. Ордженикидзе, 3</p>
          <p>Телефон: +8 (985) 737-05-73</p>
          <p>Email: info@yogastudio.com</p>
        </div>
        <div className="social-media">
          <a href="#" className="Telegram">Telegram</a>
          <a href="#" className="instagram">Instagram</a>
        </div>
      </footer>
    </>
  );
}

function Home() {
  return (
    <div>
      {/* Полная фраза с анимацией под видео */}
      <div className="welcome-section">
        <h1 className="fade-in">
          Добро пожаловать в студию йоги <br />
          <span className="pretty-font">"Serine Oasis"</span>
        </h1>
      </div>


      {/* ДОБАВЛЯЕМ НОВЫЙ БЛОК С 6 ПРЯМОУГОЛЬНИКАМИ */}
      <AboutSection />

      {/* Секция с одной картинкой, текстом и кнопкой */}
      <section className="intro-section">
        <div className="intro-content">
          <div className="intro-image">
            <img src={image} alt="Йога и гармония" />
          </div>
          <div className="intro-text">
            <h2>О нас</h2>
            <p>
            Наша студия это пространство, где можно замедлиться, почувствовать тело и обрести внутренний баланс.
            
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


      {/* Секция "О нас" с текстом и картинками */}
      <section id="about" className="section-section">
        <div className="about-content">
          
          {/* Первый блок: картинка слева, текст справа */}
          <div className="about-block image-left">
            <div className="about-image">
              <img src={aboutImage1} alt="История йоги" />
            </div>
            <div className="about-text">
              <p className="regular-font">
                <span className="playfair-font">Йога</span>— это древняя система практик, которая возникла более 5000 лет назад в Индии. 
                Она объединяет тело, ум и дух, помогая людям достичь гармонии и внутреннего спокойствия 
                и понимания своего места в мире.
              </p>
            </div>
          </div>
          
          {/* Второй блок: текст слева, картинка справа */}
          <div className="about-block image-right">
            <div className="about-text">
              <p className="about-quote playfair-font">
                Йoga — это не только то, что происходит на коврике, но то каким человеком ты становишься за его пределами.
              </p>
            </div>
            <div className="about-image">
              <img src={aboutImage2} alt="Йога за пределами коврика" className="larger-image" />
            </div>
          </div>
          
          {/* Третий блок: картинка слева, текст справа */}
          <div className="about-block image-left">
            <div className="about-image">
              <img src={aboutImage3} alt="Пространство Serine Oasis" />
            </div>
            <div className="about-text">
              <p className="regular-font">
                <span className="playfair-font">Serine Oasis</span> — это пространство, где в гармоничной атмосфере 
                и под внимательным руководством наших опытных наставников каждый сможет исследовать 
                возможности своего тела и разума. Мы стремимся помочь вам интегрировать йогу в повседневную 
                жизнь, наполняя ее осознанностью и смыслом.
              </p>
            </div>
          </div>
          
        </div>
      </section>
      
      
      {/* Секция "Секции" с картинками */}
      <h2><span className="playfair-font">Мы предлагаем следующие секции</span></h2>
      <section className="home-images-section">
        <div className="home-images-container">
          <div className="images-grid">
            {/* Первый ряд */}
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
            {/* Второй ряд */}
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
        {/* Список секций */}
      <section>
        <Sections />
      </section>
    </div>
  );
}


function Schedule() {
  return (
    <div>
      <YogaSchedule />
    </div>
  );
}

function Account() {
  return (
    <section id="account">
      <h2>Личный кабинет</h2>
      <form>
        <label>Логин</label>
        <input type="text" />
        <label>Пароль</label>
        <input type="password" />
        <button type="submit">Вход</button>
      </form>

      {/* Вариант с кнопкой */}
      <div className="register-section">
        <p>Нет аккаунта?</p>
        <Link to="/register">
          <button className="register-button">Регистрация</button>
        </Link>
      </div>
    </section>
  );
}

function Register() {
  return (
    <div>
      <h2>Регистрация</h2>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollToHashElement />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/sections" element={<Layout><Sections /></Layout>} />
        <Route path="/schedule" element={<Layout><Schedule /></Layout>} />
        <Route path="/account" element={<Layout><Account /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/contacts" element={<Layout><Contacts /></Layout>} />
        <Route path="/abonements" element={<Layout><Abonements /></Layout>} />
        <Route path="*" element={<Layout><h2>404: Страница не найдена</h2></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;