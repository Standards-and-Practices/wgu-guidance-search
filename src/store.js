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

      addAssetFilter (state, filter) {
        if(!state.filters.assets.includes(filter)) {
          state.filters.assets.push(filter);
        }
      },
      addDomainFilter (state, filter) {
        if(!state.filters.domains.includes(filter)) {
          state.filters.domains.push(filter);
        }
      },
      addApproachFilter (state, filter) {
        if(!state.filters.approaches.includes(filter)) {
          state.filters.approaches.push(filter);
        }
      },
      removeAssetFilter (state, filter) {
        state.filters.assets.splice(state.filters.assets.indexOf(filter), 1);
      },
      removeDomainFilter (state, filter) {
        state.filters.domains.splice(state.filters.assets.indexOf(filter,1));
      },
      removeApproachFilter (state, filter) {
        state.filters.approaches.splice(state.filters.assets.indexOf(filter), 1);
      },
    },
    actions: {

        setStandards (context,standards) {
            context.commit('setStandards', standards);
        },
        setAssets (context,assets) {
            context.commit('setAssets', assets);
        },
        setApproaches (context, approaches) {
            context.commit('setApproaches', approaches);
        },
        setDomains (context, domains) {
            context.commit('setDomains', domains);
        },

        setAssetFilters (context, assetFilters) {
          context.commit('setAssetFilters', assetFilters);
        },
        setApproachFilters (context, approachFilters) {
          context.commit('setApproachFilters', approachFilters);
        },
        setDomainFilters (context, domainFilters) {
          context.commit('setDomainFilters', domainFilters);
        },

        addAssetFilter (context, filter) {
            context.commit('addAssetFilter', filter);
        },
        addApproachFilter (context, filter) {
            context.commit('addApproachFilter', filter);
        },
        addDomainFilter (context, filter) {
          context.commit('addDomainFilter', filter);
        },

        removeAssetFilter (context, filter) {
          context.commit('removeAssetFilter', filter);
        },
        removeApproachFilter (context, filter) {
          context.commit('removeApproachFilter', filter);
        },
        removeDomainFilter (context, filter) {
          context.commit('removeDomainFilter', filter);
        }

    },
  })
 
export default store;