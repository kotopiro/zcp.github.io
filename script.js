// プロキシサーバURL
const proxyServer = 'https://proxy-server-03vk.onrender.com/proxy';

// iframe にプロキシ経由で表示
document.getElementById('fetch-btn').addEventListener('click', () => {
  const url = document.getElementById('target-url').value;
  if (!url) return alert('URLを入力してください');

  const proxyUrl = `${proxyServer}?url=${encodeURIComponent(url)}`;
  document.getElementById('result-frame').src = proxyUrl;
});

// フッターに連絡先を動的に追加
const footer = document.getElementById('footer');
const contactEmail = '連絡先: sample.com';
footer.innerHTML = `<p>${contactEmail}</p>`;
