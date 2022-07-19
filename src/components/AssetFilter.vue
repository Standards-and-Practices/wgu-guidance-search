<template>
    <div class="mb-5">
        <div class="filter-title">Assets</div>
        <ul>
            <li v-for="asset in assets" :key="asset.node.databaseId" >
                <Checkbox 
                    @click="toggleAssetFilter(asset.node)" 
                    :modelValue="isActive(asset.node)"
                    :label="label(asset.node.name, asset.node.count)" 
                    v-if="asset.node.count"
                />
            </li>
        </ul>
    </div>
</template>

<script>
import Checkbox from "./atoms/Checkbox.vue"
export default {
    name: "AssetFilter",
    components: { Checkbox },
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
        label(name, count) {
            const filterCount = count ? count : '0';
            return `${name} (${filterCount})`
        },
        isActive(asset) {
            return this.assetFilters.includes(asset)
        }
    },
    computed: {
        assets() {
            return this.$store.state.assets;
        },
        assetFilters() {
            return this.$store.state.filters.assets;
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