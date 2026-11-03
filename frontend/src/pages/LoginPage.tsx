// src/pages/LoginPage.tsx dosyasının en üstü
import { useState } from "react";
import type { FormEvent } from "react"; // HATA BURADA ÇÖZÜLÜYOR
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};
    
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <div className="auth-sayfasi">
      <h2 className="bolum-baslik">Giriş Yap</h2>
      
      {sent ? (
        <p className="mesaj mesaj-basari">Gerçek giriş Sprint 10'da yapılacak (demo).</p>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="email">E-posta</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} aria-invalid={errors.email ? true : undefined} />
            {errors.email && <span className="hata-metni">{errors.email}</span>}
          </div>
          <div>
            <label htmlFor="password">Şifre</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} aria-invalid={errors.password ? true : undefined} />
            {errors.password && <span className="hata-metni">{errors.password}</span>}
          </div>
          <button type="submit" className="buton">Giriş yap</button>
        </form>
      )}

      <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
        <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </div>
    </div>
  );
}

export default LoginPage;