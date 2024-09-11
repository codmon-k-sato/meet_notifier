// GASのURL(ここでsalckのwebhookに送信している)
const gasUrl = 'https://script.google.com/macros/s/AKfycbz8qYDCGgqIYfCUBoTCogMVmj5o_ZHx8q67KnYmEXGRtuz5AoujpUqGc3dYXkMsMVPkAg/exec';

// タブが開かれた時の処理
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // タブが開かれたときにURLの情報が取得できている
  if (changeInfo.url) {
    chrome.storage.local.get([`processed_${tabId}`], (result) => {
      // まだ処理されていない場合のみ実行
      if (!result[`processed_${tabId}`]) {
        chrome.storage.sync.get(['meetUrls'], (data) => {
          // 複数のMeet URLに対応するために、各URLをチェックする
          if (data.meetUrls && data.meetUrls.length > 0) {
            const matched = data.meetUrls.some(meetUrl => {
              const urlPattern = new RegExp(`meet.google.com/(${meetUrl})`);
              return urlPattern.test(changeInfo.url);
            });

            // もしURLがMeetのものに一致した場合のみ実行する
            if (matched) {
              if (tabId) {
                chrome.scripting.executeScript({
                  target: { tabId: tabId },
                  files: ['content.js'] // DOMの操作やユーザー画面の操作を伴うのでcontent.jsを実行する
                }, () => {
                  if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                  } else {
                    // 処理済みフラグをセット
                    chrome.storage.local.set({ [`processed_${tabId}`]: true });
                  }
                });
              } else {
                console.error('Invalid tab ID');
              }
            }
          }
        });
      }
    });
  }
});

// タブが閉じられたときにフラグをクリアする
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.local.remove(`processed_${tabId}`);
});

// GASにメッセージを送信する
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sendSlackMessage') {
    fetch(gasUrl, {
      method: 'GET' // POSTだとCORSエラーになるのでGETで送信
    })
    .then(response => {
      if (response.ok) {
        console.log('Message sent successfully via GAS!');
      } else {
        console.error('Error sending message via GAS:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  }
});
