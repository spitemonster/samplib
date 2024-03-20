<template>
    <div id="samplib" class="container" ref="samplib">
        <h1>Sup</h1>
		<SampleCard :url="'/audio/test-sample.wav'"></SampleCard>
		<UploadForm></UploadForm>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
onMounted(() => {
    
})
</script>
