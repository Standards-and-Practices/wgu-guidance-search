import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state () {
      return {
        assets: [],
        approaches: [],
        domains: [],
        filters: {
            domainFilters: [],
            assetsFilters: [],
            approachFilters: [],
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
      addAssetFilter (state, assetFilter) {``
        if(!state.filters.assetsFilters.includes(assetFilter)) {
          state.filters.assetsFilters.push(assetFilter);
        }
      },
      addDomainFilter (state, domainFilter) {
        if(!state.filters.domainFilters.includes(domainFilter)) {
          state.filters.domainFilters.push(domainFilter);
        }
      },
      addApproachFilter (state, approachFilter) {
        if(!state.filters.approachFilters.includes(approachFilter)) {
          state.filters.approachFilters.push(approachFilter);
        }
      },
      removeAssetFilter (state, assetFilter) {
        state.filters.assetsFilters.splice(state.filters.assetsFilters.indexOf(assetFilter), 1);
      },
      removeDomainFilter (state, domainFilter) {
        state.filters.domainFilters.splice(state.filters.assetsFilters.indexOf(domainFilter,1));
      },
      removeApproachFilter (state, approachFilter) {
        state.filters.approachFilters.splice(state.filters.assetsFilters.indexOf(approachFilter), 1);
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

        addAssetFilter (context, assetFilter) {
            context.commit('addAssetFilter', assetFilter);
        },
        addApproachFilter (context, approachFilter) {
            context.commit('addApproachFilter', approachFilter);
        },
        addDomainFilter (context, domainFilter) {
          context.commit('addDomainFilter', domainFilter);
        },

        removeAssetFilter (context, assetFilter) {
          context.commit('removeAssetFilter', assetFilter);
        },
        removeApproachFilter (context, approachFilter) {
          context.commit('removeApproachFilter', approachFilter);
        },
        removeDomainFilter (context, domainFilter) {
          context.commit('removeDomainFilter', domainFilter);
        }

    },
  })
 
export default store;