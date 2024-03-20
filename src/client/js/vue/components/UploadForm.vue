<template>
	<div class="upload-form" ref="uploadForm">
        <div class="upload__form-wrap" v-if="!fileSelected">
            <form class="upload__form">
                <h3>1. Select File</h3>
                <label class="input-wrap">
                    <input id="files" type="file" multiple />
                </label>
                <h3>2. Name Asset</h3>
                <label class="input-wrap">
                    <input id="name" type="text" placeholder="" />
                    <span>Asset Name</span>
                </label>
                <button>Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

export interface Props {
    // url: string
}

// const props = defineProps<Props>()
const uploadForm = ref<HTMLElement>()

onMounted(() => {
    const form = uploadForm.value?.querySelector(
        '.upload__form'
    ) as HTMLFormElement

    form.addEventListener('submit', (e) => {
		e.preventDefault()
        const name: HTMLInputElement = document.getElementById(
            'name'
        ) as HTMLInputElement
        const filesEl: HTMLInputElement = document.getElementById(
            'files'
        ) as HTMLInputElement

        const files: FileList = filesEl.files as FileList

        const formData = new FormData()
        formData.append('name', name.value)
        formData.append('file', files[0])

        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
			.then((res) => res.json())
			.then((json) => {
				console.log(json)
			})
            .catch((err) => console.log('Error occured', err))
    })
})
</script>

<style scoped>

</style>