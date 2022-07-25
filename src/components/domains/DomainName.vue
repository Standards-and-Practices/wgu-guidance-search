<template>
    <div>
        <div class="answer-mark">
            <img class="domain-icon" :src="domain.displaySettings.activeIcon.sourceUrl" />
            <svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 73" xml:space="preserve">
                <g>
                    <path class="st0" d="M39,70.5h-2c-17.9,0-37-12.1-37-34.6C0,24.8,3.4,15.6,10,9.4C16.4,3.3,25.8,0,37,0c0,0,0,0,0,0h2v4h-2
		c-10.2,0-18.6,2.9-24.3,8.3C7,17.8,4,25.9,4,35.9c0,15.2,11.3,30.6,33,30.6h2V70.5z" />
                </g>

            </svg>
        </div>
        <a class="domain-name" :href="domain.url">{{ domain.name }}</a>
    </div>
</template>
<script>

import icons from '../../assets/icons';
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
.domain-icon{
    @apply block w-10 absolute mt-4;
    margin-left: 18px;
}

.answer-mark {
    @apply block w-10 absolute;
    margin-left: -76px;
}

/* 
@ Todo: fix problem with answer mark line when title line of standard wraps.
.answer-mark:before {
    border-right-color: deeppink;
    border-right-width: 4px;
    content: "";
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 32px;
    position: absolute;
    top: 50%;
} */
</style>