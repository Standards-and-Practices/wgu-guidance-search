<template>
	<div class="flex gap-4 flex-row justify-center my-4" v-if="!loading">

		<div class="flex-column" v-for="(domain, index) in domains?.edges" :key="domain.node.class" @click="toggle(index)">
			<img class="w-30 mx-auto" :src="domain.node.selected? domain.node.displaySettings.icon: domain.node.displaySettings.iconGray" />
			<p class="domain-name">{{ domain.node.name }}</p>
		</div>

		<div class="flex-column" v-if="countSelected < domains?.edges">
			<label @click="showAll">
				<img class="w-30 mx-auto" :src="all" />
				<p class="domain-name">Show All</p>
			</label>
		</div>
		<div class="flex-column" v-if="countSelected > 0">
			<label @click="hideAll">
				<img class="w-30 mx-auto" :src="none" />
				<p class="domain-name">Hide All</p>
			</label>
		</div>

	</div>
</template>

<script>
	import icons from '../assets/icons';
	import queries from '../queries.js';
	export default {
		name: 'DomainFilter',
		apollo: {
			domains: queries.getDomains,
		},
		data() {
			return {
				url: '',
				all: icons.all,
				none: icons.none,
				loading: false,
			};
		},
		mounted() {
			if (localStorage.domains) {
				this.retrieve();
			}
			this.url = window.location.href;
		},
		methods: {
			persist() {
				this.$forceUpdate();
				localStorage.domains = JSON.stringify(this.domains);
				console.log('persist');
			},
			retrieve() {
				this.domains = JSON.parse(localStorage.domains);
			},
			async toggle(index) {
				this.domains[index].selected = !this.domains[index].selected;
				this.persist();
			},
			show(index) {
				this.domains[index].selected = true;
				this.persist();
			},
			hide(index) {
				this.domains[index].selected = false;
				this.persist();
			},
			showAll() {
				this.domains.forEach((domain) => {
					domain.selected = true;
				});
				this.persist();
			},
			hideAll() {
				this.domains.forEach((domain) => {
					domain.selected = false;
				});
				this.persist();
			},
			rightIcon(domain) {
				return domain.selected ? domain.icon : domain.iconGray;
			},
		},
		computed: {
			// countSelected() {
			// 	return this.domains.edges.filter((domain) => domain.selected).length;
			// },
		},
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