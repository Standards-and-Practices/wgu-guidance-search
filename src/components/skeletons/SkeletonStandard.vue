<template lang="">
   <div class="standard mb-8">
            <div>
                <Skeletor width="70" height="70" circle class="answer-mark-skeleton" />
                <Skeletor width="60" height="8" class="mb-1"/>
                <Skeletor width="700" height="28" class="mr-4"/>
                <div class="flex flex-row">
                <Skeletor width="8" height="8" class="mt-1 mr-1 inline"/>
                <Skeletor width="60" height="8" class="mt-1 inline"/>
                </div>
            </div>
    </div>            
</template>
<script>
export default {
    name: "SkeletonStandard",
}
</script>
<style scoped>
    .answer-mark-skeleton {
        position: absolute;
        margin-left: -75px;
        margin-top: -10px;
    }
    /* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>