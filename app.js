// ---------- Starfield ----------
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

// ---------- Proxy launch ----------
document.getElementById('proxyForm').addEventListener('submit', e=>{
  e.preventDefault();
  const url = document.getElementById('urlInput').value;
  openProxyWindow(url);
});

function openProxyWindow(targetUrl) {
  // ← ここに Render プロキシサーバーの Live URL を入れる
  const proxyServer = 'https://proxy-server-03vk.onrender.com';  

  const win = window.open('', '_blank');
  win.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Proxy Window</title>
      <style>
        body { margin:0; background:black; color:#ddd; }
        #top-bar {
          position: fixed;
          top:0; left:0; width:100%; height:40px;
          background:#111; display:flex; align-items:center; padding:0 5px; z-index:9999;
        }
        #top-bar button { margin-right:5px; background:#333; color:#fff; border:none; border-radius:3px; cursor:pointer; }
        #top-bar input { flex:1; padding:5px; border-radius:3px; border:none; }
        #proxy-frame { position:absolute; top:40px; left:0; width:100%; height:calc(100vh - 40px); border:none; }
      </style>
    </head>
    <body>
      <div id="top-bar">
        <button id="back">←</button>
        <button id="forward">→</button>
        <input id="url-bar" type="url" value="${targetUrl}">
        <button id="reload">⟳</button>
      </div>
      <iframe id="proxy-frame" src="${proxyServer}/proxy?url=${encodeURIComponent(targetUrl)}"></iframe>
      <script>
        const iframe = document.getElementById('proxy-frame');
        const urlInput = document.getElementById('url-bar');
        const historyStack = [];
        let historyIndex = -1;

        function loadUrl(url) {
          iframe.src = '${proxyServer}/proxy?url=' + encodeURIComponent(url);
          historyStack.splice(historyIndex+1);
          historyStack.push(url);
          historyIndex++;
          urlInput.value = url;
        }

        document.getElementById('reload').onclick = () => {
          iframe.src = iframe.src;
        };

        document.getElementById('back').onclick = () => {
          if(historyIndex>0){
            historyIndex--;
            loadUrl(historyStack[historyIndex]);
          }
        };

        document.getElementById('forward').onclick = () => {
          if(historyIndex<historyStack.length-1){
            historyIndex++;
            loadUrl(historyStack[historyIndex]);
          }
        };

        urlInput.onchange = () => {
          loadUrl(urlInput.value);
        };
      </script>
    </body>
    </html>
  `);
  win.document.close();
}
