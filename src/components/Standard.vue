<template>

    <div class="w-full flex-col mx-auto">
        <div>
            <DomainName v-for="(domain, index) in standard.domains" key="index" :id="domain" />{{ domain }}
        </div>
        <a class="text-2xl font-bold">{{ standard.title.rendered }} <Toggle v-model="open" /></a>
        <div>
            
            <Principle v-for="(principle, index) in standard.principles" key="index" :id="principle" />
        </div>
    </div>

</template>

<script>
import DomainName from "./DomainName.vue";
import Principle from "./Principle.vue";
import Toggle from './Toggle.vue';

export default {
    name: 'Standard',
    components: { DomainName, Principle, Toggle },
    props: {
        standard: Object,
    },
    data() {
        return {
            open: false,
            domains: [],
        }
    },
    mounted() {

    },
    methods: {
        async getDomain(id) {
            this.domain = await actions.getDomain(id);
        }
    },
}
</script>