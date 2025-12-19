// services/api.js - ИСПРАВЛЕННАЯ ВЕРСИЯ с query параметрами
const API_URL = 'http://127.0.0.1:8000';

// Базовые заголовки
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

// Функция для создания URL с токеном в query параметре
const buildURL = (endpoint) => {
  const token = localStorage.getItem('token');
  let url = `${API_URL}${endpoint}`;
  
  if (token) {
    // Добавляем токен как query параметр
    const separator = url.includes('?') ? '&' : '?';
    url = `${url}${separator}token=${encodeURIComponent(token)}`;
  }
  
  console.log('🔗 URL:', url);
  return url;
};

// Функция для создания числового ID
export const createNumericIdFromString = (str) => {
  if (typeof str === 'number') return str;
  if (!str) return 0;
  
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

// Обработка ответов
const handleResponse = async (response, endpoint) => {
  console.log(`📥 ${endpoint}: статус ${response.status}`);
  
  if (!response.ok) {
    const text = await response.text();
    console.error(`❌ Ошибка ${response.status}:`, text);
    
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw new Error('Сессия истекла');
    }
    
    throw new Error(`Ошибка ${response.status}`);
  }
  
  const data = await response.json();
  console.log(`✅ ${endpoint}: успешно, ${Array.isArray(data) ? data.length + ' записей' : 'данные получены'}`);
  return data;
};

export const bookingAPI = {
  // Получить мои записи
  getMyBookings: async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.log('⚠️ Нет токена');
        return [];
      }
      
      console.log('📤 Запрашиваем записи...');
      
      const url = buildURL('/bookings/my');
      const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders()
      });
      
      const data = await handleResponse(response, 'getMyBookings');
      return Array.isArray(data) ? data : [];
      
    } catch (error) {
      console.error('❌ Ошибка:', error.message);
      return [];
    }
  },

  // Создать запись
  createBooking: async (bookingData) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Требуется авторизация');
      }
      
      console.log('📤 Создаем запись:', bookingData);
      
      const dataToSend = {
        ...bookingData,
        class_id: createNumericIdFromString(bookingData.class_id)
      };
      
      const url = buildURL('/bookings/');
      const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(dataToSend)
      });
      
      return await handleResponse(response, 'createBooking');
      
    } catch (error) {
      console.error('💥 Ошибка:', error);
      throw error;
    }
  },

  // Отменить запись
  cancelBooking: async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Требуется авторизация');
      }
      
      console.log(`📤 Отменяем запись: ${bookingId}`);
      
      // Преобразуем ID
      let numericId;
      if (typeof bookingId === 'string') {
        numericId = parseInt(bookingId, 10);
        if (isNaN(numericId)) {
          numericId = createNumericIdFromString(bookingId);
        }
      } else {
        numericId = Number(bookingId);
      }
      
      console.log(`🔢 Числовой ID: ${numericId}`);
      
      const url = buildURL(`/bookings/${numericId}`);
      const response = await fetch(url, {
        method: 'DELETE',
        headers: getHeaders()
      });
      
      return await handleResponse(response, 'cancelBooking');
      
    } catch (error) {
      console.error('💥 Ошибка:', error);
      throw error;
    }
  },

  // Тестовая функция
  testConnection: async () => {
    const token = localStorage.getItem('token');
    const url = `${API_URL}/bookings/my?token=${token}`;
    
    console.log('🔍 Тестируем соединение...');
    console.log('URL:', url);
    
    try {
      const response = await fetch(url);
      console.log('Статус:', response.status);
      return response.ok;
    } catch (error) {
      console.error('Ошибка:', error);
      return false;
    }
  }
};