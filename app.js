// ---------- Cyber Starfield (3D Warp Effect) ----------
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
const numStars = 300;
let speed = 2;

function resize() { 
  canvas.width = window.innerWidth; 
  canvas.height = window.innerHeight; 
}
window.addEventListener('resize', resize); 
resize();

function initStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width - canvas.width / 2,
      y: Math.random() * canvas.height - canvas.height / 2,
      z: Math.random() * canvas.width,
      size: Math.random() * 2
    });
  }
}
initStars();

function animate() {
  ctx.fillStyle = 'rgba(3, 3, 12, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  stars.forEach(s => {
    s.z -= speed;
    if (s.z <= 0) {
      s.z = canvas.width;
      s.x = Math.random() * canvas.width - cx;
      s.y = Math.random() * canvas.height - cy;
    }

    const k = 128.0 / s.z;
    const px = s.x * k + cx;
    const py = s.y * k + cy;

    if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
      const size = (1 - s.z / canvas.width) * s.size * 2;
      const alpha = 1 - s.z / canvas.width;
      
      ctx.beginPath();
      ctx.fillStyle = `rgba(0, 242, 254, ${alpha})`;
      ctx.arc(px, py, size < 0.5 ? 0.5 : size, 0, 2 * Math.PI);
      ctx.fill();
    }
  });

  requestAnimationFrame(animate);
}
animate();

// ---------- Proxy launch ----------
document.getElementById('launch').addEventListener('click', () => {
  const url = document.getElementById('urlInput').value;
  if (!url) return alert('URLを入力してください');
  
  // URLの簡易自動補完 (http/httpsがなければ追加)
  let targetUrl = url;
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'https://' + targetUrl;
  }
  
  openProxyWindow(targetUrl);
});

function openProxyWindow(targetUrl) {
  // あなたのRenderサーバーURL
  const proxyServer = 'https://proxy-server-03vk.onrender.com'; 
  
  // 【ポイント】空ウィンドウを作って書き込むのをやめ、直接プロキシURLを開く
  // これにより、Vercel干渉による null (reading 'document') エラーは100%発生しなくなります
  
  // もしお使いのプロキシサーバーが「Base64形式」なら下の1行を有効にしてください
  // const finalUrl = `${proxyServer}/service/${window.btoa(targetUrl).replace(/=/g, '')}`;
  
  // お使いのプロキシサーバーが「従来のクエリ形式」なら下の1行を使用します
  const finalUrl = `${proxyServer}/proxy?url=${encodeURIComponent(targetUrl)}`;

  const win = window.open(finalUrl, '_blank');
  
  if (!win) {
    alert('⚠️ ポップアップがブロックされました！ブラウザの設定で許可してください。');
  }
}
