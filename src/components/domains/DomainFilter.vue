<template>
	<div class="flex gap-2 flex-row justify-center my-4">

		<!-- Loop the DomainFilterButtons -->
		<DomainFilterButton :domain="domain" v-for="domain in domains" :key="domain.filter" @click="toggle(domain)" />

		<!-- Show All Button -->
		<div class="flex-column">
			<label @click="showAll">
				<img class="w-30 mx-auto mb-2" :src="all" />
				<p class="domain-name">Show All</p>
			</label>
		</div>

		<!-- Hide All Button -->
		<div class="flex-column">
			<label @click="hideAll">
				<img class="w-30 mx-auto mb-2" :src="none" />
				<p class="domain-name">Hide All</p>
			</label>
		</div>

	</div>
</template>

<script>
import DomainFilterButton from "./DomainFilterButton.vue";
import icons from "../../assets/icons";
export default {
	name: "DomainFilter",
	components: { DomainFilterButton },
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
			// console.log(`Showing ${filter}`, filter);
			this.$store.dispatch("addDomainFilter", String(databaseId));
		},
		hide(databaseId) {
			// Dispatch vuex action removing the filter from array of active domain filters.
			// console.log(`Hiding ${filter}`, filter);
			
			this.$store.dispatch("removeDomainFilter", String(databaseId));
		},
		isActive(databaseId) {
			// Return if given databaseId is in the array of active domain filters.
			return this.domainFilters.includes(String(databaseId));
		},
		showAll() {
			// Loop through domains and show them.
			this.domains.forEach((domain) => {
				this.show(domain.databaseId);
			});
		},
		hideAll() {
			// Loop through domains and hide them.
			this.domains.forEach((domain) => {
				this.hide(domain.databaseId);
			});
		},
	},
	computed: {
		domains() {
			// Return array of all domains
			return this.$store.state.domains;
		},
		domainFilters() {
			// Return array of all active domain filters
			return this.$store.state.filters.domains;
		},
	},
};
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