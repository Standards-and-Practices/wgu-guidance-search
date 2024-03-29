<template>
  <div>
    <div class="w-full">
      <DomainFilter :ready="domainsAreReady"/>
    </div>
    <div class="w-3/4 my-8 mx-auto">
      <SearchInput type="search" v-model="search" wrapperClass="search-input-wrapper" placeholder="Search Standards & Guidance" :searchIcon="true" :shortcutIcon="true" :clearIcon="true" :hideShortcutIconOnBlur="true" :clearOnEsc="true" :blurOnEsc="true" :selectOnFocus="true" :shortcutListenerEnabled="true" />
    </div>
  </div>
  <div class="container flex">
    <div class="w-1/3">
      <TaxonomyFilter :ready="assetsAreReady" filterName="assets" :items="assets?.edges" :activeItems="activeAssetFilters" />
      <TaxonomyFilter :ready="approachesAreReady" filterName="approaches" :items="approaches?.edges" :activeItems="activeApproachFilters" />
    </div>
    <div class="w-2/3 flex-col">

      <div v-if="$apollo.queries.standards.loading || !standardsAreReady">
        <!-- Display the loader skeletons -->
        <SkeletonStandard :standard="false" v-for="(standard, index) in 12" :key="index" />
      </div>

      <div v-if="standards?.edges.length && activeDomainFilters.length > 0 && !$apollo.queries.standards.loading && standardsAreReady">
        <!-- If there are results, show them. -->
        <Standard :standard="standard.node" v-for="standard in standards.edges" :key="standard.id" />
      </div>

      <div v-if="!standards?.edges.length && activeDomainFilters.length > 0 && !$apollo.queries.standards.loading && standardsAreReady">
        <!-- If there aren't any results, but domains are selected, and it's not loading, show an empty state message. -->
        <EmptyState />
      </div>

      <div v-if="activeDomainFilters.length == 0 && !$apollo.queries.standards.loading && standardsAreReady">
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
import EmptyState from './empty/EmptyState.vue';
import EmptyDomainState from './empty/EmptyDomainState.vue';
import SkeletonStandard from './skeletons/SkeletonStandard.vue';
import SearchInput from 'vue-search-input';

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
  components: { EmptyState, EmptyDomainState, SearchInput, Standard, DomainFilter, SkeletonStandard, TaxonomyFilter },
  apollo: {
    approaches: {
      query: queries.getApproaches,
      result(results) {

        let raw = results.data.approaches.edges
        let polished = [];
        raw.forEach(approach => { polished.push(approach.node); })

        this.$store.dispatch('setApproaches', polished)
        this.approachesAreReady = true
      }
    },
    assets: {
      query: queries.getAssets,
      result(results) {

        let raw = results.data.assets.edges
        let polished = [];
        raw.forEach(asset => { polished.push(asset.node); })

        this.$store.dispatch('setAssets', polished)
        this.assetsAreReady = true

      }
    },
    domains: {
      query: queries.getDomains,
      result(results) {

        let raw = results.data.domains.edges
        let polished = [];

        raw.forEach(domain => { polished.push(domain.node); })

        this.$store.dispatch('setDomains', polished)

        if (localStorage.getItem('wgu-guidance-initialized') !== 'true') {
          this.$store.dispatch('setDomainFilters', polished.map(object => object['databaseId']).map(String));
          localStorage.setItem('wgu-guidance-initialized', 'true');
        }

        this.domainsAreReady = true

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
        this.standardsAreReady = true
      }
    },
  },
  data() {
    return {
      standardsAreReady: false,
      approachesAreReady: false,
      assetsAreReady: false,
      domainsAreReady: false,
    }
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
    },
    search: {
      get() {
        return this.$store.state.search;
      },
      set(value) {
        this.$store.dispatch('setSearch', value);
      },
    }
  },
}
</script>

<style type="text/css">
.search-input-wrapper {
  @apply border-gray shadow-sm block w-full rounded-md;
}

.search-input-wrapper input[data-search-input=true] {
  @apply w-full focus:ring-accent-blue focus:ring-2 focus:ring-opacity-60 focus:border-none text-xl;
  padding: 6px 30px 6px 52px;
}
</style>