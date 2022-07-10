<template>
    <div>
        <h2 class="font-bold text-base border-l-4 border-lime-600 -mx-10 px-10">{{ guidance.guidance_statement }}</h2>
        <div class="border-l-4 border-lime-600 -mx-10 px-10">{{ guidance.guidance_rationale }}</div>
        <component 
            :is="getExample(example.acf_fc_layout)" 
            v-for="(example, index) in guidance.guidance_examples" 
            :key="index" 
            :example="example"
            class="border-l-4 border-dashed border-lime-300 -mx-10 px-10"
        ></component>
    </div>
</template>

<script>
import Code from "./examples/code.vue"
import DoDontImage from "./examples/do-dont-image.vue"
import DoDontText from "./examples/do-dont-text.vue"
import Media from "./examples/media.vue"
import Text from "./examples/text.vue"

export default {
    name: "Guidance",
    props: {
        guidance: Object
    },
    methods: {
        getExample(acf_fc_layout) {
            switch (acf_fc_layout) {
                case 'code':
                    return Code
                    break;
                case 'do_dont_image':
                    return DoDontImage
                    break;
                case 'do_dont_text':
                    return DoDontText
                    break;
                case 'do_dont_image':
                    return DoDontImage
                    break;
                case 'media':
                    return Media
                    break;
                default:
                    return Text;
                    break;
            }
        }
    },
}
</script>
<style scoped>
h2 {
    color: #63666A;
}
</style>