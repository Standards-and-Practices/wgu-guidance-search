<template>
    <div class="mb-5">
        <div class="filter-title">Approaches</div>
        <ul>
            <li v-for="approach in approaches" :key="approach.node.databaseId">
                <Checkbox @click="toggleApproachFilter(approach.node.databaseId)" :label="label(approach.node.name, approach.node.count)" />
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

            this.$store.dispatch('addApproachFilter', approachFilter)
    
        },
        label(name, count) {
            const filterCount = count ? count : '0';
            return `${name} (${filterCount})`
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