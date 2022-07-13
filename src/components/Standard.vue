<template>

    <div class="standard">
        <div :style="{ color: computedColor }">
            <DomainName v-for="(domain, index) in standard?.domains?.edges" :domain="domain.node" key="index" />
        </div>
        <a class="text-2xl font-bold">{{ standard.title }}
            <Toggle v-model="open" v-if="standard.guidance.guidance"/>
        </a>
        <div class="w-full flex min-h-max" :style="{ color: computedColor }">

            <svg class="mr-1" style="margin-top: 1px;" width="8" height="9" viewBox="0 0 8 9" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.80465 0.773998C7.79537 0.680949 7.72095 0.60659 7.62789 0.597238L4.27905 0.401855C4.22325 0.401855 4.17672 0.420478 4.13954 0.457659L0.0558202 4.54138C-0.0186067 4.61581 -0.0186067 4.72741 0.0558202 4.80185L3.60001 8.34604C3.67443 8.42046 3.78604 8.42046 3.86047 8.34604L7.9442 4.26231C7.98138 4.22513 8 4.17861 8 4.1228L7.80462 0.773965L7.80465 0.773998ZM6.81862 2.35538C6.60468 2.56931 6.26045 2.56931 6.04653 2.35538C5.83259 2.14144 5.83259 1.7972 6.04653 1.58328C6.26046 1.36935 6.6047 1.36935 6.81862 1.58328C7.03256 1.79722 7.03256 2.14146 6.81862 2.35538Z" />
            </svg>

            <span v-for="(principle, index) in standard?.principles?.edges" :key="index" class="inline pr-2 principle-name">
                {{principle.node.name}}
            </span>

        </div>
        <div v-if="open">
            <Guidance v-for="(guidance, index) in standard.guidance.guidance" :key="index" :guidance="guidance" :color="computedColor" :colorFaded="computedColorFaded" />
        </div>
    </div>

</template>

<script>
import DomainName from "./DomainName.vue";
import Guidance from './Guidance.vue';
import Toggle from './atoms/Toggle.vue';
import icons from '../assets/icons';

export default {
    name: 'Standard',
    components: { DomainName, Guidance, Toggle },
    props: {
        standard: Object,
    },
    data() {
        return {
            open: false,
            tag: icons.tag,
        }
    },
    computed: {
        computedColor() {
            return this.standard.domains.edges[0].node.displaySettings.color;
        },
        computedColorFaded() {
            return this.standard.domains.edges[0].node.displaySettings.fadedColor;
        },
    }
}
</script>
<style scoped>
.standard {
    @apply w-full pb-8;
    height: auto;
    min-height: 170px;
}
.principle-name {
    @apply uppercase font-bold text-center text-xs;
    font-size: 8px;
    line-height: 11px;
}
</style>