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
    .media-example {
        @apply mx-auto;
        max-height: 300px;
        max-width: 300px;
        background-size: contain;
        background-repeat: no-repeat;

    }
</style>