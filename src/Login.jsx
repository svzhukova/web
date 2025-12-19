import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.detail || "Ошибка входа");
      }
      
      // Сохраняем токен в localStorage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // Перенаправляем на профиль
      navigate("/profile");
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Вход</h2>
      
      <form onSubmit={submit}>
        <input 
          name="email" 
          type="email"
          placeholder="Email" 
          value={form.email}
          onChange={handleChange} 
          required
          style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Пароль" 
          value={form.password}
          onChange={handleChange} 
          required
          style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
        />

        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: "10px 20px",
            background: loading ? "#ccc" : "#28a745",
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            width: "100%"
          }}
        >
          {loading ? "Вход..." : "Войти"}
        </button>
      </form>

      {error && (
        <div style={{ 
          marginTop: "15px", 
          padding: "10px", 
          background: "#f8d7da", 
          color: "#721c24",
          borderRadius: "4px"
        }}>
          ❌ {error}
        </div>
      )}
    </div>
  );
}

export default Login;