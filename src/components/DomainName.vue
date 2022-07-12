<template>
    <div :style="{ color : domain.displaySettings.color }">
        <img class="block w-10 absolute -ml-14 mt-4" :src="domain.displaySettings.activeIcon.sourceUrl" />
        <img class="answer-mark" :src="answerMark" />
        <span class="domain-name">{{ domain.name }}</span>
    </div>
</template>
<script>
import icons from '../assets/icons';
export default {
    name: 'DomainName',
    props: {
        domain: Object,
    },
    data() {
        return {
            answerMark: icons.answerMark,
        }
    },
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