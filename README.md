# §2.2：静的テスト強化による高品質化と効率化①

「リスト2.2, タイマー機能の実装例」で提示の機能実装を含むサンプルコードです。
機能実装部分は[manageToDoTimerData.js](./to-do-timer/src/utils/manageToDoTimerData.js)
の以下の部分などです。

```
ManageTimePeriod.prototype.getPassedSecondsAfterRestart = function () {
    var nowUnixTimeSec = Math.floor(Date.now() / 1000);
    var timeDifference = nowUnixTimeSec - this._lastReStartedAtSec;

    return timeDifference;
}
```

ESLintの導入に関する設定部分は[package.json](./to-do-timer/package.json)を参照ください。

本サンプルコードに対してローカルでコード検証ツール「ESLint」を実行するには、
以下のコマンドをフォルダー「[`to-do-timer`](./to-do-timer/)」直下で実行してください。

```
npm run lint
```

なお、本サンプルに対する実行結果は「リスト2.3, ESLintの適用結果」であり、「指摘事項がある状態」となります。


