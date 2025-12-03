// --- 軽量星空アニメ ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, size: Math.random()*2+1, speed: Math.random()*0.5+0.1 });
}
function animateStars() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#fff";
  for(const s of stars){
    s.y += s.speed;
    if(s.y>canvas.height)s.y=0;
    ctx.fillRect(s.x,s.y,s.size,s.size);
  }
  requestAnimationFrame(animateStars);
}
animateStars();

// --- about:blank ブラウザ & Proxy ---
document.getElementById('launch-btn').addEventListener('click', () => {
  const url = document.getElementById('launch-url').value.trim();
  if (!url) return alert('URL を入力してください');

  const proxyServer = "https://proxy-server-03vk.onrender.com/proxy?url=";

  // ポップアップを開く
  const win = window.open('', '_blank', 'noopener,width=1000,height=700');
  if (!win) return alert('ポップアップがブロックされています');

  // DOMContentLoaded イベントで安全に iframe を作成
  win.document.write(`<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>ZCP Proxy Browser</title>
<style>
body{margin:0;background:#000;color:#fff;font-family:sans-serif;display:flex;flex-direction:column;height:100vh;}
#toolbar{display:flex;gap:6px;padding:8px;background:#111;}
#url{flex:1;padding:8px;border-radius:6px;border:none;background:#222;color:#5ee7ff;}
#go{padding:8px;border-radius:6px;border:none;background:#333;color:#5ee7ff;cursor:pointer;}
#iframeView{flex:1;width:100%;border:none;}
</style>
</head>
<body>
<div id="toolbar">
<input id="url" value="${url}" />
<button id="go">Go</button>
</div>
<iframe id="iframeView"></iframe>
<script>
document.addEventListener('DOMContentLoaded', ()=>{
  const iframe = document.getElementById('iframeView');
  const input = document.getElementById('url');
  function loadURL(u){
    if(!u) return;
    if(!u.startsWith('http')) u='https://'+u;
    iframe.src = "${proxyServer}" + encodeURIComponent(u);
  }
  document.getElementById('go').onclick = ()=>loadURL(input.value);
  input.addEventListener('keydown', e=>{ if(e.key==='Enter') loadURL(input.value); });
  loadURL(input.value);
});
</script>
</body>
</html>`);
  win.document.close();
});
