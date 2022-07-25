<template>
    <Suspense>
        <template #default>
            <div class="mb-5">
                <div class="filter-title capitalize">{{ filterName }}</div>
                <ul>
                    <li v-for="(item, index) in items" :key="item.node.databaseId">

                        <Checkbox @click="toggle(item.node.databaseId)" :modelValue="isActive(item.node.databaseId)" :label="item.node.name" />
                        <Toggle v-model="showChildren[index]" v-if="item?.node?.children?.edges?.length" class="ml-1" />

                        <ul class="block" v-if="showChildren[index]">
                            <li v-for="child in item?.node?.children?.edges" :key="child.node.databaseId" class="block pl-6">
                                <Checkbox @click="toggle(child.node.databaseId)" :modelValue="isActive(child.node.databaseId)" :label="child.node.name" class="capitalize" />
                            </li>
                        </ul>

                    </li>

                    <li @click="clearFilters" v-if="activeItems.length" class="mt-5"><img :src="expandAll" alt="Show All" class="w-20" /></li>
                </ul>
            </div>
        </template>
        <template #fallback>
            <div>Loading taxonomy</div>
        </template>
    </Suspense>
</template>

<script>
import Checkbox from "./atoms/Checkbox.vue"
import Toggle from "./atoms/Toggle.vue";
import expandAll from '../assets/expand-all.svg'
export default {
    name: "Filter",
    components: { Checkbox, Toggle },
    props: {
        filterName: {
            type: String,
            required: true,
        },
        items: {
            type: Object,
        },
        activeItems: {
            type: Object,
        }
    },
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

            // Dispatch vuex action adding the filter to array of active item filters.
            // console.log(`Showing ${filter}`, filter);
            this.$store.dispatch(`addFilter`, {
                filterName: this.filterName,
                databaseId: String(databaseId)
            });

        },
        hide(databaseId) {

            // Dispatch vuex action removing the filter from array of active item filters.
            // console.log(`Hiding ${filter}`, filter);
            this.$store.dispatch(`removeFilter`, {
                filterName: this.filterName,
                databaseId: String(databaseId)
            });

        },
        isActive(databaseId) {

            // Return if given databaseId is in the array of active items.
            return this.activeItems.includes(String(databaseId))

        },
        clearFilters() {

            // Dispatch vuex action that clears all active item filters.
            this.$store.dispatch(`clearFilters`, {
                filterName: this.filterName
            });

            // Clear array of child filters are open.
            this.showChildren = []

        }
    }
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