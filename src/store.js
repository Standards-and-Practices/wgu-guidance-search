import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

// Vuex Persistence
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

// Create a new store instance.
const store = createStore({
    plugins: [vuexLocal.plugin],
    state () {
      return {
        assets: [],
        approaches: [],
        domains: [],
        filters: {
            domains: [],
            assets: [],
            approaches: [],
        },
        standards: [], 
      }
    },
    mutations: {
      setAssets (state, assets) {
        state.assets = assets;
      },
      setApproaches (state, approaches) {
        state.approaches = approaches;
      },
      setDomains (state, domains) {
        state.domains = domains;
      },
      setStandards (state, standards) {
        state.standards = standards;
      },
      
      setAssetFilters (state, assetFilters) {
        state.filters.assets = assetFilters;
      },
      setApproachFilters (state, approachFilters) {
        state.filters.approaches = approachFilters;
      },
      setDomainFilters (state, domainFilters) {
        state.filters.domains = domainFilters;
      },

      addFilter (state, filter) {
        if(!state.filters[filter.filterName].includes(filter.databaseId)) {
          state.filters[filter.filterName].push(filter.databaseId);
        }
      },
      addDomainFilter (state, filter) {
        if(!state.filters.domains.includes(filter)) {
          state.filters.domains.push(filter);
        }
      },

      removeFilter (state, filter) {
        state.filters[filter.filterName] = state.filters[filter.filterName].filter(o => { return o !== filter.databaseId });
      },
      removeAssetFilter (state, filter) {
        state.filters.assets = state.filters.assets.filter(o => { return o !== filter });
      },
      removeDomainFilter (state, filter) {
        state.filters.domains = state.filters.domains.filter(o => { return o !== filter });
      },
      removeApproachFilter (state, filter) {
        state.filters.approaches = state.filters.approaches.filter(o => { return o !== filter });
      },

      clearFilters(state, filter) {
        state.filters[filter] = [];
      },
      clearApproachFilters(state) {
        state.filters.approaches = [];
      },
      clearDomainFilters(state) {
        state.filters.domains = [];
      },
    },
    actions: {

        setStandards (context,standards) {
            context.commit('setStandards', standards);
        },
        setAssets (context,filters) {
            context.commit('setAssets', filters);
        },
        setDomains (context, domains) {
            context.commit('setDomains', domains);
        },
        setApproaches (context, approaches) {
            context.commit('setApproaches', approaches);
        },

        setFilters (context, filters) {
          context.commit('setAssetFilters', filters);
        },
        setDomainFilters (context, domainFilters) {
          context.commit('setDomainFilters', domainFilters);
        },

        addFilter (context, filter) {
            context.commit('addFilter', filter);
        },
        addDomainFilter (context, filter) {
          context.commit('addDomainFilter', filter);
        },

        removeFilter (context, filter) {
          context.commit('removeFilter', filter);
        },
        removeDomainFilter (context, filter) {
          context.commit('removeDomainFilter', filter);
        },

        clearFilters(context, filter) {
          context.commit('clearFilters', filter.filterName);
        },
        clearDomainFilters(context) {
          context.commit('clearDomainFilters');
        },


    },
  })
 
export default store;