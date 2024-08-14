document.getElementById('save').addEventListener('click', () => {
  const meetUrl = document.getElementById('meet-url').value;

  console.log('Saving data:', { meetUrl }); // デバッグ用

  chrome.storage.sync.set({ meetUrl }, () => {
    alert('Settings saved');

    // 保存された内容を表示するためのコードを追加
    chrome.storage.sync.get(['meetUrl'], (data) => {
      console.log('Data retrieved:', data); // デバッグ用
      document.getElementById('status').innerText = `Saved Meet URL: ${data.meetUrl}`;
    });
  });
});

// ページが読み込まれた時に保存されたデータを表示する
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event triggered'); // デバッグ用
  chrome.storage.sync.get(['meetUrl'], (data) => {
    console.log('Initial data retrieved:', data); // デバッグ用
    if (data.meetUrl) {
      document.getElementById('meet-url').value = data.meetUrl || '';
      document.getElementById('status').innerText = `Current Saved Data: Meet URL: ${data.meetUrl}`;
    }
  });
});
