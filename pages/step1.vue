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

onMounted(()=>{
    const user = localStorage.getItem('validUser');
    displayPage.value = user && user !== 'undefined'
})

</script>

<template>
    <div v-if="displayPage">
    <Nav></Nav>
    <Stepper/>
    <label>
        Mission Name
        <input @input="changeReportName" class="bg-gray-200" type="text">
    </label>
    <label>
        Mission Description
        <input @input="changeReportDescription" class="bg-gray-200" type="text">
    </label>

 
    
</div>
<h1 v-else>This page is protected</h1>
</template>
