<template>
    <span>
    <input :id="uuid" type="checkbox" @click="toggle" />
    <label :for="uuid">{{ label }}</label>
    </span>
</template>
<script>
export default {
    name: 'Checkbox',
    props: ['modelValue', 'label'],
    emits: ['update:modelValue'],
    data() {
        return {
            uuid: ''
        }
    },
    methods: {
        toggle() {
            this.$emit('update:modelValue', !this.modelValue);
        },
        uuidv4() {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        }
    },
    mounted() {
        const d = new Date();
        this.uuid = this.uuidv4();
    },

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

input[type="checkbox"]:active,
input[type="checkbox"]:focus {
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