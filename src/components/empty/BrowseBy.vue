<template>
	<div class="search-help-header capitalize">Browse by {{ single }}</div>
	<div class="search-help-text" v-if="items.length">
		<a 
			v-for="item in items" 
			class="w-1/2" 
			@click="browse(item.databaseId)" 
			:title="item.name"
		>{{ item.name }}</a>
	</div>
</template>

<script>
export default {
	name: 'BrowseBy',
	props: {
		single: {
			type: String,
			required: false,
			default: "domain",
		},
		plural: {
			type: String,
			required: false,
			default: "domains",
		},
	},
	computed: {
		items() {
			return this.$store.state[this.plural];
		}
	},
	methods: {
		browse(databaseId) {

			this.clearAllFilters(this.plural);

			this.$store.dispatch(`addFilter`, {
				filterName: this.plural,
				databaseId: String(databaseId),
			});
		},
		clearAllFilters(filterName) {
			this.$store.dispatch('clearFilters', 'domains');
			this.$store.dispatch('clearFilters', 'assets');
			this.$store.dispatch('clearFilters', 'approaches');
			this.$store.dispatch('setSearch', '');

			if (filterName !== 'domains') {
				this.$store.dispatch('showAllDomains');
			}
		},
	}
};
</script>
