<template>
    <span>
        <img :src="checked" v-if="modelValue && !isSemiChecked" class="checkbox" />
        <img :src="unchecked" v-if="!modelValue&& !isSemiChecked" class="checkbox" />
        <img :src="semiChecked" v-if="isSemiChecked" class="checkbox" />
        <label>{{ label }}</label>
    </span>
</template>
<script>
import icons from '../../assets/icons'
export default {
    name: 'Checkbox', 
    props: {
        modelValue: {
            type: Boolean,
            default: false,
            require: false,
        },
        label: {
            type: String,
            default: "", 
            require: false,
        },
        isSemiChecked: {
            type: Boolean,
            default: false,
            require: false
        }
    },
    emits: ['update:modelValue'],
    data() {
        return {
            checked: icons.checked,
            unchecked: icons.unchecked,
            semiChecked: icons.semiChecked,
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