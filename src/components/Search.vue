<template>
  <div>
    <DomainFilter />
    <div class="w-3/4 my-8 mx-auto">
      <SearchInput type="search" v-model="search" wrapperClass="searchWrapper" placeholder="Search Standards & Guidance" />
    </div>
  </div>
  <div class="container flex">
    <div class="w-1/4">
      <AssetFilter />
      <ApproachFilter />
    </div>
    <div class="w-3/4 flex-col">
      <div v-if="$apollo.loading">Loading...</div>
      <div v-if="standards?.edges.length && activeDomainFilters.length > 0">
        <Standard :standard="standard.node" v-for="standard in standards.edges" :key="standard.id" />
      </div>
      <div v-if="!standards?.edges.length && activeDomainFilters.length > 0">
        <EmptyState />
      </div>
      <div v-if="activeDomainFilters.length == 0">
        <EmptyDomainState />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Standard from './Standard.vue'
import DomainFilter from './DomainFilter.vue';
import AssetFilter from './AssetFilter.vue';
import ApproachFilter from './ApproachFilter.vue';
import EmptyState from './EmptyState.vue';
import EmptyDomainState from './EmptyDomainState.vue';
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
  components: { EmptyState, EmptyDomainState, SearchInput, Standard, DomainFilter, AssetFilter, ApproachFilter },
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

        raw.forEach(domain => { polished.push(domain.node); })

        this.$store.dispatch('setDomains', polished)
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
    // Allow a PHP variable to set a global search term, which is then picked up by our JS component as an initial search.
    if (globalThis.search) {
      this.search = globalThis.search;
    }

  },
  computed: {
    filters() {
      return this.$store.state.filters
    },
    activeDomainFilters() {
      return this.filters.domains;
    },
    activeAssetFilters() {
      let activeAssets: string[] = []
      if (this.filters.assets) {
        activeAssets = this.filters.assets.map(object => object['databaseId']).map(String)
      }
      return activeAssets;
    },
    activeApproachFilters() {
      let activeApproaches: string[] = []
      if (this.filters.approaches) {
        activeApproaches = this.filters.approaches.map(object => object['databaseId']).map(String)
      }
      return activeApproaches;
    },
    where() {
      let taxArray: RootQueryToStandardConnectionWhereArgsTaxArray[] = []

      if (this.activeApproachFilters.length) {
        taxArray.push({
          terms: this.activeApproachFilters,
          taxonomy: TaxonomyEnum.Approach,
          operator: RootQueryToStandardConnectionWhereArgsTaxQueryOperator.In,
          field: RootQueryToStandardConnectionWhereArgsTaxQueryField.TaxonomyId,
        })
      }

      if (this.activeAssetFilters.length) {
        taxArray.push({
          terms: this.activeAssetFilters,
          taxonomy: TaxonomyEnum.Asset,
          operator: RootQueryToStandardConnectionWhereArgsTaxQueryOperator.In,
          field: RootQueryToStandardConnectionWhereArgsTaxQueryField.TaxonomyId,
        })
      }

      if (this.activeDomainFilters.length) {
        taxArray.push({
          terms: this.activeDomainFilters,
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
  }
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