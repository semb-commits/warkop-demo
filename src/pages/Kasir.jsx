import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db, auth } from '../firebase';
import { signOut } from 'firebase/auth';

const menuDefault = [
  {id: 1, kategori: 'Kopi', nama: "Kopi Gelas", harga: 5000},
  {id: 2, kategori: 'Kopi', nama: "Kopi Cangkir", harga: 8000},
  {id: 3, kategori: 'Minuman', nama: "Es Teh", harga: 4000},
  {id: 4, kategori: 'Minuman', nama: "Teh Hangat", harga: 3000},
  {id: 5, kategori: 'Rokok', nama: "Marlboro", harga: 30000},
  {id: 6, kategori: 'Rokok', nama: "Sampoerna", harga: 28000},
  {id: 7, kategori: 'Makanan', nama: "Indomie Goreng", harga: 7000},
  {id: 8, kategori: 'Makanan', nama: "Indomie Kuah", harga: 7000},
];

export default function Kasir({user}) {
  const [cart, setCart] = useState([]);
  const [metode, setMetode] = useState('cash');
  const [kategori, setKategori] = useState('Semua');

  const addToCart = (item) => setCart([...cart, item]);
  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));
  const total = cart.reduce((a, b) => a + b.harga, 0);

  const checkout = async () => {
    if (cart.length === 0) return;
    const transaksiRef = ref(db, `warkop/${user.uid}/transaksi`);
    await push(transaksiRef, {
      items: cart,
      total,
      metode,
      waktu: Date.now()
    });
    alert("Transaksi berhasil disimpan!");
    setCart([]);
  };

  const filteredMenu = kategori === 'Semua' ? menuDefault : menuDefault.filter(m => m.kategori === kategori);
  const kategoris = ['Semua', ...new Set(menuDefault.map(m => m.kategori))];

  return (
    <div>
      <div style={{background: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
        <h3 style={{margin: 0}}>Kasir Warkop</h3>
        <button onClick={() => signOut(auth)} style={{background: '#dc2626'}}>Logout</button>
      </div>

      <div style={{display: 'flex', gap: '20px', padding: '20px', flexWrap: 'wrap'}}>
        <div style={{flex: 1, minWidth: '300px'}}>
          <h3>Menu</h3>
          <select value={kategori} onChange={e => setKategori(e.target.value)} style={{marginBottom: '15px'}}>
            {kategoris.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
          
          <div style={{display: 'grid', gap: '10px'}}>
            {filteredMenu.map(m => (
              <div key={m.id} style={{background: 'white', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <div>
                  <strong>{m.nama}</strong><br/>
                  <small style={{color: '#666'}}>{m.kategori} - Rp{m.harga.toLocaleString()}</small>
                </div>
                <button onClick={() => addToCart(m)}>+</button>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{width: '350px', background: 'white', padding: '20px', borderRadius: '8px', height: 'fit-content', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
          <h3>Keranjang</h3>
          {cart.length === 0 ? <p>Belum ada item</p> : 
            cart.map((c, i) => (
              <div key={i} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px'}}>
                <span>{c.nama}</span>
                <span>Rp{c.harga.toLocaleString()} <button onClick={() => removeFromCart(i)} style={{background: '#dc2626', padding: '2px 8px', fontSize: '12px'}}>x</button></span>
              </div>
            ))
          }
          <h3 style={{borderTop: '2px solid #eee', paddingTop: '10px'}}>Total: Rp{total.toLocaleString()}</h3>
          
          <label>Metode Bayar</label>
          <select value={metode} onChange={e => setMetode(e.target.value)} style={{marginBottom: '15px'}}>
            <option value="cash">Cash</option>
            <option value="qris">QRIS</option>
          </select>
          
          {metode === 'qris' && (
            <div style={{textAlign: 'center', marginBottom: '15px'}}>
              <p>Scan QR ini:</p>
              <img src="/qris-demo.jpg" alt="QRIS" style={{width: '100%', maxWidth: '200px'}}/>
            </div>
          )}
          
          <button onClick={checkout} disabled={cart.length === 0} style={{width: '100%'}}>Proses Pembayaran</button>
        </div>
      </div>
    </div>
  );
   }
