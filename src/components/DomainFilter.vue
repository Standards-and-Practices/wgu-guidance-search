<template>
	<div class="flex flex-row justify-center" v-if="domains">

		<div class="flex-column" v-for="(domain, index) in domains" :key="domain.class" @click="toggle(index)">
			<img class="w-30 mx-auto" :src="domain.selected? domain.icon: domain.iconGray" />
			<p class="domain-name">{{ domain.name }}</p>
		</div>

		<div class="flex-column" v-if="countSelected < domains.length">
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
	export default {
		name: 'DomainButtons',
		data() {
			return {
				url: '',
				all: icons.all,
				none: icons.none,
				domains: [
					{
						selected: true,
						name: 'Diversity, Equity, & Inclusion',
						class: 'dei',
						icon: icons.diversityEquityInclusion,
						iconGray: icons.diversityEquityInclusionInactive,
					},
					{
						selected: true,
						name: 'Accessibility',
						class: 'accessibility',
						icon: icons.accessibility,
						iconGray: icons.accessibilityInactive,
					},
					{
						selected: true,
						name: 'Social & Emotional Learning',
						class: 'sel',
						icon: icons.socialEmotionalLearning,
						iconGray: icons.socialEmotionalLearningInactive,
					},
					{
						selected: true,
						name: 'Instructional Design',
						class: 'id',
						icon: icons.InstructionalDesign,
						iconGray: icons.InstructionalDesignInactive,
					},
					{
						selected: true,
						name: 'Assessment',
						class: 'ad',
						icon: icons.assessment,
						iconGray: icons.assessmentInactive,
					},
					{
						selected: true,
						name: 'Visual Design',
						class: 'vd',
						icon: icons.visualDesign,
						iconGray: icons.visualDesignInactive,
					},
					{
						selected: true,
						name: 'Prototyping',
						class: 'prototyping',
						icon: icons.prototyping,
						iconGray: icons.prototypingInactive,
					},
					{
						selected: true,
						name: 'Product Design',
						class: 'pd',
						icon: icons.productDesign,
						iconGray:  icons.productDesignInactive,
					},
					{
						selected: true,
						name: 'Instructional Technology',
						class: 'it',
						icon: icons.instructionalTech,
						iconGray: icons.instructionalTechInactive,
					},
				],
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
			countSelected() {
				return this.domains.filter((domain) => domain.selected).length;
			},
		},
	};
</script>

<style>
.domain-name {
	@apply break-normal mx-auto uppercase;
}
</style>