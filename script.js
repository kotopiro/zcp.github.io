function openTakorouBrowser() {
    const win = window.open("about:blank", "_blank");
    if (!win) return alert("ポップアップブロック中");

    const proxyServer = "https://proxy-server-03vk.onrender.com/proxy?url=";

    win.document.write(`
<!DOCTYPE html>
<html>
<head>
<title>Takorou Browser</title>
<style>
body {margin:0; background:#0b0b0b; color:#fff; font-family:'Segoe UI', sans-serif;}
#toolbar {
    background: rgba(20,20,20,0.8);
    backdrop-filter: blur(6px);
    padding: 10px;
    display: flex; gap: 10px; align-items: center;
    box-shadow: 0 0 12px #000;
    position: sticky; top: 0; z-index: 9999;
}
.btn {
    background: linear-gradient(145deg, #222, #111);
    border: none; color: white; padding:6px 10px;
    border-radius: 8px; cursor:pointer; transition:0.15s; box-shadow: inset 0 0 5px #000;
}
.btn:hover {background:#333;}
#url {flex:1; background:#000; color:white; border:1px solid #333; padding:8px 10px; border-radius:10px; font-size:14px; box-shadow: inset 0 0 6px #000;}
iframe {width:100%; height:calc(100vh - 60px); border:none; background:#000;}
</style>
</head>
<body>
<div id="toolbar">
    <button class="btn" id="back">←</button>
    <button class="btn" id="forward">→</button>
    <button class="btn" id="reload">⟳</button>
    <button class="btn" id="home">⌂</button>
    <input id="url" type="text" placeholder="Enter URL…">
    <button class="btn" id="go">Go</button>
    <button class="btn" id="proxySwitch">Proxy: ON</button>
</div>
<iframe id="view"></iframe>
<script>
const view = document.getElementById("view");
const urlBar = document.getElementById("url");
const proxySwitch = document.getElementById("proxySwitch");
const proxyServer = "${proxyServer}";
let proxyMode = true;
const historyStack = [];
let historyIndex = -1;

function loadURL(url) {
    if (!url.startsWith("http")) url = "https://" + url;
    let targetURL = proxyMode ? proxyServer + encodeURIComponent(url) : url;
    view.src = targetURL;
    urlBar.value = url;

    historyStack.push(url);
    historyIndex = historyStack.length - 1;
}

document.getElementById("go").onclick = () => loadURL(urlBar.value);
urlBar.addEventListener("keydown", e => {if(e.key==="Enter") loadURL(urlBar.value);});
document.getElementById("back").onclick = () => {if(historyIndex>0){historyIndex--; view.src=proxyMode?proxyServer+encodeURIComponent(historyStack[historyIndex]):historyStack[historyIndex]; urlBar.value=historyStack[historyIndex];}};
document.getElementById("forward").onclick = () => {if(historyIndex<historyStack.length-1){historyIndex++; view.src=proxyMode?proxyServer+encodeURIComponent(historyStack[historyIndex]):historyStack[historyIndex]; urlBar.value=historyStack[historyIndex];}};
document.getElementById("reload").onclick = () => {view.src=view.src;};
document.getElementById("home").onclick = () => {loadURL("https://google.com");};

proxySwitch.onclick = () => {
    proxyMode = !proxyMode;
    proxySwitch.textContent = proxyMode ? "Proxy: ON" : "Proxy: OFF";
    if(urlBar.value) loadURL(urlBar.value);
};
<\/script>
</body>
</html>
    `);
}
