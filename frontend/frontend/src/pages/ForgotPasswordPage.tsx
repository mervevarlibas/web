// src/pages/ForgotPasswordPage.tsx dosyasının en üstü
import { useState } from "react";
import type { FormEvent } from "react"; // HATA BURADA ÇÖZÜLÜYOR
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <div className="auth-sayfasi">
      <h2 className="bolum-baslik">Şifremi Unuttum</h2>
      <p>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
      
      {sent && (
        <p className="mesaj mesaj-basari">Bağlantı {email} adresine gönderildi (demo).</p>
      )}
      
      {!sent && (
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label>E-posta</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} aria-invalid={error ? true : undefined} />
            {error && <span className="hata-metni">{error}</span>}
          </div>
          <button type="submit" className="buton">Bağlantı gönder</button>
        </form>
      )}
      
      <div style={{ marginTop: "20px" }}>
        <Link to="/login">← Girişe dön</Link>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;