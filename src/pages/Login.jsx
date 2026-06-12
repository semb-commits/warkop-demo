import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate('/');
    } catch {
      setErr('Email atau password salah');
    }
  };

  return (
    <div style={{maxWidth: '400px', margin: '100px auto', padding: '30px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
      <h2 style={{textAlign: 'center'}}>Login Demo Kasir</h2>
      <form onSubmit={handleLogin}>
        <div style={{marginBottom: '15px'}}>
          <label>Email Demo</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="demo1@warkop.com" required />
        </div>
        <div style={{marginBottom: '15px'}}>
          <label>Password</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="demo123" required />
        </div>
        {err && <p style={{color: 'red'}}>{err}</p>}
        <button type="submit" style={{width: '100%'}}>Masuk</button>
      </form>
      <p style={{marginTop: '20px', fontSize: '14px', color: '#666'}}>
        Akun demo: demo1@warkop.com / demo2@warkop.com / demo3@warkop.com<br/>
        Password: demo123
      </p>
    </div>
  );
                                       }
