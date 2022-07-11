<template>
    <div :style="{ color : domainColor }">
        <img class="block w-10 absolute -ml-14 mt-4" :src="domainIcon" />
        <img class="answer-mark" :src="answerMark" />
        <span class="domain-name">{{ domain.name }}</span>
    </div>
</template>
<script>
import icons from '../assets/icons';
import api from '../api';
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
            this.domain = await api.getSingle('domains',this.id);
        },
    },
    computed: {
        domainIcon() {
            return icons.accessibility;
        },
        domainColor() {
            if (!this?.domain?.acf?.color) { return '#000000'; }
            const color = this.domain.acf.color;
            return `rgba(${color.red},${color.green},${color.blue},${color.alpha})`;
        },
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