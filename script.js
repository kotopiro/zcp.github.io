document.getElementById('btn-about').addEventListener('click', () => {
  document.getElementById('content').innerHTML = `
    <h2>About ZCP Proxy</h2>
    <p>このサイトはプロキシ管理のダッシュボード風UIです。</p>
    <p>実際のプロキシは別サーバで動作します。</p>
  `;
});

document.getElementById('btn-contact').addEventListener('click', () => {
  document.getElementById('content').innerHTML = `
    <h2>Contact</h2>
    <p>管理者メール: admin@example.com</p>
  `;
});
