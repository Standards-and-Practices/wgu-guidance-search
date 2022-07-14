<template>
    <div class="p-2 w-full">{{example.text}}}</div>
</template>
<script>
export default {
    name: 'TextExample',
    props: {
        example: Object,
    }
}
</script>