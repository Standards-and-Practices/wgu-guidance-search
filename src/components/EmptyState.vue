<template>
    <div>
        <div class="pt-4 pb-2 sorry">Sorry, we couldn’t find a match for “{{search}}”</div>

        <div class="pt-4 pb-2 did-you-mean hidden">Did you mean “<span class="text-accent-blue">{{search}}</span>”</div>
        <div class="search-help-header">Search Help</div>

        <div class="search-help-text">
            <ul class="list-disc ml-6">
                <li>Check your search for typos</li>
                <li>Use more generic search terms</li>
                <li>The content you are searching for may be outdated or archived</li>
            </ul>
        </div>

        <div class="search-help-header">Browse by Domain</div>
        <div class="search-help-text">
            <a v-for="domain in domains" class="w-1/2" @click="browse('domains', domain.node.databaseId)" :title="domain.node.name">{{domain.node.name}}</a>
        </div>

        <div class="search-help-header">Browse by Asset</div>
        <div class="search-help-text">
            <a v-for="asset in assets" class="w-1/2" @click="browse('assets', asset.node.databaseId)" :title="asset.node.name">{{asset.node.name}}</a>
        </div>

        <div class="search-help-header">Browse by Approach</div>
        <div class="search-help-text">
            <a v-for="approach in approaches" class="w-1/2" @click="browse('approaches', approach.node.databaseId)" :title="approach.node.name">{{approach.node.name}}</a>
        </div>

    </div>

</template>
<script>
import icons from "../assets/icons";
export default {
    name: "EmptyState",
    props: { 
        search: {
            type: String,
            required: false,
            default: ''
        },
        domains: { 
            type: [Object],
            required: true,
            default: {},
        },
        assets: { 
            type: [Object],
            required: true,
            default: {},
        },
        approaches: { 
            type: [Object],
            required: true,
            default: {},
        },
    },
    data() {
        return {
            contact: icons.contact,
        }
    },
    methods: {
        clearAllFilters(filterName) {

            this.$store.dispatch("clearFilters", "domains")
            this.$store.dispatch("clearFilters", "assets")
            this.$store.dispatch("clearFilters", "approaches")
            this.$store.dispatch("setSearch", "")

            if(filterName !== "domains") {
                this.store.dispatch("setDomainFilters")
            }

        },
        browse(filterName, databaseId) {
            // console.log(filterName, databaseId);
            this.clearAllFilters(filterName)

            this.$store.dispatch(`addFilter`, {
                filterName: filterName,
                databaseId: String(databaseId)
            });
        },
    },
}
</script>
<style lang="css">
.sorry {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    color: #000000;
}

.did-you-mean {
    font-family: 'Open Sans';
    font-style: italic;
    font-weight: 400;
    font-size: 24px;
    line-height: 33px;
    display: flex;
    align-items: center;
    color: #000000;
}

.search-help-header {
    @apply pt-10 pb-2;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: #63666A;
}

.search-help-text {
    @apply w-full flex flex-wrap;
}

.search-help-text a {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    letter-spacing: 0.5px;
    text-decoration-line: underline;
    color: #327DA9;
    cursor: default;
}
</style>