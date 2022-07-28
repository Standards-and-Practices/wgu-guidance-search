<template>
	<div class="flex-column">
		<img class="w-30 mx-auto mb-2" :src="isActive(domain.databaseId) ? domain.displaySettings.activeIcon.sourceUrl : domain.displaySettings.inactiveIcon.sourceUrl" />
		<p class="filter-button" :style="{ color: domain?.displaySettings?.color }">{{ domain.name }}</p>
	</div>
</template>

<script>
export default {
	name: "DomainFilterButton",
	props: {
		domain: {
			required: true,
		}
	},
	methods: {
		toggle(filter) {
			this.isActive(filter.databaseId)
				? this.hide(filter.databaseId)
				: this.show(filter.databaseId);
		},
		show(filter) {
			this.$store.dispatch("addDomainFilter", String(filter));
		},
		hide(filter) {
			this.$store.dispatch("removeDomainFilter", String(filter));
		},
		isActive(databaseId) {
			return this.domainFilters.includes(String(databaseId));
		},
	},
	computed: {
		domains() {
			return this.$store.state.domains;
		},
		domainFilters() {
			return this.$store.state.filters.domains;
		},
	},
}
</script>
<style scoped>
</style>