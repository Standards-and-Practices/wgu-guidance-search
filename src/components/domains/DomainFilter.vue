<template>
	<div class="flex gap-2 flex-row justify-center my-4">
		<!-- Loop the DomainFilterButtons -->
		<DomainFilterButton :ready="ready" :domain="domain" v-for="domain in domains" :key="domain.filter" @click="toggle(domain.databaseId)" />

		<!-- Show All Button -->
		<ShowAllButton />

		<!-- Hide All Button -->
		<HideAllButton />
	</div>
	
</template>

<script>
	import HideAllButton from './HideAllButton.vue';
	import ShowAllButton from './ShowAllButton.vue';
	import DomainFilterButton from './DomainFilterButton.vue';
	import icons from '../../assets/icons';
	export default {
		name: 'DomainFilter',
		components: { DomainFilterButton, ShowAllButton, HideAllButton },
		props: {
			ready: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				all: icons.all,
				none: icons.none,
			};
		},
		methods: {
			toggle(databaseId) {
				// Check if filter is active. If so, hide it. If not, show it.
				this.isActive(databaseId) ? this.hide(databaseId) : this.show(databaseId);
			},
			show(databaseId) {
				// Dispatch vuex action adding the filter to array of active domain filters.
				this.$store.dispatch('addFilter', { filterName: 'domains', databaseId: String(databaseId) });
			},
			hide(databaseId) {
				// Dispatch vuex action removing the filter from array of active domain filters.
				this.$store.dispatch('removeFilter', { filterName: 'domains', databaseId: String(databaseId) });
			},
			isActive(databaseId) {
				// Return if given databaseId is in the array of active domain filters.
				return this.activeDomains.includes(String(databaseId));
			},
			
		},
		computed: {
			domains() {
				// Return array of all domains
				return this.$store.state.domains;
			},
			activeDomains() {
				// Return array of all active domain filters
				return this.$store.state.filters.domains;
			},
		},
	};
</script>
<style scoped>
</style>
