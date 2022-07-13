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
      addAssetFilter (state, assetFilter) {
        state.filters.assetsFilters.push(assetFilter);
      },
      addDomainFilter (state, domainFilter) {
        state.filters.domainFilters.push(domainFilter);
      },
      addApproachFilter (state, approachFilter) {
        state.filters.approachFilters.push(approachFilter);
      },
      removeAssetFilters (state, assetFilter) {
        state.filters.assetsFilters =  state.filters.assetsFilters.splice (filter => { return filter !== assetFilter });
      },
      removeDomainFilter (state, domainFilter) {
        state.filters.domainFilters =  state.filters.domainFilters.filter(filter => { return filter !== domainFilter });
      },
      removeApproachFilters (state, approachFilter) {
        state.filters.approachFilters =  state.filters.approachFilters.filter(filter => { return filter !== approachFilter });
      },
    },
    actions: {
        setStandards (context,standards) {
            context.commit('setStandards', standards);
        },
        setAssets (context,assets) {
            context.commit('setAssets', assets);
        },
        setApproaches (context,Approaches) {
            context.commit('setApproaches', Approaches);
        },
        setDomains (context,Domains) {
            context.commit('setDomains', Domains);
        },
        addAssetFilters (context, assetFilter) {
            context.commit('addAssetFilter', assetFilter);
        },
        addDomainFilter (context, domainFilter) {
          context.commit('addDomainFilter', domainFilter);
        },
        removeDomainFilter (context, domainFilter) {
          context.commit('removeDomainFilter', domainFilter);
        }
    },
  })
 
export default store;