<template>

    <span class="inline pr-5 principle-name">{{principle.name}}</span>

</template>
<script>
import api from '../api';
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
            this.principle = await api.getSingle('principles',id);
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