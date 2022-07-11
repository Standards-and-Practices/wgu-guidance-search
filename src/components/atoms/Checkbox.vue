<template>
<input type="checkbox" @click="toggle"/>
</template>
<script>
export default {
    name: 'Checkbox',
    props: ['modelValue'],
    emits: ['update:modelValue'],
    methods: {
        toggle() {
            this.$emit('update:modelValue', !this.modelValue);
        }
    }
}
</script>
<style scoped>
input[type="checkbox"] {
    background-color: transparent;
	background-image: url('https://guidance.wgu.edu/standards/wp-content/uploads/sites/2/2022/06/deselect.png');
    background-position: 0 50%;
    background-repeat: no-repeat;
	background-size: 14px 14px;
	margin-bottom: 4px;
	padding-left: 20px;
	cursor: pointer;
	display: inline;
    outline: none;
    border: none;
}
input[type="checkbox"]:active, input[type="checkbox"]:focus {
    outline: none;
    outline-color: transparent;
    outline-offset: 0;
    background-color: transparent;
    box-shadow: none;
}
input[type="checkbox"]:checked {
	background-image: url('https://guidance.wgu.edu/standards/wp-content/uploads/sites/2/2022/06/select.png');
}
</style>