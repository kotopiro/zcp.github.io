// Starfield animation
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();
for (let i=0;i<200;i++) stars.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, size:Math.random()*2, speed:Math.random()*0.5+0.1});
function animate() {
  ctx.fillStyle='black';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='white';
  stars.forEach(s=>{
    s.y -= s.speed;
    if(s.y<0)s.y=canvas.height;
    ctx.beginPath(); ctx.arc(s.x,s.y,s.size,0,2*Math.PI); ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

// Proxy launch
document.getElementById('proxyForm').addEventListener('submit', e=>{
  e.preventDefault();
  const url = document.getElementById('urlInput').value;
  const proxyUrl = `https://proxy-server-03vk.onrender.com/proxy?url=${encodeURIComponent(url)}`;
  const win = window.open('about:blank');
  win.document.write(`<!DOCTYPE html><html><head><title>Proxy</title></head><body style="margin:0;"><iframe src="${proxyUrl}" style="border:none;width:100%;height:100vh;"></iframe></body></html>`);
  win.document.close();
});
