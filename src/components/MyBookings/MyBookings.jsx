import React, { useState, useEffect } from 'react';
import { bookingAPI } from '../services/api';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('🔄 MyBookings загружается');
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    console.log('📥 Начинаем загрузку записей...');
    setLoading(true);
    setError('');
    
    try {
      const data = await bookingAPI.getMyBookings();
      console.log('✅ Данные получены:', data);
      
      setBookings(data);
      
    } catch (err) {
      console.error('❌ Ошибка:', err);
      setError('Не удалось загрузить записи. Проверьте консоль.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId, classId) => {
    if (!window.confirm('Вы уверены, что хотите отменить запись?')) {
      return;
    }

    try {
      await bookingAPI.cancelBooking(bookingId);
      
      const savedBookings = localStorage.getItem('yogaBookings');
      if (savedBookings) {
        const bookingsObj = JSON.parse(savedBookings);
        delete bookingsObj[classId];
        localStorage.setItem('yogaBookings', JSON.stringify(bookingsObj));
      }
      
      setBookings(prev => prev.filter(b => b.id !== bookingId));
      
      alert('✅ Запись успешно отменена!');
      
    } catch (err) {
      console.error('❌ Ошибка отмены:', err);
      alert(`❌ Не удалось отменить запись: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h3>Загрузка ваших записей...</h3>
        <p>Пожалуйста, подождите</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h3>Ошибка</h3>
        <p>{error}</p>
        <button onClick={fetchBookings}>Попробовать снова</button>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="no-bookings">
        <h3>Мои записи на занятия</h3>
        <p>У вас пока нет записей на занятия</p>
        <a href="/schedule" className="link-to-schedule">
          Посмотреть расписание и записаться →
        </a>
      </div>
    );
  }

  return (
    <div className="my-bookings">
      <h3>Мои записи на занятия ({bookings.length})</h3>
      
      <div className="bookings-list">
        {bookings.map(booking => (
          <div key={booking.id} className="booking-card">
            <div className="booking-header">
              <span className="booking-time">{booking.class_time}</span>
              <span className="booking-date">{booking.class_date}</span>
            </div>
            
            <div className="booking-content">
              <h4>{booking.class_name}</h4>
              
              <div className="booking-details">
                <div className="detail-item">
                  <span>Тренер:</span>
                  <strong>{booking.trainer_name}</strong>
                </div>
                
                <div className="detail-item">
                  <span>Зал:</span>
                  <strong>{booking.hall_name}</strong>
                </div>
                
                {booking.created_at && (
                  <div className="detail-item">
                    <span>Запись создана:</span>
                    <span>{new Date(booking.created_at).toLocaleDateString('ru-RU')}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="booking-actions">
              <button
                className="cancel-button"
                onClick={() => handleCancelBooking(booking.id, booking.class_id)}
              >
                Отменить запись
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bookings-footer">
        <a href="/schedule" className="link-to-schedule">
          Записаться на другие занятия →
        </a>
      </div>
    </div>
  );
};

export default MyBookings;