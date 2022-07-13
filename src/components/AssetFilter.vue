<template>
    <div class="mb-5">
        <div class="filter-title">Assets</div>
        <ul>
            <li v-for="asset in assets" :key="asset.id">
                <Checkbox @click="toggleAssetFilter(asset.id)" />
                {{ asset.name }}
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
        }
    },
    methods: {
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