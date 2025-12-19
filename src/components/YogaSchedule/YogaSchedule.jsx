import React, { useState, useEffect } from 'react';
import { trainers, classTypes, generateSchedule, bookClass, cancelBooking } from './data';
import './YogaSchedule.css';
import { bookingAPI } from '../services/api';

const YogaSchedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [bookedClasses, setBookedClasses] = useState({});
  const [updatedLessonId, setUpdatedLessonId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Загружаем данные при монтировании
  useEffect(() => {
    const data = generateSchedule();
    setScheduleData(data);
    setFilteredData(data);
    
    // Загружаем бронирования из localStorage
    const savedBookings = localStorage.getItem('yogaBookings');
    if (savedBookings) {
      setBookedClasses(JSON.parse(savedBookings));
    }
    
    // Дополнительно: загружаем реальные бронирования с сервера
    loadServerBookings();
  }, []);
  
  // Функция загрузки бронирований с сервера
  const loadServerBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
      const serverBookings = await bookingAPI.getMyBookings();
      // Создаем маппинг class_id -> true для быстрой проверки
      const serverBookingMap = {};
      serverBookings.forEach(booking => {
        serverBookingMap[booking.class_id] = true;
      });
      
      // Обновляем локальное состояние
      const updatedBookings = { ...bookedClasses, ...serverBookingMap };
      setBookedClasses(updatedBookings);
      localStorage.setItem('yogaBookings', JSON.stringify(updatedBookings));
    } catch (error) {
      console.log('Не удалось загрузить бронирования с сервера:', error.message);
    }
  };
    
  // Фильтрация расписания
  useEffect(() => {
    filterSchedule();
  }, [selectedTrainer, selectedClass, scheduleData]);

  const filterSchedule = () => {
    let filtered = scheduleData;

    if (selectedTrainer !== 'all') {
      filtered = filtered.filter(lesson => lesson.trainer_id == selectedTrainer);
    }

    if (selectedClass !== 'all') {
      const selectedClassName = classTypes.find(c => c.id == selectedClass)?.name;
      filtered = filtered.filter(lesson => lesson.class_name === selectedClassName);
    }

    setFilteredData(filtered);
  };

  // Функция бронирования с сохранением на сервер
  const handleBookClass = async (lesson) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Сначала войдите в систему!');
      window.location.href = '/account';
      return;
    }
  
    console.log('🔄 Начинаем запись на занятие:', lesson);
    console.log('📊 Тип lesson.id:', typeof lesson.id, 'Значение:', lesson.id);
  
    try {
      // ВАЖНО: Преобразуем ID в число
      const classId = Number(lesson.id);
      
      if (isNaN(classId)) {
        console.error('❌ lesson.id не является числом:', lesson.id);
        // Если это строка вроде 'geoc2074n', создаем числовой хеш
        const numericId = createNumericIdFromString(lesson.id);
        console.log('🔢 Сгенерирован числовой ID:', numericId);
      }
      
      // Подготавливаем данные для отправки
      const bookingData = {
        class_id: Number(lesson.id) || createNumericIdFromString(lesson.id), // Преобразуем в число
        class_name: lesson.class_name,
        class_time: `${lesson.start_time}-${lesson.end_time}`,
        class_date: lesson.date,
        trainer_name: lesson.trainer_name,
        hall_name: lesson.hall_name
      };
      
      console.log('📤 Данные после преобразования:', bookingData);
      console.log('📊 Тип class_id:', typeof bookingData.class_id);
  
      const result = await bookingAPI.createBooking(bookingData);
      console.log('✅ Успех! Ответ сервера:', result);
      
      // Обновляем локальное состояние
      const updatedSchedule = scheduleData.map(l => 
        l.id === lesson.id ? { ...l, free_spots: l.free_spots - 1 } : l
      );
      setScheduleData(updatedSchedule);
      
      const newBookedClasses = {
        ...bookedClasses,
        [lesson.id]: true
      };
      setBookedClasses(newBookedClasses);
      localStorage.setItem('yogaBookings', JSON.stringify(newBookedClasses));
      
      setUpdatedLessonId(lesson.id);
      setTimeout(() => setUpdatedLessonId(null), 500);
      
      alert(`✅ Вы успешно записались на занятие!`);
      
    } catch (error) {
      console.error('❌ Ошибка при записи на занятие:', error);
      
      // Показываем понятное сообщение об ошибке
      if (error.message.includes('class_id') && error.message.includes('integer')) {
        alert(`❌ Ошибка: ID занятия "${lesson.id}" не является числом. Пожалуйста, сообщите администратору.`);
      } else {
        alert(`❌ Ошибка: ${error.message}`);
      }
    }
  };
  
  // Функция для создания числового ID из строки
  const createNumericIdFromString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  // Функция отмены бронирования
  const handleCancelBooking = async (lessonId, lesson) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Сначала войдите в систему!');
      return;
    }
  
    if (!window.confirm('Вы уверены, что хотите отменить запись на это занятие?')) {
      return;
    }
  
    setIsLoading(true);
    setErrorMessage('');
  
    try {
      // Вариант 1: Используем cancelBookingByClassId
      const result = await bookingAPI.cancelBookingByClassId(lessonId);
      
      // ИЛИ Вариант 2: Если знаем реальный booking_id
      // const result = await bookingAPI.cancelBooking(realBookingId);
      
      // Локальное обновление
      const updatedSchedule = scheduleData.map(l => 
        l.id === lessonId ? { ...l, free_spots: l.free_spots + 1 } : l
      );
      setScheduleData(updatedSchedule);
      
      const newBookedClasses = { ...bookedClasses };
      delete newBookedClasses[lessonId];
      setBookedClasses(newBookedClasses);
      localStorage.setItem('yogaBookings', JSON.stringify(newBookedClasses));
      
      setUpdatedLessonId(lessonId);
      setTimeout(() => setUpdatedLessonId(null), 500);
      
      alert('✅ Запись успешно отменена!');
      
    } catch (error) {
      console.error('Ошибка при отмене записи:', error);
      setErrorMessage('Не удалось отменить запись. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };
  // Получение занятий для времени и дня
  const getLessonsForTimeAndDay = (startTime, dayOffset) => {
    const targetDate = new Date('2025-10-13');
    targetDate.setDate(targetDate.getDate() + dayOffset);
    const dateStr = targetDate.toISOString().split('T')[0];
    
    return filteredData.filter(lesson => 
      lesson.date === dateStr && lesson.start_time === startTime
    );
  };

  // Получение класса для занятия в зависимости от статуса
  const getLessonClass = (lesson) => {
    let className = 'lesson';
    
    if (updatedLessonId === lesson.id) {
      className += ' lesson-updated';
    }
    
    if (lesson.free_spots === 0) {
      className += ' lesson-full';
    } else if (bookedClasses[lesson.id]) {
      className += ' lesson-booked';
    }
    
    return className;
  };

  // Получение текста статуса
  const getStatusText = (lesson) => {
    if (lesson.free_spots === 0) {
      return { text: 'Мест нет', class: 'status-full' };
    } else if (bookedClasses[lesson.id]) {
      return { text: 'Вы записаны!', class: 'status-booked' };
    } else {
      return { text: `Свободно: ${lesson.free_spots} из ${lesson.total_spots}`, class: 'status-available' };
    }
  };

  // Получение класса для кнопки
  const getButtonClass = (lesson) => {
    if (lesson.free_spots === 0) {
      return 'book-button full';
    } else if (bookedClasses[lesson.id]) {
      return 'book-button booked';
    } else {
      return 'book-button';
    }
  };

  const timeSlots = [
    { start: "06:45", end: "09:00", duration: 135 },
    { start: "08:30", end: "10:15", duration: 105 },
    { start: "09:00", end: "10:30", duration: 90 },
    { start: "09:30", end: "11:00", duration: 90 },
    { start: "10:30", end: "12:00", duration: 90 },
    { start: "17:00", end: "18:30", duration: 90 },
    { start: "18:30", end: "20:00", duration: 90 }
  ];

  const dayHeaders = [
    '13 ОКТ<br>ПН', '14 ОКТ<br>ВТ', '15 ОКТ<br>СР', 
    '16 ОКТ<br>ЧТ', '17 ОКТ<br>ПТ', '18 ОКТ<br>СБ', '19 ОКТ<br>ВС'
  ];

  return (
    <div className="yoga-schedule">
      <div className="schedule-header">
        <h1>Ваш день</h1>
        <h2>Все занятия</h2>
        <p>Забронируйте место на понравившееся занятие</p>
      </div>

      {errorMessage && (
        <div className="error-message" style={{
          background: '#f8d7da',
          color: '#721c24',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {errorMessage}
        </div>
      )}

      {isLoading && (
        <div className="loading-overlay" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(255,255,255,0.9)',
          padding: '20px',
          borderRadius: '10px',
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}>
          Обработка запроса...
        </div>
      )}

      <div className="filters">
        <select 
          value={selectedTrainer} 
          onChange={(e) => setSelectedTrainer(e.target.value)}
          disabled={isLoading}
        >
          <option value="all">Все тренеры</option>
          {trainers.map(trainer => (
            <option key={trainer.id} value={trainer.id}>
              {trainer.name}
            </option>
          ))}
        </select>

        <select 
          value={selectedClass} 
          onChange={(e) => setSelectedClass(e.target.value)}
          disabled={isLoading}
        >
          <option value="all">Все группы</option>
          {classTypes.map(classType => (
            <option key={classType.id} value={classType.id}>
              {classType.name}
            </option>
          ))}
        </select>
      </div>

      <div className="schedule-grid">
        {/* Заголовок времени */}
        <div className="time-slot">Время</div>
        
        {/* Заголовки дней */}
        {dayHeaders.map((header, index) => (
          <div key={index} className="day-header" dangerouslySetInnerHTML={{ __html: header }} />
        ))}

        {/* Временные слоты и занятия */}
        {timeSlots.map((timeSlot, timeIndex) => (
          <React.Fragment key={timeIndex}>
            {/* Ячейка времени */}
            <div className="time-slot">
              {timeSlot.start.split(':')[0]}:00
            </div>
            
            {/* Ячейки для каждого дня */}
            {dayHeaders.map((_, dayIndex) => (
              <div key={dayIndex} className="day-cell">
                {getLessonsForTimeAndDay(timeSlot.start, dayIndex).map(lesson => {
                  const status = getStatusText(lesson);
                  const buttonClass = getButtonClass(lesson);
                  
                  return (
                    <div key={lesson.id} className={getLessonClass(lesson)}>
                      <div className="lesson-time">{lesson.start_time}-{lesson.end_time}</div>
                      <div className="lesson-duration">{lesson.duration} мин</div>
                      <div className="lesson-title">{lesson.class_name} ({lesson.level})</div>
                      <div className="lesson-trainer">{lesson.trainer_name}</div>
                      <div className="lesson-hall">{lesson.hall_name}</div>
                      
                      <div className={`booking-status ${status.class}`}>
                        {status.text}
                      </div>
                      
                      <div className="lesson-actions">
                        {!bookedClasses[lesson.id] ? (
                          <button
                            className={buttonClass}
                            onClick={() => handleBookClass(lesson)} // Передаем весь объект lesson
                            disabled={lesson.free_spots === 0 || isLoading}
                          >
                            {lesson.free_spots === 0 ? 'Мест нет' : 'Записаться'}
                          </button>
                        ) : (
                          <button
                            className="cancel-button"
                            onClick={() => handleCancelBooking(lesson.id, lesson)} // Передаем id и объект
                            disabled={isLoading}
                          >
                            Отменить запись
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      
      {/* Статистика бронирований */}
      <div className="booking-stats">
        <p>Забронировано занятий: {Object.keys(bookedClasses).length}</p>
        {localStorage.getItem('token') ? (
          <a href="/profile" style={{ 
            color: '#7fd381', 
            textDecoration: 'none', 
            fontWeight: '500',
            marginLeft: '20px'
          }}>
            Посмотреть мои записи в профиле →
          </a>
        ) : (
          <p style={{ color: '#666', marginTop: '10px' }}>
            <a href="/account" style={{ color: '#7fd381', textDecoration: 'none' }}>
              Войдите в систему
            </a>, чтобы записываться на занятия
          </p>
        )}
      </div>
    </div>
  );
};

export default YogaSchedule;