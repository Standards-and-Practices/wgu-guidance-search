<template>
    <div class="mb-5">
        <div class="filter-title">Assets</div>
        <ul>
            <li v-for="asset in assets" :key="asset.node.databaseId">
                <Checkbox @click="toggleAssetFilter(asset.node.databaseId)" :label="label(asset.node.name, asset.node.count)" />
            </li>
        </ul>
    </div>
</template>

<script>
import Checkbox from "./atoms/Checkbox.vue"
export default {
    name: "AssetFilter",
    computed: {
        assets() {
            return this.$store.state.assets;
        },
        currentAssetFilters() {
            return this.$store.state.filters.assetsFilters ? this.$store.state.filters.assetsFilters : [];
        }
    },
    methods: {
        toggleAssetFilter(assetFilter) {
            console.log("Includes: ", this.currentAssetFilters.includes(assetFilter));

            if (!this.currentAssetFilters.includes(assetFilter)) {
                this.$store.dispatch('removeAssetFilter', assetFilter)
                console.log('Remove' ,assetFilter);
            } else {
                this.$store.dispatch('addAssetFilter', assetFilter)
                console.log('Add', assetFilter)
            }

        },
        label(name, count) {
            const filterCount = count ? count : '0';
            return `${name} (${filterCount})`
        }
    },
    components: { Checkbox },
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