<template>
 <span class="domain-name">{{domain.name}}</span>
</template>
<script>
import {actions} from '../api';
export default {
    name: 'DomainName',
    props: {
        id: String,
    },
    data() {
        return {
            domain: {},
        }
    },
    mounted() {
        this.getDomain()
    },
    methods: {
        async getDomain() {
            this.domain = await actions.getDomain(this.id);
        }
    }
}
</script>

<style>
.domain-name {
    font-family: 'Open Sans';
font-style: normal;
font-weight: 700;
font-size: 8px;
line-height: 11px;
text-align: center;
color: #49B1B3;
}
</style>