# 「CIの何が嬉しいのか？をテストの観点から分かった気になる本」向けサンプルコード

本リポジトリでは、掲題の本に対するサンプルコードを提供しします。

掲題の本は下記で頒布中です。

* [技術書典オンラインマーケット内頒布ページ](https://techbookfest.org/product/tcSu6EC36Mu7ApuLpBvzRs)
<!--
* [BOOTH内頒布ページ](https://xingyanhuan.booth.pm/items/5266614)
* ↑追加したら、コメントアウトを外してURLを修正する
--> 

※リンク先はbranchです。1章にはサンプルコードはありません。

## サンプルコードの取得方法

clone後にそれぞれのブランチ切り替えるか、
下記のリンクでそれぞれのブランチに移動後にボタン「Code ＞ Download ZIP」からZipファイルとして取得し、任意のフォルダに展開してください。

何れの場合も、以下のリンク先で案内のあるコマンドの実行前に、フォルダー「`to-do-timer`」の直下で必要な依存モジュールをインストールするために、
次のコマンドを実行してください。

```
npm install
```


# 2章

* §2.1：ビルドの効率化
  * [chapter2section1-build-ok](https://github.com/hoshimado/gsh10-tbf16-sample/tree/chapter2section1-build-ok)
* §2.2：静的テスト強化による高品質化と効率化
  * Lint適用（指摘事項は未修正）: [chapter2section2-static-verification1-ng](https://github.com/hoshimado/gsh10-tbf16-sample/tree/chapter2section2-static-verification1-ng)
  * Lintでの指摘事項を修正済み、コード検証（Lint）の適用を自動化: [chapter2section2-static-verification2-ok](https://github.com/hoshimado/gsh10-tbf16-sample/tree/chapter2section2-static-verification2-ok)
* §2.3：動的テスト強化による高品質化と効率化
  * テストコードによる単体テストを追加：[chapter2section3-dynamic-testing1-fail](https://github.com/hoshimado/gsh10-tbf16-sample/tree/chapter2section3-dynamic-testing1-fail)
  * 単体テストの実行を自動化：[chapter2section3-dynamic-testing2-success](https://github.com/hoshimado/gsh10-tbf16-sample/tree/chapter2section3-dynamic-testing2-success)


