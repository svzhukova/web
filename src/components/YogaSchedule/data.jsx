// Твои вымышленные данные
export const trainers = [
    { id: 1, name: "Екатерина Пелунская" },
    { id: 2, name: "Софья Полтавец" },
    { id: 3, name: "Александра Викорёва" },
    { id: 4, name: "Полина Гераскина" }
  ];
  
  export const classTypes = [
    { id: 1, name: "ОНЛАЙН ЙОГА", levels: ["ALL LEVEL"] },
    { id: 2, name: "ХАТХА ЙОГА", levels: ["ALL LEVEL", "BEGINNER"] },
    { id: 3, name: "ВИНЬЯСА ЙОГА", levels: ["ALL LEVEL"] },
    { id: 4, name: "ОНЛПЙН ЙОГА LED", levels: ["ALL LEVEL"] }
  ];
  
  export const halls = [
    { id: 1, name: "Зал 1" },
    { id: 2, name: "Зал 2" }
  ];
  
  export const timeSlots = [
    { start: "06:45", end: "09:00", duration: 135 },
    { start: "08:30", end: "10:15", duration: 105 },
    { start: "09:00", end: "10:30", duration: 90 },
    { start: "09:30", end: "11:00", duration: 90 },
    { start: "10:30", end: "12:00", duration: 90 },
    { start: "17:00", end: "18:30", duration: 90 },
    { start: "18:30", end: "20:00", duration: 90 }
  ];
  
  export const generateSchedule = () => {
    const schedule = [];
    const baseDate = new Date('2025-10-13');
    
    // Занятия которые будут БЕЗ свободных мест
    const fullClasses = [
      { day: 0, time: "09:00" }, // Понедельник 09:00
      { day: 1, time: "18:30" }, // Вторник 18:30
      { day: 3, time: "10:30" }, // Четверг 10:30
      { day: 4, time: "17:00" }, // Пятница 17:00
      { day: 6, time: "09:30" }  // Воскресенье 09:30
    ];
    
    for (let day = 0; day < 7; day++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(baseDate.getDate() + day);
      
      const dailySlots = [...timeSlots]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3 + Math.floor(Math.random() * 3))
        .sort((a, b) => a.start.localeCompare(b.start));
      
      dailySlots.forEach(slot => {
        const classType = classTypes[Math.floor(Math.random() * classTypes.length)];
        const level = classType.levels[Math.floor(Math.random() * classType.levels.length)];
        const trainer = trainers[Math.floor(Math.random() * trainers.length)];
        const hall = halls[Math.floor(Math.random() * halls.length)];
        const totalSpots = 30;
        
        // Проверяем, должно ли это занятие быть без мест
        const isFullClass = fullClasses.some(full => 
          full.day === day && full.time === slot.start
        );
        
        const bookedSpots = isFullClass ? totalSpots : Math.floor(Math.random() * 25);
        
        schedule.push({
          id: Math.random().toString(36).substr(2, 9),
          date: currentDate.toISOString().split('T')[0],
          start_time: slot.start,
          end_time: slot.end,
          duration: slot.duration,
          class_name: classType.name,
          level: level,
          trainer_name: trainer.name,
          trainer_id: trainer.id,
          hall_name: hall.name,
          total_spots: totalSpots,
          booked_spots: bookedSpots,
          free_spots: totalSpots - bookedSpots
        });
      });
    }
    
    return schedule;
  };

  export const bookClass = (schedule, classId) => {
    return schedule.map(lesson => {
      if (lesson.id === classId && lesson.free_spots > 0) {
        return {
          ...lesson,
          booked_spots: lesson.booked_spots + 1,
          free_spots: lesson.free_spots - 1
        };
      }
      return lesson;
    });
  };
  
  // Функция для отмены бронирования
  export const cancelBooking = (schedule, classId) => {
    return schedule.map(lesson => {
      if (lesson.id === classId && lesson.booked_spots > 0) {
        return {
          ...lesson,
          booked_spots: lesson.booked_spots - 1,
          free_spots: lesson.free_spots + 1
        };
      }
      return lesson;
    });
  };