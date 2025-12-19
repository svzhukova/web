import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "./api";

export default function Register() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await register(form);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          placeholder="Имя"
          required
          style={{ width: "100%", margin: "10px 0", padding: "8px" }}
        />
        <input
          type="text"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          placeholder="Фамилия"
          required
          style={{ width: "100%", margin: "10px 0", padding: "8px" }}
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={{ width: "100%", margin: "10px 0", padding: "8px" }}
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Телефон"
          required
          style={{ width: "100%", margin: "10px 0", padding: "8px" }}
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Пароль"
          required
          minLength={6}
          style={{ width: "100%", margin: "10px 0", padding: "8px" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            background: loading ? "#ccc" : "#882df7",
            color: "white",
            border: "none",
          }}
        >
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
      {error && <div style={{ color: "red", marginTop: 10 }}>❌ {error}</div>}
    </div>
  );
}
