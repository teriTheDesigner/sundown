<template>
      <div v-if="displayPage">
<Nav></Nav>
    <Stepper/>
</div>
<h1 v-else>This page is protected</h1>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const displayPage = ref(false);

onMounted(()=>{
    const user = localStorage.getItem('validUser');
    displayPage.value = user && user !== 'undefined'
})

</script>