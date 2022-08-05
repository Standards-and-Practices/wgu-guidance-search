<template>
    <div class="flex flex-row gap-5 py-5">
        <embed :src="example.file.sourceUrl" class="media-example" />
    </div>
</template>
<script>
export default {
    name: 'MediaExample',
    props: {
        example: Object,
    }
}
</script>

<style scoped>
    .media-example {
        @apply !mx-auto !bg-contain !bg-no-repeat !max-w-xs !max-h-80;
    }
</style>