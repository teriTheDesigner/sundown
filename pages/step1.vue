<script setup>
import { ref, onMounted } from 'vue'
import { useGlobalStore} from "../store/user"
const globalStore = useGlobalStore();

const displayPage = ref(false);

const missionName = ref('');
const missionDescription = ref('');
const date = ref('');


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
        <input v-model="missionName" class="bg-gray-200" type="text">
    </label>
    <label>
        Mission Description
        <input v-model="missionDescription" class="bg-gray-200" type="text">
    </label>

 
    
</div>
<h1 v-else>This page is protected</h1>
</template>
