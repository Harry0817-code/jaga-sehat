import React, { useState } from 'react';
import { register } from '../utils/network-data';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isFormValid = 
    fullName.trim()!== "" &&
    gender.trim() !== "" &&
    birthday.trim() !== "" &&
    email.trim() !== "" && 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword;

  async function onRegister(e) {
    e.preventDefault(); // cegah reload + query string di URL
    try {
      await register({ fullname: fullName, email, password, birthday, gender });
      navigate('/login-apps');
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      throw new Error("Maaf ada kesalahan");
    }
  }

  return (
    <div className="container-login-and-register">
      <div className="title-form-login-and-register">
        <h2 style={{ color: '#22c55e' }}>Selamat Bergabung</h2>
        <p style={{ fontSize: '14px', color: '#555', marginTop: '10px' }}>Yuk bergabung dengan jutaan orang yang telah memulai hidup sehat.</p>
      </div>
      <form onSubmit={onRegister}>
        <div className="form-group">
          <label htmlFor="fullname">Nama Lengkap
            {fullName === "" && <span style={{ color: 'red', marginLeft: '3px' }}>*</span>}
          </label>
          <input 
            type="text"
            id="fullname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Masukan nama lengkap anda" required />
        </div>
        <div className="form-group">
          <label htmlFor="fullname">Jenis Kelamin
            {gender === "" && <span style={{ color: 'red', marginLeft: '3px' }}>*</span>}
          </label>
          <div className="radio-group">
            <div className="radio-option">
              <input 
                type="radio"
                id='male'
                name="gender" 
                value="Laki-laki" 
                checked={gender === "Laki-laki"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label htmlFor='male'>Laki - Laki</label>
            </div>
            <div className="radio-option">
              <input 
                type="radio"
                id='female'
                name="gender" 
                value="Perempuan" 
                checked={gender === "Perempuan"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label htmlFor='female'>Perempuan</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="birthday">Tanggal Lahir
            {birthday === "" && <span style={{ color: 'red', marginLeft: '3px' }}>*</span>}
          </label>
          <input 
            type="date"
            id="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email
            {email === "" && (<span style={{ color: 'red', marginLeft: '3px' }}>*</span>)}
          </label>
          <input 
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            placeholder="Masukan email anda" required />
            {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Format email tidak valid
              </p>
            )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password
            {password === "" && <span style={{ color: 'red', marginLeft: '3px' }}>*</span>}
          </label>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.toLowerCase())}
            placeholder="Masukan password anda" required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Konfirmasi Password
            {confirmPassword === "" && <span style={{ color: 'red', marginLeft: '3px' }}>*</span>}
          </label>
          <input 
            type="password"
            id="confirmpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value.toLowerCase())}
            placeholder="Masukan ulang password anda" required />
            {confirmPassword && password !== confirmPassword && (
              <p style={{ color: "red", fontSize: "12px" }}>Password tidak sama</p>
            )}
        </div>
        <button className={`btn-primary-login-and-register ${!isFormValid ? "disabled" : ""}`} type="submit" disabled={!isFormValid} >Register</button>
        <div className="divider"></div>
        <p className="footer-text-form-login-and-register">Sudah punya akun? <Link to="/login-apps">Masuk disini</Link></p>
      </form>
    </div>
  );
}

export default RegisterPage;