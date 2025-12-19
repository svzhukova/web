import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyBookings from './MyBookings/MyBookings'; // Или путь к вашему компоненту MyBookings

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' или 'bookings'

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/account"); // Перенаправляем на страницу входа
        return;
      }

      try {
        const res = await fetch(`http://127.0.0.1:8000/auth/me?token=${token}`, {
          headers: {
            "Accept": "application/json",
          },
        });

        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.detail || "Ошибка загрузки профиля");
        }
        
        setUser(data);
      } catch (err) {
        setError(err.message);
        // Если токен невалидный - удаляем его
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/account"); // Перенаправляем на страницу входа
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload(); // Обновляем страницу чтобы обновилась навигация
  };

  if (loading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Загрузка...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center", marginTop: "50px" }}>Ошибка: {error}</div>;
  if (!user) return <div style={{ textAlign: "center", marginTop: "50px" }}>Пользователь не найден</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px" }}>
      {/* Вкладки */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '30px',
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '10px'
      }}>
        <button
          onClick={() => setActiveTab('profile')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'profile' ? '#882df7' : '#f0f0f0',
            color: activeTab === 'profile' ? 'white' : '#333',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.3s'
          }}
        >
          👤 Профиль
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'bookings' ? '#882df7' : '#f0f0f0',
            color: activeTab === 'bookings' ? 'white' : '#333',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.3s'
          }}
        >
          📅 Мои записи
        </button>
      </div>

      {activeTab === 'profile' ? (
        <>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>👤 Личный кабинет</h2>
          <div style={{ 
            background: "#f8f9fa", 
            padding: "20px", 
            borderRadius: "10px",
            marginBottom: "20px",
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <p style={{ marginBottom: '10px' }}>
              <strong>Имя:</strong> {user.first_name} {user.last_name}
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Email:</strong> {user.email}
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Телефон:</strong> {user.phone}
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Дата регистрации:</strong> {new Date(user.created_at).toLocaleDateString('ru-RU')}
            </p>
            <p style={{ marginBottom: '0' }}>
              <strong>ID пользователя:</strong> {user.id}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button 
              onClick={() => setActiveTab('bookings')}
              style={{
                padding: "10px 20px",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: '500'
              }}
            >
              Посмотреть мои записи
            </button>
            
            <button 
              onClick={handleLogout}
              style={{
                padding: "10px 20px",
                background: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: '500'
              }}
            >
              Выйти из системы
            </button>
          </div>
        </>
      ) : (
        <MyBookings />
      )}
    </div>
  );
}

export default Profile;