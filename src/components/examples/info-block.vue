<template>
    <div class="flex flex-row gap-5 py-5">
        <div class="info-block info">
            <h3 class="py-2">{{ example.text }}</h3>
        </div>
    </div>
</template>
<script language="ts">
export default {
    name: 'DoDontTextExample',
    props: {
        example: Object,
    }
}
</script>
<style scoped>
.info-block {
    width: 100%;
    height: auto;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    border-radius: 5px;
    border-left-width: 16px;
    padding: 16px;
}

.info {
    border-left-color: #003057;
}

.info::before, .::before {
   content: '';
    width: 16px;
    height: 16px;
    display: block;
    position: absolute;
    margin-left: -32px;
    margin-top: -6px;
    background-repeat: no-repeat;
    background-position: center top;
}
</style>