<template>
    <div class="mb-5">
        <div class="filter-title">Assets</div>
        <ul>
            <li v-for="(asset, index) in assets" :key="asset.node.databaseId">

                <Checkbox @click="toggleAssetFilter(asset.node)" :modelValue="isActive(asset.node)" :label="asset.node.name" /> 
                <Toggle v-model="showChildren[index]" v-if="asset?.node?.children?.edges?.length" class="ml-1"/>

                <ul class="block" v-if="showChildren[index]" >
                    <li v-for="child in asset?.node?.children?.edges" class="block pl-6">
                        <Checkbox @click="toggleAssetFilter(child.node)" :modelValue="isActive(child.node)" :label="child.node.name" class="capitalize"/>
                    </li>
                </ul>

            </li>
            
            <li @click="showAll" v-if="assetFilters.length" class="mt-5"><img :src="expandAll" alt="Show All" /></li>
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
        toggleAssetFilter(assetFilter) {

            if (this.assetFilters.includes(assetFilter)) {

                this.$store.dispatch('removeAssetFilter', assetFilter)
                console.log('Remove', assetFilter);

            } else {

                this.$store.dispatch('addAssetFilter', assetFilter)
                console.log('Add', assetFilter)

            }

        },
        isActive(asset) {
            return this.assetFilters.includes(asset)
        },
        showAll() {
            this.$store.dispatch('clearAssetFilters')
            this.showChildren = []
        }
    },
    computed: {
        assets() {
            return this.$store.state.assets
        },
        assetFilters() {
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