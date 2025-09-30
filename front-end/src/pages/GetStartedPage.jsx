import React from 'react';
import { Link } from 'react-router-dom';

function GetStartedPage() {
  return (
    <div className="container-started">
      <div className="hero-started">
        <div className="badge">⭐ Aplikasi Kesehatan #1 di Indonesia</div>
        <h1><span>Jaga Sehat</span><br/> Hidup Lebih Sehat</h1>
        <p>
          Ini adalah sebuah aplikasi yang bernama Jaga Sehat. Platform terpercaya untuk memantau, 
          mengelola, dan meningkatkan kesehatan Anda setiap hari.
        </p>
        <div className="buttons-started">
          <Link to="/register" className="btn-started-to-register">Mulai Sekarang →</Link>
        </div>

        {/* Statistik */}
        <div className="stats-starter">
          <div><strong>50K+</strong><br/>Pengguna Aktif</div>
          <div><strong>1000+</strong><br/>Dokter Partner</div>
          <div><strong>4.9</strong><br/>Rating App</div>
        </div>
      </div>

      <img src="/assets/img-started.png" alt="Doctors Illustration" />
    </div>
  );
}

export default GetStartedPage;