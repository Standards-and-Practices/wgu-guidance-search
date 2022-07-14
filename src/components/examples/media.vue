<template>
    <div class="flex flex-row gap-5 py-5">
       
            <embed :src="example.file.sourceUrl" class="w-1/2 aspect-auto"/>

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