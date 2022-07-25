<template>
  <div>
    <div class="w-full">
      <DomainFilter />
    </div>
    <div class="w-3/4 my-8 mx-auto">
      <SearchInput type="search" v-model="search" wrapperClass="searchWrapper" placeholder="Search Standards & Guidance" />
    </div>
  </div>
  <div class="container flex">
    <div class="w-1/3">
      <TaxonomyFilter filterName="assets" :items="assets.edges" :activeItems="activeAssetFilters" v-if="assets?.edges" />
      <TaxonomyFilter filterName="approaches" :items="approaches.edges" :activeItems="activeApproachFilters" v-if="approaches?.edges" />
    </div>
    <div class="w-2/3 flex-col">

      <div v-if="standards?.edges.length && activeDomainFilters.length > 0 && !$apollo.loading">
        <Standard :standard="standard.node" v-for="standard in standards.edges" :key="standard.id" />
      </div>


      <div v-if="!standards?.edges.length && activeDomainFilters.length > 0 && !$apollo.loading">
        <!-- If there aren't any results, but domains are selected, and it's not loading, show an empty state message. -->
        <EmptyState />
      </div>

      <div v-if="activeDomainFilters.length == 0 && !$apollo.loading">
        <!-- If there aren't any results, but domains are selected, and it's not loading, show an empty state message. -->
        <EmptyDomainState />
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import Standard from './Standard.vue'
import DomainFilter from './domains/DomainFilter.vue';
import TaxonomyFilter from './TaxonomyFilter.vue';
import EmptyState from './EmptyState.vue';
import EmptyDomainState from './EmptyDomainState.vue';
import SearchInput from 'vue-search-input'
import '/node_modules/vue-search-input/dist/styles.css'
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
  components: { EmptyState, EmptyDomainState, SearchInput, Standard, DomainFilter, TaxonomyFilter },
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

        // console.log(localStorage.getItem('wgu-guidance-initialized'))

        if (localStorage.getItem('wgu-guidance-initialized') !== 'true') {
          console.log('Initializing')
          this.$store.dispatch('setDomainFilters', polished.map(object => object['databaseId']).map(String));
          localStorage.setItem('wgu-guidance-initialized', 'true');
        }

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
    activeApproachFilters() {
      return this.$store.state.filters.approaches;
    },
    activeAssetFilters() {
      return this.$store.state.filters.assets;
    },
    activeDomainFilters() {
      return this.$store.state.filters.domains;
    },
    where() {
      let taxArray: RootQueryToStandardConnectionWhereArgsTaxArray[] = []


      if (this.activeApproachFilters.length) {
        taxArray.push({
          terms: this.$store.state.filters.assets,
          taxonomy: TaxonomyEnum.Approach,
          operator: RootQueryToStandardConnectionWhereArgsTaxQueryOperator.In,
          field: RootQueryToStandardConnectionWhereArgsTaxQueryField.TaxonomyId,
        })
      }
      if (this.activeAssetFilters.length) {
        taxArray.push({
          terms: this.$store.state.filters.assets,
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
  @apply shadow-sm block w-full border-gray-300 rounded-md;
}

.searchWrapper input {
  @apply w-full;
}
</style>