<template>
    <div>
        <h2 :style="{ 'border-left-color': color }" class="font-bold text-base border-l-4 -mx-10 px-10 pt-3">{{ guidance.guidanceStatement }}</h2>
        <div :style="{ 'border-left-color': colorFaded }" class="border-l-4 border-dashed -mx-10 px-10">
            <span v-html="guidance.guidanceRationale"></span>
            <component :is="getExample(example.__typename)" v-for="(example, index) in guidance.guidanceExamples" :key="index" :example="example" class="-mx-10 px-10" :style="{ 'border-left-color': colorFaded }"></component>
        </div>
    </div>
</template>

<script>
import Code from "./examples/Code.vue"
import DoDontImage from "./examples/DoDontImage.vue"
import DoDontText from "./examples/DoDontText.vue"
import Media from "./examples/Media.vue"
import Text from "./examples/Text.vue"
import InfoText from "./examples/InfoText.vue"
import InfoImage from "./examples/InfoImage.vue"

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
                    return InfoText
                    break;
                case 'Standard_Guidance_guidance_GuidanceExamples_InfoImage':
                    return InfoImage
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