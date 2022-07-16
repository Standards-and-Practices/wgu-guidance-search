<template>
  <div>
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
    <div class="w-2/3 flex-col">
      <div v-if="$apollo.loading">Loading...</div>
      <div v-if="standards?.edges">
        <Standard :standard="standard.node" v-for="(standard, index) in standards.edges" :key="standard.id" />
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Standard from './Standard.vue'
import DomainFilter from './DomainFilter.vue';
import AssetFilter from './AssetFilter.vue';
import ApproachFilter from './ApproachFilter.vue';
import queries from '../queries.js';
import {
  TaxonomyEnum,
  RelationEnum,
  RootQueryStandardsArgs,
  RootQueryToStandardConnectionWhereArgsTaxQueryField,
  RootQueryToStandardConnectionWhereArgsTaxQueryOperator
} from '../generated/graphql';

import type { RootQueryToStandardConnectionWhereArgs, RootQueryToStandardConnectionWhereArgsTaxArray, RootQueryToStandardConnectionWhereArgsTaxQuery } from '../generated/graphql';

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
      result(results: { data: { approaches: { edges: any; }; }; }) {
        this.$store.dispatch('setApproaches', results.data.approaches.edges)
      }
    },
    assets: {
      query: queries.getAssets,
      result(results: { data: { assets: { edges: any; }; }; }) {
        this.$store.dispatch('setAssets', results.data.assets.edges)
      }
    },
    domains: {
      query: queries.getDomains,
      result(results: { data: { domains: { edges: any; }; }; }) {
        this.$store.dispatch('setDomains', results.data.domains.edges)
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
      debounce: 500,
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

      let activeDomains: string[] = []
      if (this.filters.domainFilters) {
        activeDomains = this.filters.domainFilters.map(String)
      }
      return activeDomains;

    },
    activeAssetsArray() {

      let activeAssets: string[] = []
      if (this.filters.assetFilters) {
        activeAssets = this.filters.assetFilters.map(String)
      }
      return activeAssets;

    },
    activeApproachesArray() {

      let activeApproaches: string[] = []
      if (this.filters.approachesFilters) {
        activeApproaches = this.filters.approachesFilters.map(String)
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
      console.log(this.activeDomainsArray)
      if(this.activeDomainsArray.length) {
        taxArray.push({
          terms: this.activeDomainsArray,
          taxonomy: TaxonomyEnum.Domain,
          operator: RootQueryToStandardConnectionWhereArgsTaxQueryOperator.In,
          field: RootQueryToStandardConnectionWhereArgsTaxQueryField.TaxonomyId,
        })
      }

      let taxQuery: RootQueryToStandardConnectionWhereArgsTaxQuery = {
        relation: RelationEnum.Or,
        taxArray: taxArray,
      }

      let whereQuery: RootQueryToStandardConnectionWhereArgs = {
        search: this.search,
        taxQuery: taxQuery
      }

      return whereQuery;
    }
  }
}
</script>