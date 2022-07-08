<template>

    <span class="inline pr-5">{{id}}</span>

</template>
<script>
export default {
    name: 'Principle',
    props: {
        id: String,
    },
    data() {
        return {
            principles: [],
        }
    },
    mounted() {

    },
    methods: {
        async getPrinciple(id) {
            this.principle = await actions.getPrinciple(id);
        }
    },
}
</script>