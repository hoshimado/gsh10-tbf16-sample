# §2.2：静的テスト強化による高品質化と効率化②

「リスト2.5, コード検証の適用を自動化するワークフロー」で提示の機能実装を含むサンプルコードです。
先のサンプルコード「
[chapter2section2-static-verification1-ng](https://github.com/hoshimado/gsh10-tbf16-sample/tree/chapter2section2-static-verification1-ng)
」で適用したコード検証での指摘事項は、修正済みのコードとなります。

本サンプルコードをリモートリポジトリへpushすると、
ワークフロー「
[node.js.yml](./.github/workflows/node.js.yml)
」で設定したコード検証「Lint」の適用が自動実行されます。
結果は、Actionsタブで参照可能です。

ローカルでコード検証ツール「ESLint」を実行するには、
以下のコマンドをフォルダー「[`to-do-timer`](./to-do-timer/)」直下で実行してください。

```
npm run lint
```


