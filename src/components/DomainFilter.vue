<template>
	<div class="flex gap-2 flex-row justify-center my-4">

		<div class="flex-column" v-for="domain in domains" :key="domain.filter" @click="toggle(domain)">
			<img class="w-30 mx-auto mb-2" :src="isActive(domain.databaseId) ? domain.displaySettings.activeIcon.sourceUrl : domain.displaySettings.inactiveIcon.sourceUrl" />
			<p class="domain-name" :style="{ color: domain?.displaySettings?.color }" >{{ domain.name }}</p>
		</div>

		<div class="flex-column" >
			<label @click="showAll">
				<img class="w-30 mx-auto mb-2" :src="all" />
				<p class="domain-name">Show All</p>
			</label>
		</div>
		<div class="flex-column">
			<label @click="hideAll">
				<img class="w-30 mx-auto mb-2" :src="none" />
				<p class="domain-name">Hide All</p>
			</label>
		</div>

	</div>
</template>

<script>
	import icons from '../assets/icons';
	export default {
		name: 'DomainFilter',
		data() {
			return {
				all: icons.all,
				none: icons.none,
			};
		},
		methods: {
			toggle(filter) {
				this.isActive(filter.databaseId) ? this.hide(filter.databaseId) : this.show(filter.databaseId);
			},
			show(filter) {
				console.log(`Showing ${filter}`, filter)
				this.$store.dispatch('addDomainFilter', String(filter))	
			},
			hide(filter) {
				console.log(`Hiding ${filter}`, filter)
				this.$store.dispatch('removeDomainFilter', String(filter))
			},
			showAll() {
				this.domains.forEach(domain => { this.show( domain.databaseId ) });
			},
			hideAll() {
				this.domains.forEach(domain => { this.hide( domain.databaseId ) });
			},
			isActive(databaseId) {
				return this.domainFilters.includes(String(databaseId));
			},
		},
		computed: {
			domains() {
				return this.$store.state.domains
			},
			domainFilters() {
				return this.$store.state.filters.domains
			},
		}
	};
</script>

<style scoped>
.domain-name {
	@apply break-normal mx-auto uppercase text-center w-28;
	font-family: 'Open Sans';
	font-style: normal;
	font-weight: 700;
	font-size: 9px;
	line-height: 130%;
}
</style>