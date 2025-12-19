const API_URL = import.meta.env.VITE_API_URL || 'https://studio-backend-8rnj.onrender.com';
const token = localStorage.getItem("token");

await fetch(`${API_URL}/bookings`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`  // ← так правильно
  },
  body: JSON.stringify(bookingData)
});
export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Ошибка входа");
  }

  return res.json();
}

export async function register(userData) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Ошибка регистрации");
  }

  return res.json();
}

export async function getProfile() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Ошибка загрузки профиля");
  }

  return res.json();
}