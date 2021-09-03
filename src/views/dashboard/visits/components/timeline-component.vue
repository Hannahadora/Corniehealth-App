<template>
    <div class="w-full md">
        <div class="w-full" style="max-height: 90vh;overflow-y:scroll">
            <div class="md w-4/12 px-4" style="width: 440px" v-for="(item, index) in timeline" :key="index">
                <div class="md w-full">
                <div class="md w-full">
                    <span class="md font-weight-light">{{ item.action }}</span>
                    <span class="md font-weight-light italic text-xs text-gray-400 mx-3">{{ new Date(item.createdAt).toDateString()}}</span>
                    <span class="md font-weight-light text-lg" style="color: #114FF5">Open</span>
                </div>
                <div class="md w-full my-2" style="height: 50px;border-left: 1px dashed #878E99;" v-if="index !== timeline.length - 1">

                </div>
                
                </div>
            </div>

            <div class="w-full pb-5 md">
                <div class="container flex justify-end md">
                <a @click="() => $emit('closetimeline')" class=" mdcursor-pointer bg-white focus:outline-none text-gray-500 border mr-6 font-bold py-3 px-8 rounded-full">
                    Close
                </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";


@Options({
  components: {
      
  },
})
export default class CheckIn extends Vue {
    @Prop()
    timeline!: string;

}
</script>