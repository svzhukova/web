const API_URL = 'https://studio-backend-8rnj.onrender.com';


export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Ошибка входа');
  }

  return res.json();
}

export async function register(userData) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Ошибка регистрации');
  }

  return res.json(); // { id, first_name, ... }
}

/**
 * Получение профиля текущего пользователя
 */
export async function getProfile() {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Пользователь не авторизован');
  }

  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Ошибка загрузки профиля');
  }

  return res.json();
}

/**
 * Создание новой записи на занятие
 */
export async function createBooking(bookingData) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Пользователь не авторизован');
  }

  const res = await fetch(`${API_URL}/bookings/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Ошибка бронирования: ${res.status}`);
  }

  return res.json();
}

/**
 * Получение списка записей пользователя
 */
export async function getMyBookings() {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Пользователь не авторизован');
  }

  const res = await fetch(`${API_URL}/bookings/my`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Ошибка загрузки записей');
  }

  return res.json();
}

/**
 * Отмена записи на занятие
 */
export async function cancelBooking(bookingId) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Пользователь не авторизован');
  }

  const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Ошибка отмены записи');
  }

  return res.json(); // { message: "Запись успешно отменена" }
}