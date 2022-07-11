<template>
    <div class="mb-5">
        <div class="filter-title">Assets</div>
        <ul>
            <li v-for="asset in assets" :key="asset.id">
                <Checkbox @click="toggleAssetFilter(asset.id)" />
                {{asset.name}}
            </li>
        </ul>
    </div>
</template>

<script>
import api from "../api"
import { groupBy } from "lodash-es"
import Checkbox from "./atoms/Checkbox.vue"
export default {
    name: "AssetFilter",
    computed: {
        assets() {
            return this.$store.state.assets;
        }
    },
    mounted() {
        console.log("Initalizing Asset Filter");
        this.getAssets();
    },
    methods: {
        async getAssets() {
            
            this.$store.dispatch('setAssets', await api.getTaxonomy("assets"));
            
        },
        toggleAssetFilter(assetFilter) {

            this.$store.dispatch('addAssetFilters', assetFilter)
    
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