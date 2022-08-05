<template>
<span class="inline">
    <img  class="inline" :src="plus" v-if="!modelValue" @click="toggle"/>
    <img class="inline" :src="minus" v-if="modelValue"  @click="toggle"/>
</span>
</template>
<script>
import icons from "../../assets/icons";
export default {
    name: 'Toggle',
    props: ['modelValue'],
    emits: ['update:modelValue'],
    data() {
        return {
            plus: icons.plus,
            minus: icons.minus,
        }
    },
    methods: {
        toggle() {
            this.$emit('update:modelValue', !this.modelValue);
        }
    }
}
</script>
