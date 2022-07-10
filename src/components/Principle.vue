<template>

    <span class="inline pr-5 principle-name">{{principle.name}}</span>

</template>
<script>
import {actions} from '../api';
export default {
    name: 'Principle',
    props: {
        id: Number,
    },
    data() {
        return {
            principle: {},
        }
    },
    mounted() {
        this.getPrinciple(this.id);
    },
    methods: {
        async getPrinciple(id) {
            this.principle = await actions.getPrinciple(id);
        }
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