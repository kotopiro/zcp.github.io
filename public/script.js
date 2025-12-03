document.getElementById('launch-btn').addEventListener('click', () => {
  const url = document.getElementById('launch-url').value.trim();
  const win = window.open('about:blank', '_blank', 'noopener');
  if(!win){ alert('ポップアップがブロックされています'); return; }

  const proxyServer = "https://YOUR_RENDER_URL_HERE/proxy?url="; // ←ここをRender URLに置き換え

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>ZCP Proxy Browser</title>
<style>
body{margin:0;background:#000;color:#fff;font-family:sans-serif;display:flex;flex-direction:column;height:100vh;}
#toolbar{display:flex;gap:6px;padding:8px;background:#111;}
#url{flex:1;padding:8px;border-radius:6px;border:none;background:#222;color:#5ee7ff;}
#go,#proxyToggle{padding:8px;border-radius:6px;border:none;background:#333;color:#5ee7ff;cursor:pointer;}
#iframeView{flex:1;width:100%;border:none;}
</style>
</head>
<body>
<div id="toolbar">
<input id="url" value="${url}" />
<button id="go">Go</button>
<button id="proxyToggle">Proxy: ON</button>
</div>
<iframe id="iframeView"></iframe>
<script>
const iframe=document.getElementById('iframeView');
const urlInput=document.getElementById('url');
const proxyBtn=document.getElementById('proxyToggle');
let proxy=true;

function loadURL(u){
  if(!u) return;
  if(!u.startsWith('http')) u='https://'+u;
  iframe.src = proxy ? "${proxyServer}" + encodeURIComponent(u) : u;
}

document.getElementById('go').onclick=()=>loadURL(urlInput.value);
urlInput.addEventListener('keydown',e=>{if(e.key==='Enter') loadURL(urlInput.value)});
proxyBtn.onclick=()=>{
  proxy=!proxy;
  proxyBtn.textContent = proxy?'Proxy: ON':'Proxy: OFF';
  if(urlInput.value) loadURL(urlInput.value);
};

if(urlInput.value) loadURL(urlInput.value);
</script>
</body>
</html>
  `;
  win.document.write(html);
  win.document.close();
});
