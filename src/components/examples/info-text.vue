<template>
    <div class="flex flex-row gap-5 py-5 ">
        <div class="info-block info">
            <h3 class="py-2" v-html="example.text"></h3>
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

.info::before {
   content: '';
    width: 13px;
    height: 13px;
    display: block;
    position: absolute;
    margin-left: -30px;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center top;
}
.info::before {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgOSA5IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNC4xIDBDMS44NCAwIDAgMS44NCAwIDQuMUMwIDYuMzYgMS44NCA4LjIgNC4xIDguMkM2LjM2IDguMiA4LjIgNi4zNiA4LjIgNC4xQzguMiAxLjg0IDYuMzUgMCA0LjEgMFpNNC44NiA1Ljk5QzQuODYgNi4yMSA0Ljc5IDYuNCA0LjY1IDYuNTRDNC41MSA2LjY4IDQuMzIgNi43NSA0LjEgNi43NUMzLjg4IDYuNzUgMy42OSA2LjY4IDMuNTUgNi41NEMzLjQxIDYuNCAzLjM0IDYuMjEgMy4zNCA1Ljk5VjQuMUMzLjM0IDMuODggMy40MSAzLjY5IDMuNTUgMy41NUMzLjY5IDMuNDEgMy44OCAzLjM0IDQuMSAzLjM0QzQuMzIgMy4zNCA0LjUxIDMuNDEgNC42NSAzLjU1QzQuNzkgMy42OSA0Ljg2IDMuODggNC44NiA0LjFWNS45OVpNNC42NSAyLjc1QzQuNTEgMi44OSA0LjMyIDIuOTYgNC4xIDIuOTZDMy44OCAyLjk2IDMuNjkgMi44OSAzLjU1IDIuNzVDMy40MSAyLjYxIDMuMzQgMi40MiAzLjM0IDIuMkMzLjM0IDEuOTggMy40MSAxLjc5IDMuNTUgMS42NUMzLjY5IDEuNTEgMy44OCAxLjQ0IDQuMSAxLjQ0QzQuMzIgMS40NCA0LjUxIDEuNTEgNC42NSAxLjY1QzQuNzkgMS43OSA0Ljg2IDEuOTggNC44NiAyLjJDNC44NiAyLjQyIDQuNzkgMi42MSA0LjY1IDIuNzVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K");
}
</style>