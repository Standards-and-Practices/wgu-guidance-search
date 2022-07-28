import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

// Vuex Persistence
const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
});

// Create a new store instance.
const store = createStore({
	plugins: [vuexLocal.plugin],
	state() {
		return {
			search: "",
			assets: [],
			approaches: [],
			domains: [],
			filters: {
				domains: [],
				assets: [],
				approaches: [],
			},
			standards: [],
		};
	},
	mutations: {
		setSearch(state, search) {
			state.search = search;
		},
		setAssets(state, assets) {
			state.assets = assets;
		},
		setApproaches(state, approaches) {
			state.approaches = approaches;
		},
		setDomains(state, domains) {
			state.domains = domains;
		},
		setStandards(state, standards) {
			state.standards = standards;
		},
		setAssetFilters(state, assetFilters) {
			state.filters.assets = assetFilters;
		},
		setApproachFilters(state, approachFilters) {
			state.filters.approaches = approachFilters;
		},
		setDomainFilters(state, domainFilters) {
			state.filters.domains = domainFilters;
		},
		addFilter(state, filter) {
			if (!state.filters[filter.filterName].includes(filter.databaseId)) {
				state.filters[filter.filterName].push(filter.databaseId);
			}
		},
		removeFilter(state, filter) {
			state.filters[filter.filterName] = state.filters[filter.filterName].filter((o) => {
				return o !== filter.databaseId;
			});
		},
		clearFilters(state, filter) {
			state.filters[filter] = [];
		},

		showAllDomains(state) {
			state.filters.domains = []
			state.domains.forEach((domain) => {
				state.filters.domains.push(String(domain.databaseId));
			});
		}
	},
	actions: {

		//////////////////////////////////////////////
		// MODEL SETTERS
		//////////////////////////////////////////////
		setSearch(context, search) {
			context.commit('setSearch', search);
		},
		setStandards(context, standards) {
			context.commit('setStandards', standards);
		},
		setAssets(context, filters) {
			context.commit('setAssets', filters);
		},
		setDomains(context, domains) {
			context.commit('setDomains', domains);
		},
		setApproaches(context, approaches) {
			context.commit('setApproaches', approaches);
		},

		//////////////////////////////////////////////
		// FILTER SETTERS
		//////////////////////////////////////////////
		setAssetFilters(context, assetFilters) {
			context.commit('setAssetFilters', assetFilters);
		},
		setApproachFilters(context, setApproachFilters) {
			context.commit('setApproachFilters', setApproachFilters);
		},
		setDomainFilters(context, domainFilters) {
			context.commit('setDomainFilters', domainFilters);
		},

		//////////////////////////////////////////////
		// FILTER OPERATIONS
		//////////////////////////////////////////////
		addFilter(context, filter) {
			context.commit('addFilter', filter);
		},
		removeFilter(context, filter) {
			context.commit('removeFilter', filter);
		},
		clearFilters(context, filter) {
			context.commit('clearFilters', filter);
		},

		showAllDomains(context) {
			context.commit('showAllDomains');
		}
	},
});

export default store;
