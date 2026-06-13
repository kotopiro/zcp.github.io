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
  
  let targetUrl = url;
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'https://' + targetUrl;
  }
  
  openProxyWindow(targetUrl);
});

function openProxyWindow(targetUrl) {
  const proxyServer = 'https://proxy-server-03vk.onrender.com';

  // about:blank を明示的に指定して新しいウィンドウを開く
  const win = window.open('about:blank', '_blank');
  
  // ポップアップブロックなどで開けなかった場合のセーフティ
  if (!win) {
    alert('⚠️ ポップアップがブロックされました！ブラウザの設定で許可してください。');
    return;
  }

  // Vercelなどの外部ツールが割り込む前に、即座に空のドキュメントを開いてロックを確保する
  win.document.open();
  
  win.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Proxy Window</title>
      <style>
        body{margin:0;background:#03030c;color:#e2e8f0;font-family:sans-serif;}
        #top-bar{position:fixed;top:0;left:0;width:100%;height:45px;background:rgba(10, 10, 25, 0.8);backdrop-filter:blur(10px);display:flex;align-items:center;padding:0 15px;z-index:9999;box-sizing:border-box;border-bottom:1px solid rgba(0, 242, 254, 0.2);}
        #top-bar button{margin-right:8px;background:#1a1a3a;color:#00f2fe;border:1px solid rgba(0, 242, 254, 0.4);border-radius:4px;cursor:pointer;padding:6px 12px;font-weight:bold;transition:all 0.2s;}
        #top-bar button:hover{background:#00f2fe;color:#000;box-shadow:0 0 10px rgba(0, 242, 254, 0.5);}
        #top-bar input{flex:1;padding:6px 12px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#fff;outline:none;}
        #top-bar input:focus{border-color:#00f2fe;}
        #proxy-frame{position:absolute;top:45px;left:0;width:100%;height:calc(100vh - 45px);border:none;background:white;}
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
        const historyStack = ['${targetUrl}'];
        let historyIndex = 0;

        function loadUrl(url){
          iframe.src = '${proxyServer}/proxy?url=' + encodeURIComponent(url);
          historyStack.splice(historyIndex + 1);
          historyStack.push(url);
          historyIndex++;
          urlInput.value = url;
        }

        document.getElementById('reload').onclick = () => { iframe.src = iframe.src; };
        document.getElementById('back').onclick = () => { if(historyIndex > 0){ historyIndex--; iframe.src = '${proxyServer}/proxy?url=' + encodeURIComponent(historyStack[historyIndex]); urlInput.value = historyStack[historyIndex]; } };
        document.getElementById('forward').onclick = () => { if(historyIndex < historyStack.length - 1){ historyIndex++; iframe.src = '${proxyServer}/proxy?url=' + encodeURIComponent(historyStack[historyIndex]); urlInput.value = historyStack[historyIndex]; } };
        urlInput.onchange = () => { loadUrl(urlInput.value); };
      </script>
    </body>
    </html>
  `);
  
  win.document.close();
}
