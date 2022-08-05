<template>
	<div class="flex-column">
		<label @click="hideAll">
			<img class="w-30 mx-auto mb-2" :src="none" />
			<p class="filter-button">Hide All</p>
		</label>
	</div>
</template>

<script>
	import icons from '../../assets/icons';
	export default {
		name: 'HideAllButton',
		data() {
			return {
				none: icons.none,
			};
		},
		methods: {
			hideAll() {
				// Dispatch vuex action that hides all domains
				this.$store.dispatch('clearFilters', 'domains');
			},
		}
	};
</script>
<style scoped>
</style>