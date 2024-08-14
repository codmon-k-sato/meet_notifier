# meet_notifier

## これはなに？
google chromeのextentionsでMD/ME合同日例が始まったら特定メンバーを呼ぶためのアプリです。

## 使い方
1. chromeのextentionsに追加する
- chrome://extensions/ にアクセス
- デベロッパーモードに切り替える
- パッケージ化されていない拡張機能を読み込むボタンを押して、このチェックアウトしたファイルディレクトリを選択する

2. meet notifierの設定をする
- アイコンをクリックする
- meetの会議コード(URLの一部)を入力し保存する

3. Google App Script側の設定をする
- [GAS](https://script.google.com/u/0/home/projects/1PEdAlvMZIxJoRji5u_bd9rR_SAoCNNRwzHw1R41ZjXZ2_lkqlmk2k24T/edit)
- slackのDM先にslacのwebhookリンクを設定する
- [slack app](https://api.slack.com/apps/A07GFACCYVC/incoming-webhooks?success=1)の設定はこちら。
　
