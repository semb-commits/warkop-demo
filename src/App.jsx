import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, db } from './firebase';
import Login from './pages/Login';
import Kasir from './pages/Kasir';
import Expired from './pages/Expired';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const snap = await get(ref(db, `warkop/${u.uid}/license/expiredAt`));
        if (snap.exists()) {
          if (Date.now() > snap.val()) setExpired(true);
        }
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <div style={{textAlign: 'center', padding: '50px'}}>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          !user ? <Navigate to="/login" /> :
          expired ? <Navigate to="/expired" /> :
          <Kasir user={user} />
        } />
        <Route path="/expired" element={<Expired />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
