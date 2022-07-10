<template>
    <div>
        
        <img class="block w-10 absolute -ml-12 mt-3" :src="domainIcon" />
        <img class="answer-mark" :src="answerMark" />
        <span class="domain-name">{{ domain.name }}</span>
    </div>
</template>
<script>
import icons from '../assets/icons';
import { actions } from '../api';
export default {
    name: 'DomainName',
    props: {
        id: Number,
    },
    data() {
        return {
            domain: {},
            answerMark: icons.answerMark,
        }
    },
    mounted() {
        this.getDomain()
    },
    methods: {
        async getDomain() {
            this.domain = await actions.getDomain(this.id);
        }
    },
    computed: {
        domainIcon() {
            return icons.accessibility;
        }
    }
}
</script>

<style scoped>
.domain-name {
    @apply uppercase font-bold text-center text-xs;
    font-size: 8px;
    line-height: 11px;
}
.answer-mark {
    @apply block w-10 absolute; 
    margin-left: -76px;

}
</style>