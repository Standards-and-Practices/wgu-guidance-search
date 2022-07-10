<template>

    <div class="w-full pb-8">
        <div v-if="standard.domains">
            <DomainName v-for="(domain, index) in standard.domains" key="index" :id="domain" />
        </div>
        <a class="text-2xl font-bold">{{ standard.title.rendered }}
            <Toggle v-model="open" v-if="standard.acf.guidance" />
        </a>
        <div class="w-full flex min-h-max">

            <img class="inline pr-2" :src="tag" v-if="standard.principles" />
            <Principle v-for="(principle, index) in standard.principles" key="index" :id="principle" />
            
        </div>
        <div v-if="open">
            
            <Guidance v-for="(guidance, index) in standard.acf.guidance" :key="index" :guidance="guidance" />

        </div>
    </div>

</template>

<script>
import DomainName from "./DomainName.vue";
import Guidance from './Guidance.vue';
import Principle from "./Principle.vue";
import Toggle from './atoms/Toggle.vue';
import icons from '../assets/icons';

export default {
    name: 'Standard',
    components: { DomainName, Guidance, Principle, Toggle },
    props: {
        standard: Object,
    },
    data() {
        return {
            open: false,
            tag: icons.tag,
        }
    },
}
</script>