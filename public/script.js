document.getElementById('launch-btn').addEventListener('click', () => {
  const url = document.getElementById('launch-url').value.trim();
  if (!url) return alert('URL を入力してください');

  const proxyServer = "https://proxy-server-03vk.onrender.com/proxy?URL="; // ← 独立プロキシの URL に置き換え

  const win = window.open('about:blank', '_blank', 'noopener');
  if (!win) return alert('ポップアップがブロックされています');

  setTimeout(() => {
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
#go,#proxyToggle,#back,#forward{padding:8px;border-radius:6px;border:none;background:#333;color:#5ee7ff;cursor:pointer;}
#iframeView{flex:1;width:100%;border:none;}
</style>
</head>
<body>
<div id="toolbar">
<button id="back">◀</button>
<button id="forward">▶</button>
<input id="url" value="${url}" />
<button id="go">Go</button>
<button id="proxyToggle">Proxy: ON</button>
</div>
<iframe id="iframeView"></iframe>
<script type="module">
const iframe=document.getElementById('iframeView');
const urlInput=document.getElementById('url');
const proxyBtn=document.getElementById('proxyToggle');
const backBtn=document.getElementById('back');
const forwardBtn=document.getElementById('forward');
let proxy=true;
const historyStack=[];
let historyIndex=-1;

function loadURL(u){
  if(!u) return;
  if(!u.startsWith('http')) u='https://'+u;
  iframe.src = proxy ? "${proxyServer}" + encodeURIComponent(u) : u;
  if(historyIndex===-1 || historyStack[historyIndex]!==u){
    historyStack.splice(historyIndex+1);
    historyStack.push(u);
    historyIndex=historyStack.length-1;
  }
  urlInput.value = u;
}

document.getElementById('go').onclick = () => loadURL(urlInput.value);
urlInput.addEventListener('keydown', e => { if(e.key==='Enter') loadURL(urlInput.value); });
proxyBtn.onclick = () => { proxy = !proxy; proxyBtn.textContent = proxy?'Proxy: ON':'Proxy: OFF'; if(urlInput.value) loadURL(urlInput.value); };
backBtn.onclick = () => { if(historyIndex>0){ historyIndex--; loadURL(historyStack[historyIndex]); } };
forwardBtn.onclick = () => { if(historyIndex<historyStack.length-1){ historyIndex++; loadURL(historyStack[historyIndex]); } };

if(urlInput.value) loadURL(urlInput.value);
</script>
</body>
</html>
    `;
    win.document.open();
    win.document.write(html);
    win.document.close();
  }, 1);
});
