<template>
    <div>
          
        <div class="pt-4 pb-2 sorry">Please select at least one domain to search. </div>

		<BrowseBy single="domain" plural="domains" />     
    </div>
</template>
<script>

import BrowseBy from './BrowseBy.vue';
  export default {
        name: "EmptyDomainState",
        components: { BrowseBy, },
    }
</script>