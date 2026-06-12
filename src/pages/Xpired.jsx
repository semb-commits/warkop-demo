export default function Expired() {
  const waNumber = "62895351432524";
  const msgBeli = encodeURIComponent("Halo, saya mau beli sistem kasir warkop full version");
  const msgSewa = encodeURIComponent("Halo, saya mau sewa sistem kasir warkop per bulan");

  return (
    <div style={{textAlign: 'center', padding: '50px', maxWidth: '500px', margin: '100px auto', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
      <h1 style={{color: '#dc2626'}}>⚠️ Masa Trial Berakhir</h1>
      <p>Demo 3 hari sudah habis. Upgrade sekarang untuk pakai tanpa batas.</p>
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px'}}>
        <a href={`https://wa.me/${waNumber}?text=${msgBeli}`} target="_blank">
          <button style={{width: '100%', background: '#16a34a'}}>Beli Sistem - Sekali Bayar</button>
        </a>
        <a href={`https://wa.me/${waNumber}?text=${msgSewa}`} target="_blank">
          <button style={{width: '100%', background: '#2563eb'}}>Sewa Sistem - Bulanan</button>
        </a>
      </div>
    </div>
  );
      }
