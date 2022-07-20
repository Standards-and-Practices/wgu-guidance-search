<template>
    <div class="mb-5">
        <div class="filter-title">Approaches</div>
        <ul>
            <li v-for="(approach, index) in approaches" :key="approach.node.databaseId">

                <Checkbox @click="toggleApproachFilter(approach.node)" :modelValue="isActive(approach.node)" :label="approach.node.name" /> 
                <Toggle v-model="showChildren[index]" v-if="approach?.node?.children?.edges?.length" class="ml-1"/>

                <ul class="block" v-if="showChildren[index]" >
                    <li v-for="child in approach?.node?.children?.edges" class="block pl-6">
                        <Checkbox @click="toggleApproachFilter(child.node)" :modelValue="isActive(child.node)" :label="child.node.name" class="capitalize"/>
                    </li>
                </ul>

            </li>
            <li @click="showAll" v-if="approachFilters.length">Show All</li>
        </ul>
    </div>
</template>

<script>
import Checkbox from "./atoms/Checkbox.vue"
import Toggle from "./atoms/Toggle.vue";
export default {
    name: "ApproachFilter",
    components: { Checkbox, Toggle },
    data() {
        return {
            showChildren: [],
        }
    },
    methods: {
        toggleApproachFilter(approachFilter) {

            if (this.approachFilters.includes(approachFilter)) {

                this.$store.dispatch('removeApproachFilter', approachFilter)
                console.log('Remove', approachFilter);

            } else {

                this.$store.dispatch('addApproachFilter', approachFilter)
                console.log('Add', approachFilter)

            }

        },
        isActive(approach) {
            return this.approachFilters.includes(approach)
        },
        showAll() {
            this.$store.dispatch('clearApproachFilters')
            this.showChildren = []
        }
    },
    computed: {
        approaches() {
            return this.$store.state.approaches
        },
        approachFilters() {
            return this.$store.state.filters.approaches
        }
    },
}
</script>
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