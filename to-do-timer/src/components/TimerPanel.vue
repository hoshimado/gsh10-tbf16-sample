<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    manageToDoTimerData : {
        type: Object,
        required : true
    }
});
const remainSecText = ref(0);
const totalSecText = ref(0);
const titleText = ref('');
const statusText = ref('');
function _secondsToMMSS(seconds) { // ToDo: utilsフォルダー配下に移動すべき？
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}
const updateValue = function () {
    const data = props.manageToDoTimerData.getTimerData();
    remainSecText.value = _secondsToMMSS(data.remainSec);
    totalSecText.value = _secondsToMMSS(data.totalSec);
    titleText.value = data.titleText;
    statusText.value = data.statusText;

    // ToDo: タイムアップ・トリガーが為されたら、音を鳴らした。。
    // https://zenn.dev/r9uk0/articles/aabba05e827c53

    setTimeout(() => {
        updateValue();
    }, 1000);
}

onMounted(()=>{
    props.manageToDoTimerData.setTimerData().setTimerMaxSeconds(25*60);
    pomodoroTimerStartNew();

    setTimeout(() => {
        updateValue();
    }, 1);
});

const pomodoroTimerStartNew = function () {
    props.manageToDoTimerData.setTimerData().startNew();
}
const pomodoroTimerStop = function () {
    props.manageToDoTimerData.setTimerData().stop();
}
</script>



<template><div id="id_timerpanel">
    <div>
        {{ titleText }} ：
    </div>
    <div>
        {{ remainSecText }} of {{ totalSecText }} 分（MM:SS）
    </div>
    <div>
        {{ statusText }}.
    </div>
    <br>
    <div class="timer-button-container">
        <div class="timer-button-group">
            <div>
                <button type="button" class="btn btn-primary" v-on:click="pomodoroTimerStartNew">開始</button>
            </div>
        </div>
        <div class="timer-button-group">
            <div>
                <button type="button" class="btn btn-primary" v-on:click="pomodoroTimerStop">終了</button>
            </div>
        </div>
    </div>
    <div>■■◇ (Working-Icon is currently in production.)</div>
</div></template>

<style scoped>
/* Cssファイルはここへ配置する。 */
#id_timerpanel {
    margin: 8px;
}

.timer-button-container {
    display: flex;
    justify-content: flex-start; /* 左添え */
    /* justify-content: space-between */ /* 最初と終わりを左右に、残りは均等に */
    align-items: center;
}
.timer-button-group {
    display: flex;
    /* gap: 10px; */ /* グループ内のボタン間の間隔 */
}
.timer-button-group div {
    margin: 4px;
}

</style>
