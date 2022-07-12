<template>



</template>
<script>
import api from '../api';
export default {
    name: 'Principle',
    props: {
        principle: Object,
    },
}
</script>

<style scoped>
.principle-name {
    @apply uppercase font-bold text-center text-xs;
    font-size: 8px;
    line-height: 11px;
}
</style>