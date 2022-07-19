<template>
  <div>
    <DomainFilter />
    <div class="w-1/2 my-8 mx-auto">
        <SearchInput 
          type="search" 
          v-model="search" 
          wrapperClass="searchWrapper" 
          placeholder="Search Standards & Guidance"
        />
    </div>
  </div>
  <div class="container flex">
    <div class="w-1/4">
      <AssetFilter />
      <ApproachFilter />
    </div>
    <div class="w-2/3 flex-col">

      <div class="border-2 border-red-600 rounded ">
        
        {{ JSON.stringify(where) }}
        
      </div>

      <div v-if="$apollo.loading">Loading...</div>
      <div v-if="standards?.edges.length">
        <Standard :standard="standard.node" v-for="(standard, index) in standards.edges" :key="standard.id" />
      </div>
      <div v-if="!standards?.edges.length">
        No results found.
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Standard from './Standard.vue'
import DomainFilter from './DomainFilter.vue';
import AssetFilter from './AssetFilter.vue';
import ApproachFilter from './ApproachFilter.vue';
import SearchInput from 'vue-search-input'
import 'vue-search-input/dist/styles.css'
import queries from '../queries.js';
import {
  TaxonomyEnum,
  RelationEnum,

  RootQueryToStandardConnectionWhereArgsTaxQueryField,
  RootQueryToStandardConnectionWhereArgsTaxQueryOperator
} from '../generated/graphql';

import type { RootQueryToStandardConnectionWhereArgs, RootQueryToStandardConnectionWhereArgsTaxArray, RootQueryToStandardConnectionWhereArgsTaxQuery } from '../generated/graphql';

export default {
  name: 'Search',
  components: { SearchInput, Standard, DomainFilter, AssetFilter, ApproachFilter },
  data() {
    return {
      search: '',
    }
  },
  apollo: {
    approaches: {
      query: queries.getApproaches,
      result(results) {
        this.$store.dispatch('setApproaches', results.data.approaches.edges)
      }
    },
    assets: {
      query: queries.getAssets,
      result(results) {
        this.$store.dispatch('setAssets', results.data.assets.edges)
      }
    },
    domains: {
      query: queries.getDomains,
      result(results) {

        let raw = results.data.domains.edges
        let polished = [];

        raw.forEach(domain => {
           polished.push(domain.node);
        })

        this.$store.dispatch('setDomains', polished)
      }
    },
    standards: {
      query: queries.getStandards,
      variables() {
        return {
          first: 100,
          where: this.where,
        }
      },
      debounce: 750,
      result(results) {

        this.$store.dispatch('setStandards', results?.data?.standards?.edges)
      }
    },
  },
  mounted() {
    if (globalThis.search) {
      this.search = globalThis.search;
    }

  },
  computed: {
    filters() {
      return this.$store.state.filters
    },
    activeDomainsArray() {

      return this.filters.domains;

    },
    activeAssetsArray() {

      let activeAssets: string[] = []
      if (this.filters.assets) {
        activeAssets = this.filters.assets.map(object => object['databaseId']).map(String)
      }
      return activeAssets;

    },
    activeApproachesArray() {

      let activeApproaches: string[] = []
      if (this.filters.approaches) {
        activeApproaches = this.filters.approaches.map(object => object['databaseId']).map(String)
      }
      return activeApproaches;

    },
    where() {
      let taxArray: RootQueryToStandardConnectionWhereArgsTaxArray[] = []

      if(this.activeApproachesArray.length) {
        taxArray.push({
          terms: this.activeApproachesArray,
          taxonomy: TaxonomyEnum.Approach,
          operator: RootQueryToStandardConnectionWhereArgsTaxQueryOperator.In,
          field: RootQueryToStandardConnectionWhereArgsTaxQueryField.TaxonomyId,
        })
      }

      if(this.activeAssetsArray.length) {
        taxArray.push({
          terms: this.activeAssetsArray,
          taxonomy: TaxonomyEnum.Asset,
          operator: RootQueryToStandardConnectionWhereArgsTaxQueryOperator.In,
          field: RootQueryToStandardConnectionWhereArgsTaxQueryField.TaxonomyId,
        })
      }

      if(this.activeDomainsArray.length) {
        taxArray.push({
          terms: this.activeDomainsArray,
          taxonomy: TaxonomyEnum.Domain,
          operator: RootQueryToStandardConnectionWhereArgsTaxQueryOperator.In,
          field: RootQueryToStandardConnectionWhereArgsTaxQueryField.TaxonomyId,
        })
      }

      let taxQuery: RootQueryToStandardConnectionWhereArgsTaxQuery = {
        relation: RelationEnum.And,
        taxArray: taxArray,
      }

      let whereQuery: RootQueryToStandardConnectionWhereArgs = {
        search: this.search,
        taxQuery: taxQuery
      }

      return whereQuery;
    }
  },
  methods: {

  },
}
</script>

<style type="text/css">
.searchWrapper {
  @apply shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md;
}
.searchWrapper input {
  @apply w-full;
}
</style>