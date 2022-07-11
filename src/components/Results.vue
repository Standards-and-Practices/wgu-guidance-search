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
    <div class="w-1/2 flex-col" >
      <Standard :standard="standard" v-for="(standard, index) in standards" :key="standard.id"/>
    </div>

  </div>
</template>

<script>
// import {debounce} from 'lodash-es'
import api from '../api'
import Standard from './Standard.vue'
import DomainFilter from './DomainFilter.vue';
import AssetFilter from './AssetFilter.vue';
import ApproachFilter from './ApproachFilter.vue';
export default {
  name: 'Results',
  components: { Standard, DomainFilter, AssetFilter, ApproachFilter },
  data() {
    return {
      search: '',
      standards: [],
    }
  },
  mounted() {
    if (Window.search){
      this.search = Window.search;
    }
    this.getStandards(this.search);
  },
  methods: {
    async getStandards(search) {
      this.standards = await api.getList('standards',search, '100');
    }
  },
  watch: {
    search(newValue) {
      this.getStandards(newValue)
    }
  }
}
</script>