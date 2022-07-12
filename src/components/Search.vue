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
    <div class="w-1/2 flex-col" v-if="!this.loading && standards?.edges">
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
      variables: {},
    },
    assets: {
      query: queries.getAssets,
      variables: {},
    },
    domains: {
      query: queries.getDomains,
      variables: {},
    },
    standards: {
      query: queries.getStandards,
      variables () {
        return {
          search: this.search
        }
      }
    },
  },
  mounted() {
    if (Window.search) {
      this.search = Window.search;
    }
  }
}
</script>