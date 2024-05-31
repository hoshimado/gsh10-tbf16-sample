/**
 * [manageToDoTimerData.js]
 */

const ManageTimePeriod = function () {
    this._status = ManageTimePeriod.IS_STOP;
    this._lastReStartedAtSec = 0; // UnixTimeの起点に同等
    this._elapsedSecondsBeforeReStarted = 0;
    this._timerSeconds = 0;
};
ManageTimePeriod.IS_STOP = 0;
ManageTimePeriod.IS_RUNNING = 1;
ManageTimePeriod.IS_PAUSE = 2;

ManageTimePeriod.prototype.setTimerMaxSeconds = function (maxSeconds) {
    this._timerSeconds = maxSeconds;
    return this.getTimerMaxSeconds();
};
ManageTimePeriod.prototype.getTimerMaxSeconds = function () {
    return this._timerSeconds;
};
ManageTimePeriod.prototype.startNew = function () {
    this._lastReStartedAtSec = Math.floor(Date.now() / 1000); // sec単位
    // Date.now()は静的メソッドであることに注意。
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date#%E9%9D%99%E7%9A%84%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89

    this._elapsedSecondsBeforeReStarted = 0;
    this._status = ManageTimePeriod.IS_RUNNING;
    return true;
};
ManageTimePeriod.prototype.pause = function () {
    if(this._status == ManageTimePeriod.IS_RUNNING){
        this._status = ManageTimePeriod.IS_PAUSE;
        this._elapsedSecondsBeforeReStarted += this.getPassedSecondsAfterRestart();
        this._lastReStartedAtSec = Math.floor(Date.now() / 1000);    
        return true;
    }
    return false;
};
ManageTimePeriod.prototype.restart = function () {
    if(this._status == ManageTimePeriod.IS_PAUSE){
        this._status = ManageTimePeriod.IS_RUNNING;
        this._lastReStartedAtSec = Math.floor(Date.now() / 1000);    
        return true;
    }
    return false;
};
ManageTimePeriod.prototype.stop = function () {
    this._status = ManageTimePeriod.IS_STOP;
    this._elapsedSecondsBeforeReStarted += this.getPassedSecondsAfterRestart();
    this._lastReStartedAtSec = Math.floor(Date.now() / 1000);
    return true;
};
ManageTimePeriod.prototype.getStatus = function () {
    return this._status;
}

ManageTimePeriod.prototype.getPassedSecondsAfterRestart = function () {
    const nowUnixTimeSec = Math.floor(Date.now() / 1000);
    const timeDifference = nowUnixTimeSec - this._lastReStartedAtSec;

    return timeDifference;
}
ManageTimePeriod.prototype.getPassedSecondsAfterStartNew = function () {
    const lastPriodsAfterRestart = (this._status == ManageTimePeriod.IS_RUNNING)
        ? this.getPassedSecondsAfterRestart()
        : 0;
    const totalSec = this._elapsedSecondsBeforeReStarted + lastPriodsAfterRestart;
    return totalSec;
}





// ===========================================================================
const ManageToDoTimerData = function (window) {
    this._window = window;
    this._windowLocalStorage = window ? window.localStorage : null;

    this._pomodoroTimer = new ManageTimePeriod();
};


ManageToDoTimerData.prototype.isModeStandalone = function () {
    return true;
};

ManageToDoTimerData.prototype.getTimerData = function () {
    const timerApi = this._pomodoroTimer;
    const timerSecMax = timerApi.getTimerMaxSeconds();
    let remainSec = timerSecMax - timerApi.getPassedSecondsAfterStartNew();
    let statusText = "Unknonw";

    // タイムアップ、を掛けるのはあくまで「このメソッド」であって、Timer側ではない、事に注意。
    if(remainSec <= 0){
        timerApi.stop();
        remainSec = 0;
    }

    switch (timerApi.getStatus()) {
        case ManageTimePeriod.IS_RUNNING:
            statusText = 'Running';
            break;
    
        case ManageTimePeriod.IS_PAUSE:
            statusText = 'Pausing';
            break;

        case ManageTimePeriod.IS_STOP:
            statusText = (0==remainSec)
                ? 'Time-up'
                : 'Stoped';
            break;

        default:
            break;
    }

    return {
        remainSec: remainSec,
        totalSec :timerSecMax,
        titleText: 'ポモドーロタイマー', // ToDo: 可変にする
        statusText: statusText
    };
}
ManageToDoTimerData.prototype.setTimerData = function () {
    return this._pomodoroTimer;

    /**
     * {
     *  startNew : () => { this._pomodoroTimer.startNew() }
     * }
     * ToDo: 等のようにラップした方が安全かもしれない。
     */
}


export { ManageToDoTimerData as default };



