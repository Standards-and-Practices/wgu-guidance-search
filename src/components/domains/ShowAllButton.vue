<template>
	<div class="flex-column">
		<label @click="showAll">
			<img class="w-30 mx-auto mb-2" :src="all" />
			<p class="filter-button">Show All</p>
		</label>
	</div>
</template>

<script>
	import icons from '../../assets/icons';
	export default {
		name: 'ShowAllButton',
		data() {
			return {
				all: icons.all,
			};
		},
		methods: {
			showAll() {
				// Dispatch vuex action that shows all domains
				this.$store.dispatch('showAllDomains');
			},
		}
	};
</script>
<style scoped>
</style>
