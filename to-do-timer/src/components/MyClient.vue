<script setup>
import TimerPanel from './TimerPanel.vue'
import { onMounted, ref } from 'vue';


const props = defineProps({
    manageToDoTimerData : {
        type: Object,
        required : true
    }
});
const isCreating1st = ref(true);
const isDataLoaded = ref(false);

onMounted(()=>{
    setTimeout(() => {
        if(props.manageToDoTimerData.isModeStandalone()){
            isCreating1st.value = false;
            isDataLoaded.value = true;
        }
        // スタンドアロン以外のモード(クラウドにデータを保持など）の場合は、
        // 以下にelse分で初期処理（ログインなど）を実装する
    }, 1000);
});
</script>



<template>
<div id="id-root"><!-- ラッパーは不要だが、Cssの都合でいったんこうする -->
    <div id="id_creating_contents" v-show="isCreating1st">
        loading page...
    </div>
    <div id="id_signup_section" v-if="isDataLoaded"><!-- ロード時に毎回初期化処理が走ってほしいので、showではなくifとする -->
        Hello World!
        <hr>
        <TimerPanel 
          v-bind:manageToDoTimerData="manageToDoTimerData"
        ></TimerPanel>
    </div>
</div>
</template>

<style scoped>
/* Cssファイルはここへ配置する。 */
#id-root {
    width: 100%;
}
#id_creating_contents{
    text-align: center;
}

</style>
