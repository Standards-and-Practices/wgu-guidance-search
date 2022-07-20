<template>
	<div class="flex-column">
		<img class="w-30 mx-auto mb-2" :src="isActive(domain.databaseId) ? domain.displaySettings.activeIcon.sourceUrl : domain.displaySettings.inactiveIcon.sourceUrl" />
		<p class="domain-name" :style="{ color: domain?.displaySettings?.color }">{{ domain.name }}</p>
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
			console.log(`Showing ${filter}`, filter);
			this.$store.dispatch("addDomainFilter", String(filter));
		},
		hide(filter) {
			console.log(`Hiding ${filter}`, filter);
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
.domain-name {
	@apply break-normal mx-auto uppercase text-center w-28;
	font-family: "Open Sans";
	font-style: normal;
	font-weight: 700;
	font-size: 9px;
	line-height: 130%;
}
</style>

