
<template>
	<div class="sample-card">
		<h2>Sample Card</h2>
		<audio :src="props.url" controls></audio>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

export interface Props {
    url: string
}

const props = defineProps<Props>()

onMounted(() => {
    
})
</script>