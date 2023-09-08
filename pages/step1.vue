<script setup>
import { ref, onMounted } from 'vue'


const displayPage = ref(false);



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
        <input class="bg-gray-200" type="text">
    </label>
    <label>
        Mission Description
        <input class="bg-gray-200" type="text">
    </label>
 
    
</div>
<h1 v-else>This page is protected</h1>
</template>
