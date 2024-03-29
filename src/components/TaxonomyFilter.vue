<template>
    <div class="mb-5">
        <div class="filter-title capitalize">{{ filterName }}</div>
        <ul>
            <li v-for="item in 7" v-if="!ready">
                <Skeletor width="16" class="mr-4" />
                <Skeletor width="120" />
            </li>
            <li v-for="(item, index) in items" :key="item.node.databaseId" v-if="ready">
                <Checkbox @click="toggleChildren(item.node)" :modelValue="isActive(item.node.databaseId)" :isSemiChecked="isSemiChecked(item.node)" :label="item.node.name" />
                <Toggle v-model="showChildren[index]" v-if="item?.node?.children?.edges?.length" class="ml-1" />

                <ul class="block" v-if="showChildren[index]">
                    <li v-for="child in item?.node?.children?.edges" :key="child.node.databaseId" class="block pl-6">
                        <Checkbox @click="toggle(child.node.databaseId)" :modelValue="isActive(child.node.databaseId)" :label="child.node.name" class="capitalize" />
                    </li>
                </ul>

            </li>

            <li @click="clearFilters" v-if="activeItems.length" class="mt-5">
                <img :src="expandAll" alt="Show All" class="w-20" />
            </li>
        </ul>
    </div>
</template>

<script>
import Checkbox from "./atoms/Checkbox.vue"
import Toggle from "./atoms/Toggle.vue";
import expandAll from '../assets/expand-all.svg'

export default {
    name: "TaxonomyFilter",
    components: { Checkbox, Toggle },
    props: {
        ready: {
            type: Boolean,
            default: false,
        },
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
        };
    },
    methods: {
        toggle(databaseId) {

            // Check if filter is active. If so, hide it. If not, show it.
            this.isActive(databaseId) ? this.hide(databaseId) : this.show(databaseId);

        },
        toggleChildren(taxonomy) {
            // console.log(taxonomy);

            if (this.isActive(taxonomy.databaseId)) {
                this.hide(taxonomy.databaseId);
                taxonomy.children.edges.forEach(child => this.hide(child.node.databaseId));
            } else {
                this.show(taxonomy.databaseId);
                taxonomy.children.edges.forEach(child => this.show(child.node.databaseId));
            }

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
            this.$store.dispatch(`clearFilters`, this.filterName);

            // Clear array of child filters are open.
            this.showChildren = []

        },
        isSemiChecked(item) {
            // console.log('Checking children', item)
            let childrenChecked = 0;

            item.children.edges.forEach(child => {
                // console.log('Child', this.isActive(child.node.databaseId))
                this.isActive(child.node.databaseId) ? childrenChecked++ : childrenChecked = childrenChecked;
            });

            // console.log('Total Item Children Count',  item.children.edges.length)
            // console.log('Number of Children Selected', childrenChecked)
            return Boolean((item.children.edges.length !== childrenChecked) && (childrenChecked !== 0));
        }
    },
    computed: {
        loading() {
            return this?.$apollo?.queries[this?.filterName]?.loading || false;
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