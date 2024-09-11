document.getElementById('save').addEventListener('click', () => {
  const meetUrlInput = document.getElementById('meet-url').value;

  // カンマで区切られたURLリストを作成（空白を削除してリスト化）
  const meetUrls = meetUrlInput.split(',').map(url => url.trim()).filter(url => url.length > 0);

  console.log('Saving data:', { meetUrls }); // デバッグ用

  chrome.storage.sync.set({ meetUrls }, () => {
    alert('Settings saved');

    // 保存された内容を表示するためのコードを追加
    chrome.storage.sync.get(['meetUrls'], (data) => {
      console.log('Data retrieved:', data); // デバッグ用
      document.getElementById('status').innerText = `Saved Meet URL: ${data.meetUrls.join(', ')}`;
    });
  });
});

// ページが読み込まれた時に保存されたデータを表示する
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event triggered'); // デバッグ用
  chrome.storage.sync.get(['meetUrls'], (data) => {
    console.log('Initial data retrieved:', data); // デバッグ用
    if (data.meetUrls && data.meetUrls.length > 0) {
      document.getElementById('meet-url').value = data.meetUrls.join(', ');
      document.getElementById('status').innerText = `Current Saved Data: Meet URL: ${data.meetUrls.join(', ')}`;
    }
  });
});
