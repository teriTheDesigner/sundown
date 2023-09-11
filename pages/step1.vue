<script setup>
import { ref, onMounted } from 'vue'
import { useGlobalStore} from "../store/user"
const globalStore = useGlobalStore();

const displayPage = ref(false);


function changeReportName(e){
    globalStore.setReportName( e.target.value);
}

function changeReportDescription(e){
    globalStore.setReportDescription( e.target.value);
}

function changeReportDate(e) {
    globalStore.setReportDate( e.target.value);
}

onMounted(()=>{
    const user = localStorage.getItem('validUser');
    displayPage.value = user && user !== 'undefined'
})

</script>

<template>
    <div v-if="displayPage" >
    <Nav></Nav>
    <Stepper/>
    <div class=" pt-20 pb-20">
        <div class=" content-container mx-auto grid grid-cols-12 justify-center">
    <div class="col-start-1 col-end-6 flex flex-col gap-20">
        <label class="flex flex-col gap-4">
        Mission Name
        <input @input="changeReportName" class="border p-2 h-12 border-gray-600" type="text">
    </label>
    <label class="flex flex-col gap-4">
        Mission Description
        <textarea @input="changeReportDescription" class="border p-2  border-gray-600 h-32" type="text"></textarea>
    </label>
    </div>
       <div class="col-start-9 col-end-13 flex flex-col justify-between">   
    <label class="flex flex-col gap-4 ">
      Mission Date
      <input @input="changeReportDate" class="border p-2  border-gray-600 h-12" type="date">
    </label>
    <NuxtLink class=" rounded h-12 w-52 bg-slate-400 flex flex-col items-center justify-center"   to="/step2">NEXT STEP</NuxtLink></div>  

</div></div>
    
</div>
<h1 v-else>This page is protected</h1>
</template>
