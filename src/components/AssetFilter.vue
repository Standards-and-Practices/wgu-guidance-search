<template>
    <div class="mb-5">
        <div class="filter-title">Assets</div>
        <ul>
            <li v-for="(asset, index) in assets" :key="asset.node.databaseId">

                <Checkbox @click="toggle(asset.node.databaseId)" :modelValue="isActive(asset.node.databaseId)" :label="asset.node.name" />
                <Toggle v-model="showChildren[index]" v-if="asset?.node?.children?.edges?.length" class="ml-1" />

                <ul class="block" v-if="showChildren[index]">
                    <li v-for="child in asset?.node?.children?.edges" :key="child.node.databaseId" class="block pl-6">
                        <Checkbox @click="toggle(child.node.databaseId)" :modelValue="isActive(child.node.databaseId)" :label="child.node.name" class="capitalize" />
                    </li>
                </ul>

            </li>

            <li @click="clearFilters" v-if="assetFilters.length" class="mt-5"><img :src="expandAll" alt="Show All" /></li>
        </ul>
    </div>
</template>

<script>
import Checkbox from "./atoms/Checkbox.vue"
import Toggle from "./atoms/Toggle.vue";
import expandAll from '../assets/expand-all.svg'
export default {
    name: "AssetFilter",
    components: { Checkbox, Toggle },
    data() {
        return {
            showChildren: [],
            expandAll,
        }
    },
    methods: {
        toggle(databaseId) {

            // Check if filter is active. If so, hide it. If not, show it.
            this.isActive(databaseId) ? this.hide(databaseId) : this.show(databaseId);

        },
        show(databaseId) {
            // Dispatch vuex action adding the filter to array of active asset filters.
            // console.log(`Showing ${filter}`, filter);
            this.$store.dispatch("addAssetFilter", String(databaseId));

        },
        hide(databaseId) {
            // Dispatch vuex action removing the filter from array of active asset filters.
            // console.log(`Hiding ${filter}`, filter);
            this.$store.dispatch("removeAssetFilter", String(databaseId));

        },
        isActive(databaseId) {
            // Return if given databaseId is in the array of active assets.
            return this.assetFilters.includes(String(databaseId))
        },
        clearFilters() {
            // Dispatch vuex action that clears all active asset filters.
            this.$store.dispatch('clearAssetFilters')

            // Clear array of child filters are open.
            this.showChildren = []
        }
    },
    computed: {
        assets() {
            // Return array of all assets.
            return this.$store.state.assets
        },
        assetFilters() {
            // Return array of all active asset filters.
            return this.$store.state.filters.assets
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