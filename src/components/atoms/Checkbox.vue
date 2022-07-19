<template>
    <span>
        <img :src="checked" v-if="modelValue" class="checkbox" />
        <img :src="unchecked" v-if="!modelValue" class="checkbox" />
        <label>{{ label }}</label>
    </span>
</template>
<script>
import icons from '../../assets/icons'
export default {
    name: 'Checkbox', 
    props: {
        modelValue: Boolean,
        label: String
    },
    emits: ['update:modelValue'],
    data() {
        return {
            checked: icons.checked,
            unchecked: icons.unchecked,
        }
    }
}
</script>
<style scoped>
 .checkbox {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin-right: 8px;
 }
</style>