const proxyServer = 'https://proxy-server-03vk.onrender.com/proxy';

// フッターに連絡先を表示
document.getElementById('footer').innerHTML = `<p>連絡先: sample.com</p>`;

document.getElementById('fetch-btn').addEventListener('click', async () => {
  const url = document.getElementById('target-url').value;
  if (!url) return alert('URLを入力してください');

  const proxyUrl = `${proxyServer}?url=${encodeURIComponent(url)}`;

  const resultDiv = document.getElementById('result-div');
  resultDiv.innerHTML = `<p>読み込み中…</p>`; // 読み込み表示

  try {
    const res = await fetch(proxyUrl);
    const html = await res.text();
    resultDiv.innerHTML = html; // HTMLを挿入
  } catch (e) {
    resultDiv.innerHTML = `<p>取得できませんでした</p>`;
    console.error(e);
  }
});
