const proxyServer = 'https://proxy-server-03vk.onrender.com/proxy';

const statusDiv = document.getElementById('status');
const resultDiv = document.getElementById('result-div');

document.getElementById('fetch-btn').addEventListener('click', async () => {
  const url = document.getElementById('target-url').value.trim();
  if (!url) return alert('URLを入力してください');

  statusDiv.textContent = '読み込み中…';
  resultDiv.innerHTML = ''; // 前回の結果をクリア

  try {
    const res = await fetch(`${proxyServer}?url=${encodeURIComponent(url)}`);
    if (!res.ok) throw new Error('取得失敗');

    const html = await res.text();

    // 軽量化: scriptタグは削除して表示
    const cleanHtml = html.replace(/<script[\s\S]*?<\/script>/gi, '');
    resultDiv.innerHTML = cleanHtml;

    statusDiv.textContent = '読み込み完了';
  } catch (e) {
    console.error(e);
    resultDiv.innerHTML = '<p>アクセスできませんでした</p>';
    statusDiv.textContent = 'エラー発生';
  }
});
