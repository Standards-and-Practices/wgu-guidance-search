<template>
  <div>
    <div v-if="$apollo.loading">Loading...</div>
    <DomainFilter />
    <div class="w-1/2 my-8 mx-auto">
      <input v-model="search" type="search" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
    </div>
  </div>
  <div class="container flex">
    <div class="w-1/4">
      <AssetFilter />
      <ApproachFilter />
    </div>
    <div class="w-2/3 flex-col" v-if="standards?.edges">
      <Standard :standard="standard.node" v-for="(standard, index) in standards.edges" :key="standard.id" />
    </div>

  </div>
</template>

<script>
// import {debounce} from 'lodash-es'
import Standard from './Standard.vue'
import DomainFilter from './DomainFilter.vue';
import AssetFilter from './AssetFilter.vue';
import ApproachFilter from './ApproachFilter.vue';
import queries from '../queries.js';
import { TaxonomyEnum, RootQueryToStandardConnectionWhereArgsTaxQueryField, RootQueryToStandardConnectionWhereArgsTaxQueryOperator} from '../generated/graphql';

export default {
  name: 'Search',
  components: { Standard, DomainFilter, AssetFilter, ApproachFilter },
  data() {
    return {
      search: '',
    }
  },
  apollo: {
    approaches: {
      query: queries.getApproaches,
      result (results) {
        this.$store.dispatch('setApproaches', results.data.approaches.edges)
      }
    },
    assets: {
      query: queries.getAssets,
      result (results) {
        this.$store.dispatch('setAssets', results.data.assets.edges)
      }
    },
    domains: {
      query: queries.getDomains,
      result (results) {
        this.$store.dispatch('setDomains', results.data.domains.edges)
      }
    },
    standards: {
      query: queries.getStandards,
      variables() {

        let queryVars = {
          search: this.search,
          // taxArray: [],
        }

        // if (this.activeDomainsArray) {
        //   queryVars.taxArray = this.taxArray
        // }
        return queryVars
      },
      debounce: 500,
      result (results) {
        this.$store.dispatch('setStandards', results?.data?.standards?.edges)
      }
    },
  },
  mounted() {
    if (Window.search) {
      this.search = Window.search;
    }
  },
  computed: {
    activeDomainsArray() {
      return this.$store.state.filters.domainFilters
    },
    activeAssetsArray() {
      return this.$store.state.filters.assetFilters
    },
    activeApproachesArray() {
      return this.$store.state.filters.approachFilters
    },
    taxArray () {
      
      let taxArray = []
      

        let domainFilterArray = {
          field: RootQueryToStandardConnectionWhereArgsTaxQueryField.TaxonomyId,
          includeChildren: true,
          operator: RootQueryToStandardConnectionWhereArgsTaxQueryOperator.In,
          taxonomy: TaxonomyEnum.Domain,
          terms: this.activeDomainsArray.map(String),
        };

        taxArray.push(domainFilterArray)

      // if(this.activeAssetsArray) {
      //   let assetFilterObject = new RootQueryToStandardConnectionWhereArgsTaxQuery();
      //   assetFilterObject.field = RootQueryToStandardConnectionWhereArgsTaxQueryField.TaxonomyId
      //   assetFilterObject.includeChildren = true
      //   assetFilterObject.taxonomy = 'ASSET'
      //   assetFilterObject.operator = RootQueryToStandardConnectionWhereArgsTaxQueryOperator.In
      //   assetFilterObject.terms = this.activeAssetsArray
      //   taxonomyArray.push(assetFilterObject)
      // }
      // if(this.activeApproachesArray) {
      //   let approachFilterObject  = new RootQueryToStandardConnectionWhereArgsTaxQuery();
      //   approachFilterObject.field = RootQueryToStandardConnectionWhereArgsTaxQueryField.TaxonomyId
      //   approachFilterObject.includeChildren = true
      //   approachFilterObject.taxonomy = 'APPROACH'
      //   approachFilterObject.operator = RootQueryToStandardConnectionWhereArgsTaxQueryOperator.In
      //   approachFilterObject.terms = this.activeApproachesArray
      //   taxonomyArray.push(approachFilterObject)
      // }
      console.log(taxArray)
      return taxArray;
    }
  }
}
</script>