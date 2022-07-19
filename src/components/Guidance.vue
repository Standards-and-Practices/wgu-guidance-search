<template>
    <div>
        <h2 :style="{'border-left-color' : color }" class="font-bold text-base border-l-4 -mx-10 mt-1 px-10 pt-3">{{ guidance.guidanceStatement }}</h2>
        <div :style="{'border-left-color' : colorFaded }" class="border-l-4 border-dashed -mx-10 px-10">{{ guidance.guidanceRationale }}</div>
        <component 
            :is="getExample(example.__typename)" 
            v-for="(example, index) in guidance.guidanceExamples" 
            :key="index" 
            :example="example"
            class="border-l-4 border-dashed -mx-10 px-10"
            :style="{'border-left-color' : colorFaded }"
        ></component>
    </div>
</template>

<script>
import Code from "./examples/code.vue"
import DoDontImage from "./examples/do-dont-image.vue"
import DoDontText from "./examples/do-dont-text.vue"
import Media from "./examples/media.vue"
import Text from "./examples/text.vue"
import InfoBlock from "./examples/info-block.vue"

export default {
    name: "Guidance",
    props: {
        guidance: Object,
        color: String,
        colorFaded: String,
    },
    methods: {
        getExample(acf_fc_layout) {
            switch (acf_fc_layout) {
                case 'Standard_Guidance_guidance_GuidanceExamples_Code':
                    return Code
                    break;
                case 'Standard_Guidance_guidance_GuidanceExamples_DoDontImage':
                    return DoDontImage
                    break;
                case 'Standard_Guidance_guidance_GuidanceExamples_DoDontText':
                    return DoDontText
                    break;
                case 'Standard_Guidance_guidance_GuidanceExamples_Media':
                    return Media
                    break;
                case 'Standard_Guidance_guidance_GuidanceExamples_Text':
                    return Text
                    break;
                case 'Standard_Guidance_guidance_GuidanceExamples_InfoBlock':
                    return InfoBlock
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