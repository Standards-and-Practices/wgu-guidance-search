<template>
	<div class="flex gap-2 flex-row justify-center my-4">

		<div class="flex-column" v-for="domain in domains" :key="domain.node.class" @click="toggle(domain.node.databaseId)">
			<img class="w-30 mx-auto mb-2" :src="isActive(domain.node.databaseId) ? domain.node.displaySettings.activeIcon.sourceUrl : domain.node.displaySettings.inactiveIcon.sourceUrl" />
			<p class="domain-name" :style="{ color: domain?.node?.displaySettings?.color }" >{{ domain.node.name }}</p>
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
		mounted() {
			if (localStorage.domains) {
				this.retrieve();
			} else {
				this.showAll();
			}
		},
		methods: {
			persist() {
				this.$forceUpdate();
				localStorage.domains = JSON.stringify(this.activeDomainFilters);
			},
			retrieve() {
				const activeDomainFilters = JSON.parse(localStorage.domains);
				activeDomainFilters.forEach(domain => this.show( domain) );
			},
			async toggle(databaseId) {
				this.isActive(databaseId) ? this.hide(databaseId) : this.show(databaseId)
			},
			show(databaseId) {
				this.$store.dispatch('addDomainFilter', databaseId)	
				this.persist()			
			},
			hide(databaseId) {
				this.$store.dispatch('removeDomainFilter', databaseId)
				this.persist()
			},
			showAll() {
				this.domains.forEach(domain => { this.show( domain.node.databaseId ) });
			},
			hideAll() {
				this.domains.forEach(domain => { this.hide( domain.node.databaseId ) });
			},
			isActive(databaseId) {
				return this.activeDomainFilters.includes(databaseId);
			},
		},
		computed: {
			domains() {
				return this.$store.state.domains;
			},
			activeDomainFilters() {
				return this.$store.state.filters.domainFilters
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