<template>
    <div class="flex flex-row gap-5 py-5">
        <div class="do">
            <h3 class="">{{ example.do_text }}</h3>
            {{ example.do_description }}
        </div>
        <div class="dont">
            <h3 class="">{{ example.dont_text }}</h3>
            {{ example.dont_description }}
        </div>
    </div>
</template>
<script>
export default {
    name: 'DoDontTextExample',
    props: {
        example: Object,
    }
}
</script>
<style>
.do {
    width: 200px;
    height: 200px;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    border-radius: 5px;
    padding-left: 24px
}
.do::before{
    content: '';
    width: 16px;
    height: 200px;
    display: block;
    position: absolute;
    margin-top: -1px;
    margin-left: -25px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: #4FAE59;
    background-repeat: no-repeat;
    background-position: center 8px;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgNEw1IDdMMTAgMiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIi8+Cjwvc3ZnPgo=");
    
}
.dont {
    width: 200px;
    height: 200px;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    border-radius: 5px;
    padding-left: 24px;
}
.dont::before{
    content: '';
    width: 16px;
    height: 200px;
    display: block;
    position: absolute;
    margin-top: -1px;
    margin-left: -25px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-repeat: no-repeat;
    background-position: center 8px;
    background-color: #840028;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNy41NDQxMiA2LjMyODg4TDcuNjUwMTkgNi4yMjI4Mkw3LjU0NDEyIDYuMTE2NzVMNS40NDU1NiA0LjAxODE4TDcuNTYxMjEgMS45MDI1Mkw3LjY2NzI4IDEuNzk2NDZMNy41NjEyMSAxLjY5MDM5TDYuMzEzNjMgMC40NDI4MDdMNi4yMDc1NiAwLjMzNjc0MUw2LjEwMTUgMC40NDI4MDdMMy45ODU4NCAyLjU1ODQ3TDEuODg3MjcgMC40NTk4OTdMMS43ODEyIDAuMzUzODMxTDEuNjc1MTQgMC40NTk4OTdMMC40Mjc1NTUgMS43MDc0OEwwLjMyMTQ4OSAxLjgxMzU1TDAuNDI3NTU1IDEuOTE5NjFMMi41MjYxMiA0LjAxODE4TDAuNDM4OTQ4IDYuMTA1MzZMMC4zMzI4ODIgNi4yMTE0MkwwLjQzODk0OCA2LjMxNzQ5TDEuNjg2NTMgNy41NjUwN0wxLjc5MjYgNy42NzExNEwxLjg5ODY2IDcuNTY1MDdMMy45ODU4NCA1LjQ3NzlMNi4wODQ0MSA3LjU3NjQ3TDYuMTkwNDcgNy42ODI1M0w2LjI5NjU0IDcuNTc2NDdMNy41NDQxMiA2LjMyODg4WiIgZmlsbD0id2hpdGUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC4zIi8+Cjwvc3ZnPgo=");
}
</style>