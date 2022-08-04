<template>
	<div class="flex-column" v-if="ready">
		<label @click="showAll">
			<img class="w-30 mx-auto mb-2" :src="all" />
			<p class="filter-button">Show All</p>
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
		name: 'ShowAllButton',
		props: {
			ready: {
				type: Boolean,
				default: false,
			},
		},
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
