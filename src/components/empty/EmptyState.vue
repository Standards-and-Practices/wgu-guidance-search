<template>
	<div>
		<div class="pt-4 pb-2 sorry">Sorry, we couldn’t find a match for “{{ search }}”</div>

		<div class="pt-4 pb-2 did-you-mean hidden">
			Did you mean “<span class="text-accent-blue">{{ search }}</span
			>”
		</div>
		<SearchHelp />
		<BrowseBy single="domain" plural="domains" />
		<BrowseBy single="asset" plural="assets" />
		<BrowseBy single="approach" plural="approaches" />
	</div>
</template>
<script>

	import icons from '../../assets/icons';
	import SearchHelp from './SearchHelp.vue';
	import BrowseBy from './BrowseBy.vue';

	export default {
		name: 'EmptyState',
		components: { BrowseBy, SearchHelp },
		data() {
			return {
				contact: icons.contact,
			};
		},
		computed: {
			search() {
				return this.$store.state.search;
			},
		},
	};
</script>
<style lang="css">
	.sorry {
		font-family: 'Open Sans';
		font-style: normal;
		font-weight: 700;
		font-size: 24px;
		line-height: 33px;
		color: #000000;
	}

	.did-you-mean {
		font-family: 'Open Sans';
		font-style: italic;
		font-weight: 400;
		font-size: 24px;
		line-height: 33px;
		display: flex;
		align-items: center;
		color: #000000;
	}

	.search-help-header {
		@apply pt-10 pb-2;
		font-family: 'Open Sans';
		font-style: normal;
		font-weight: 700;
		font-size: 16px;
		line-height: 22px;
		display: flex;
		align-items: center;
		color: #63666a;
	}

	.search-help-text {
		@apply w-full flex flex-wrap;
	}

	.search-help-text a {
		font-family: 'Open Sans';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
		display: flex;
		align-items: center;
		letter-spacing: 0.5px;
		text-decoration-line: underline;
		color: #327da9;
		cursor: default;
	}
</style>
