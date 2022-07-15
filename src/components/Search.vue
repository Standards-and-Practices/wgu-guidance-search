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
        return {
          search: this.search,
          taxArray: this.taxArray
        }
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
      
      let taxonomyArray = [];
      
      let domainFilterObject = {
        field: "TAXONOMY_ID",
        includeChildren: true,
        taxonomy: "DOMAIN",
        operator: "IN",
        terms: this.activeDomainsArray
      }
      let assetFilterObject = {
        field: "TAXONOMY_ID",
        includeChildren: true,
        taxonomy: "ASSET",
        operator: "IN",
        terms: this.activeAssetsArray
      }
      let approachFilterObject = {
        field: "TAXONOMY_ID",
        includeChildren: true,
        taxonomy: "APPROACH",
        operator: "IN",
        terms: this.activeApproachesArray
      }

      if (domainFilterObject.term) {
        taxonomyArray.push(domainFilterObject)
      }

      if (assetFilterObject.term) {
        taxonomyArray.push(assetFilterObject)
      }

      if (approachFilterObject.term) {
        taxonomyArray.push(approachFilterObject)
      }

      return taxonomyArray;
    }
  }
}
</script>