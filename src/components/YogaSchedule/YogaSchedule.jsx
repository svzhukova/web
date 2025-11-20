import React, { useState, useEffect } from 'react';
import { trainers, classTypes, generateSchedule, bookClass, cancelBooking } from './data';
import './YogaSchedule.css';

const YogaSchedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [bookedClasses, setBookedClasses] = useState({});
  const [updatedLessonId, setUpdatedLessonId] = useState(null);

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
  }, []);

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

  // Функция бронирования
  const handleBookClass = (lessonId) => {
    const updatedSchedule = bookClass(scheduleData, lessonId);
    setScheduleData(updatedSchedule);
    
    // Добавляем в список забронированных
    const newBookedClasses = {
      ...bookedClasses,
      [lessonId]: true
    };
    setBookedClasses(newBookedClasses);
    
    // Сохраняем в localStorage
    localStorage.setItem('yogaBookings', JSON.stringify(newBookedClasses));
    
    // Анимация обновления
    setUpdatedLessonId(lessonId);
    setTimeout(() => setUpdatedLessonId(null), 500);
  };

  // Функция отмены бронирования
  const handleCancelBooking = (lessonId) => {
    const updatedSchedule = cancelBooking(scheduleData, lessonId);
    setScheduleData(updatedSchedule);
    
    // Удаляем из списка забронированных
    const newBookedClasses = { ...bookedClasses };
    delete newBookedClasses[lessonId];
    setBookedClasses(newBookedClasses);
    
    // Сохраняем в localStorage
    localStorage.setItem('yogaBookings', JSON.stringify(newBookedClasses));
    
    // Анимация обновления
    setUpdatedLessonId(lessonId);
    setTimeout(() => setUpdatedLessonId(null), 500);
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

      <div className="filters">
        <select 
          value={selectedTrainer} 
          onChange={(e) => setSelectedTrainer(e.target.value)}
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
                            onClick={() => handleBookClass(lesson.id)}
                            disabled={lesson.free_spots === 0}
                          >
                            {lesson.free_spots === 0 ? 'Мест нет' : 'Записаться'}
                          </button>
                        ) : (
                          <button
                            className="cancel-button"
                            onClick={() => handleCancelBooking(lesson.id)}
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
      </div>
    </div>
  );
};

export default YogaSchedule;