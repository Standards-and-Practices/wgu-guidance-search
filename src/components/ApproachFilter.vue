<template>
    <div class="mb-5">
        <div class="filter-title">Approachers</div>
        <ul>
            <li v-for="approach in approaches" :key="approach.node.id">
                <Checkbox @click="toggleApproachFilter(approach.node.id)" />
                {{approach.node.name}}
            </li>
        </ul>
    </div>
</template>

<script>
import Checkbox from "./atoms/Checkbox.vue"
export default {
    name: "ApproachFilter",
    computed: {
        approaches() {
            return this.$store.state.approaches;
        }
    },
    methods: {

        toggleApproachFilter(approachFilter) {

            this.$store.dispatch('addApproachFilters', approachFilter)
    
        }
    },
    components: { Checkbox }
}
</script>``
<style scoped>
.filter-title {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #003057;
}
</style>