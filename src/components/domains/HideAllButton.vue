<template>
	<div class="flex-column" v-if="ready">
		<label @click="hideAll">
			<img class="w-30 mx-auto mb-2" :src="none" />
			<p class="filter-button">Hide All</p>
		</label>
	</div>
	<div v-if="!ready">
		<Skeletor width="31" height="31" circle class="w-30 mx-auto mb-2" />
		<Skeletor width="120" height="8" class="mb-2"/>
		<Skeletor width="120" height="8" class="mb-2"/>
	</div>
</template>

<script>
	import icons from '../../assets/icons';
	export default {
		name: 'HideAllButton',
		props: {
			ready: {
				type: Boolean,
				default: false,
			},
		},
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