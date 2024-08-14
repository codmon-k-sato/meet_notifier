chrome.storage.sync.get((data) => {
  const sendMessage = confirm(`slackメッセージを送信してよいですか？`);

  if (sendMessage) {
    // Background scriptにメッセージ送信要求を渡す
    chrome.runtime.sendMessage({
      action: 'sendSlackMessage'
    });
  } else {
    alert('キャンセルしました');
  }
});
