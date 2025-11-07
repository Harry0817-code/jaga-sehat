import { Link } from 'react-router-dom';
import React from 'react';

function Navigations({ authedUser, onLogout }) {
  if (authedUser?.role === 'admin') {
    return (
      <button onClick={onLogout} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxvZy1vdXQtaWNvbiBsdWNpZGUtbG9nLW91dCI+PHBhdGggZD0ibTE2IDE3IDUtNS01LTUiLz48cGF0aCBkPSJNMjEgMTJIOSIvPjxwYXRoIGQ9Ik05IDIxSDVhMiAyIDAgMCAxLTItMlY1YTIgMiAwIDAgMSAyLTJoNCIvPjwvc3ZnPg=="
          alt="Profile Icon"
        />
      </button>
    );
  }
  
  return (
    <nav>
      {authedUser ? (
        <>
        <Link to="/" className='btn-nav-login'>Beranda</Link>
        <Link to="/chat-doctors" className='btn-nav-login'>Pesan dengan Dokter</Link>
        <Link to="/check-ideal" className='btn-nav-login'>Cek Badan Ideal</Link>
        <button onClick={onLogout} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxvZy1vdXQtaWNvbiBsdWNpZGUtbG9nLW91dCI+PHBhdGggZD0ibTE2IDE3IDUtNS01LTUiLz48cGF0aCBkPSJNMjEgMTJIOSIvPjxwYXRoIGQ9Ik05IDIxSDVhMiAyIDAgMCAxLTItMlY1YTIgMiAwIDAgMSAyLTJoNCIvPjwvc3ZnPg=="
            alt="Profile Icon"
          />
        </button>
        </>
      ) : (
        <>
        <div className="auth-buttons">
          <Link to="/login-apps" className='btn-nav-login'>Masuk</Link>
          <Link to="/register" className='btn-nav-register'>Daftar</Link>
        </div>
        </>
      )}
    </nav>
  );
}

export default Navigations;