import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import About from './about';
import VideoComponent from './VideoComponent';
import ScrollToTop from "./components/ScrollToTop";
import ScrollToHashElement from "./components/ScrollToHashElement";
import Contacts from './Contacts';
import AboutSection from './components/AboutSection';
import YogaSchedule from './components/YogaSchedule/YogaSchedule';
import Sections from './components/Sections/Sections';
import MyBookings from './components/MyBookings/MyBookings';
import Abonements from "./Abonements";
import image1 from './1.jpg';
import image2 from './2.jpeg';
import image3 from './3.jpg';
import image4 from './4.jpg';
import aboutImage1 from './about1.png';
import aboutImage2 from './about2.png';
import aboutImage3 from './about3.png';
import image from './image.png';



const API_URL = 'https://studio-backend-8rnj.onrender.com';
console.log('🔧 Текущий API_URL:', API_URL);

function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

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
            <li>
              <Link to={isLoggedIn ? "/profile" : "/account"}>
                {isLoggedIn ? "Личный кабинет" : "Вход"}
              </Link>
            </li>
            <li><Link to="/contacts">Контакты</Link></li>
          </ul>
          <div className="auth-buttons">
            {isLoggedIn ? (
              <button className="login-btn" onClick={handleLogout}>
                Выйти
              </button>
            ) : (
              <>
                <Link to="/account">
                  <button className="login-btn">Вход</button>
                </Link>
              </>
            )}
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

// Компонент для входа
function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Вход:", form);
    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      const data = await response.json();
      console.log("Ответ логина:", data);
      
      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert(`✅ Вход успешен! Добро пожаловать, ${data.user.first_name}!`);
        window.location.href = "/profile";
      } else {
        alert(`❌ Ошибка: ${data.detail}`);
      }
      
    } catch (error) {
      console.error("Ошибка сети:", error);
      alert("❌ Ошибка сети");
    }
  };

  return (
    <section id="account" style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Вход в систему</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="login-email">Email:</label>
          <input
            type="email"
            id="login-email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="login-password">Пароль:</label>
          <input
            type="password"
            id="login-password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{
          padding: "10px 20px",
          background: "#882df7",
          color: "white",
          border: "none",
          cursor: "pointer",
          width: "100%"
        }}>
          Войти
        </button>
      </form>
      
      <div className="register-section">
        <p>Нет аккаунта?</p>
        <Link to="/register">
          <button className="register-button">Регистрация</button>
        </Link>
      </div>
    </section>
  );
}

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setError("Требуется авторизация");
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/auth/me`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Ошибка загрузки профиля");
        }
        return response.json();
      })
      .then(data => {
        console.log("Профиль:", data);
        setUser(data);
      })
      .catch(err => {
        console.error("Ошибка загрузки профиля:", err);
        setError("Ошибка загрузки профиля");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Вы вышли из системы");
    window.location.href = "/";
  };

  if (loading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Загрузка...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center", marginTop: "50px" }}>{error}</div>;
  if (!user) return <div style={{ textAlign: "center", marginTop: "50px" }}>Пользователь не найден</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px" }}>
      <h2>👤 Личный кабинет</h2>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px',
        marginTop: '30px'
      }}>
        {/* Левая колонка - информация профиля */}
        <div style={{ 
          background: "#f8f9fa", 
          padding: "25px", 
          borderRadius: "10px"
        }}>
          <h3 style={{ marginTop: '0' }}>Информация профиля</h3>
          <p><strong>Имя:</strong> {user.first_name} {user.last_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Телефон:</strong> {user.phone || 'Не указан'}</p>
          <p><strong>ID пользователя:</strong> {user.id}</p>
          <p><strong>Дата регистрации:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
          
          <button onClick={handleLogout} style={{
            marginTop: '20px',
            padding: "10px 20px",
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: '100%'
          }}>
            Выйти из системы
          </button>
        </div>

        {/* Правая колонка - действия */}
        <div style={{ 
          background: "#f0f7ff", 
          padding: "25px", 
          borderRadius: "10px"
        }}>
          <h3 style={{ marginTop: '0' }}>Мои записи</h3>
          <p>Здесь вы можете просмотреть и отменить свои записи на занятия.</p>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '15px',
            marginTop: '20px'
          }}>
            <Link to="/my-bookings">
              <button style={{
                padding: "15px",
                background: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "500",
                width: '100%',
                textAlign: 'center'
              }}>
                📋 Перейти к моим записям
              </button>
            </Link>
            
            <Link to="/schedule">
              <button style={{
                padding: "15px",
                background: "#2ecc71",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "500",
                width: '100%',
                textAlign: 'center'
              }}>
                🗓️ Записаться на новое занятие
              </button>
            </Link>
          </div>
          
          <div style={{ 
            marginTop: '30px',
            padding: '15px',
            background: '#fff',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}>
            <h4>📊 Быстрые действия</h4>
            <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
              <li>Просмотреть историю посещений</li>
              <li>Изменить данные профиля</li>
              <li>Связаться с поддержкой</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
// Компонент для регистрации
function Register() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "", 
    email: "",
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Отправляю данные:", form);
    
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      
      const data = await response.json();
      console.log("Ответ сервера:", data);
      
      if (response.ok) {
        alert(`✅ Регистрация успешна! Ваш ID: ${data.id}`);
        // Очищаем форму
        setForm({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          password: ""
        });
        // Перенаправляем на страницу входа
        window.location.href = "/account";
      } else {
        alert(`❌ Ошибка: ${data.detail || "Неизвестная ошибка"}`);
      }
      
    } catch (error) {
      console.error("Ошибка сети:", error);
      alert("❌ Ошибка соединения с сервером");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Регистрация</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="first_name">Имя:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="last_name">Фамилия:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="phone">Телефон:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="password">Пароль (мин. 6 символов):</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength="6"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        
        <button 
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#882df7",
            color: "white",
            border: "none",
            cursor: "pointer",
            width: "100%"
          }}
        >
          Зарегистрироваться
        </button>
      </form>
      
      <div className="register-section" style={{ marginTop: "20px" }}>
        <p>Уже есть аккаунт?</p>
        <Link to="/account">
          <button className="register-button" style={{ background: "#28a745" }}>
            Войти
          </button>
        </Link>
      </div>
    </div>
  );
}

// Главный компонент аккаунта (решает что показывать)
function Account() {
  const token = localStorage.getItem("token");
  
  if (token) {
    return <Profile />;
  }
  
  return <Login />;
}

// Защищенный маршрут
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/account" replace />;
  }
  
  return children;
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
        <Route path="/profile" element={
          <ProtectedRoute>
            <Layout><Profile /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/my-bookings" element={
          <ProtectedRoute>
            <Layout><MyBookings /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/contacts" element={<Layout><Contacts /></Layout>} />
        <Route path="/abonements" element={<Layout><Abonements /></Layout>} />
        <Route path="*" element={<Layout><h2>404: Страница не найдена</h2></Layout>} />
      </Routes>
    </Router>
  );
}

export default App