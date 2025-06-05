import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else window.location.href = '/'; // Po želji koristi navigate ili history.push ako koristiš react-router-dom v6+
  };

  return (
    <div>
      <h2>Prijava</h2>
      <form onSubmit={handleLogin}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Lozinka" type="password" />
        <button type="submit">Prijavi se</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}
