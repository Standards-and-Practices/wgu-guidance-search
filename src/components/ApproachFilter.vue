<template>
    <div class="mb-5">
        <div class="filter-title">Approachers</div>
        <ul>
            <li v-for="approach in approaches" :key="approach.id">
                <Checkbox @click="toggleApproachFilter(approach.id)" />
                {{approach.name}}
            </li>
        </ul>
    </div>
</template>

<script>
import api from "../api"
import { groupBy } from "lodash-es"
import Checkbox from "./atoms/Checkbox.vue"
export default {
    name: "ApproachFilter",
    computed: {
        approaches() {
            return this.$store.state.approaches;
        }
    },
    mounted() {
        console.log("Initalizing Approach Filter");
        this.getApproaches();
    },
    methods: {
        async getApproaches() {
            
            this.$store.dispatch('setApproaches', await api.getTaxonomy("approaches"));
            
        },
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