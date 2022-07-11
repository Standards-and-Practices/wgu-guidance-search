<template>
    <div class="mb-5">
        <div class="filter-title">Approaches</div>
        <ul>
            <li v-for="approach in approaches" :key="approach.id">
                <Checkbox />
                {{approach.name}}
            </li>
        </ul>
    </div>
</template>
<script>
import api from "../api"
import Checkbox from "./atoms/Checkbox.vue"
export default {
    name: "ApproachFilter",
    data() {
        return {
            approaches: []
        };
    },
    mounted() {
        console.log("initalizing approachFilter");
        this.getApproaches();
    },
    methods: {
        async getApproaches() {
            this.approaches = await api.getList("approaches", "", "100");
            console.log("Approaches", this.approaches);
        }
    },
    components: { Checkbox }
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