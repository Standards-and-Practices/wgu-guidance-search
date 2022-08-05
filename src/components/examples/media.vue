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

<style>
    .media-example img{
        @apply mx-auto w-1/2 aspect-auto;
        max-height: 300px;
    }
</style>