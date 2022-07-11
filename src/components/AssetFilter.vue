<template>
    <div class="mb-5">
        <div class="filter-title">Assets</div>
        <ul v-if="assets.length">
            <li v-for="asset in assets" :key="asset.id">
                <Checkbox />
                {{asset.name}}
            </li>
        </ul>
    </div>
</template>

<script>
// import api from "../api"
// import { groupBy } from "lodash-es"
import Checkbox from "./atoms/Checkbox.vue"

const GetAssets = `
  GetAssets {
    assets {
      id
      name
    }
  }
`;

export default {
    name: "AssetFilter",
    data() {
        return {
            assets: []
        };
    },
    mounted() {
        console.log("Initalizing Asset Filter");
        
        this.assets = useQuery({ query: GetAssets });

    },
    methods: {
        async getAssets() {
            // this.assets = await api.getTaxonomy("assets");
            this.assets = useQuery({
                query: GetTodos,
            });
            console.log("Assets", this.assets);
        }
    },
    components: { Checkbox }
}
</script>
<style scoped>
.filter-title {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #003057;
}
</style>