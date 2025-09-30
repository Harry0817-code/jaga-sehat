import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onLogin(e) {
    e.preventDefault(); // cegah reload + query string di URL
    const data = [{ email: email, password: password }];

    onLoginSuccess(data);
  }

  return (
    <div className="container-login-and-register">
      <div className="title-form-login-and-register">
        <h2 style={{ color: '#22c55e' }}>Masuk ke Akun</h2>
        <p style={{ fontSize: '14px', color: '#555', marginTop: '10px' }}>Selamat datang kembali! Silakan masuk untuk melanjutkan.</p>
      </div>
      <form onSubmit={onLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" required />
            {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Format email tidak valid
              </p>
            )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password" required />
        </div>
        <button className="btn-primary-login-and-register" type="submit">Login</button>
        <div className="divider"></div>
        <p className="footer-text-form-login-and-register">Tidak punya akun? <Link to="/register">Daftar disini</Link></p>
      </form>
    </div>
  );
}

export default LoginPage;