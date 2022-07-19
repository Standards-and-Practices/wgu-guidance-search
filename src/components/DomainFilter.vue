<template>
	<div class="flex gap-2 flex-row justify-center my-4">

		<div class="flex-column" v-for="domain in domains" :key="domain.node.filter" @click="toggle(domain.node)">
			<img class="w-30 mx-auto mb-2" :src="isActive(domain.node) ? domain.node.displaySettings.activeIcon.sourceUrl : domain.node.displaySettings.inactiveIcon.sourceUrl" />
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
		mounted() {},
		methods: {
			async toggle(filter) {
				this.isActive(filter) ? this.hide(filter) : this.show(filter)
			},
			show(filter) {
				this.$store.dispatch('addDomainFilter', filter)				
			},
			hide(filter) {
				this.$store.dispatch('removeDomainFilter', filter)
			},
			showAll() {
				this.domains.forEach(domain => { this.show( domain.node ) });
			},
			hideAll() {
				this.domains.forEach(domain => { this.hide( domain.node ) });
			},
			isActive(filter) {
				return this.domainFilters.includes(filter);
			},
		},
		computed: {
			domains() {
				return this.$store.state.domains;
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