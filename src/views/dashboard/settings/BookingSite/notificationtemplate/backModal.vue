<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="25%" class="flex flex-col">
      
      <cornie-card-title  class="w-full">
          <div class="w-full flex space-x-4">
              <div class=" border-r-2 border-gray-200">

             <arrow-left-icon class="cursor-pointer mr-2"  @click="show = false"/>
              </div>
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">Back</h2>
            <cancel-icon class="float-right cursor-pointer" @click="show = false"/>
          </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
          <div class="w-full">
                <p class="text-sm text-black">
                Thank you for the feedback. If you would love to reschedule this appointment, visit (practise booking site)
                </p>
          </div>
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { Vue, Options } from "vue-class-component";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CheckIcon from "@/components/icons/authcheck.vue";


@Options({
  name: "accountmodal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CheckIcon,
    CornieDialog,
    Textarea,
    CornieBtn,
  },
})
export default class backModal extends Vue {
@PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  async created() {
 
  }
}
</script>

<style>

.bg-gray {
    background-color: #F6F8F9;
}
.icon-wrap {
   content:counter(step);
  counter-increment: step;
    background: #fff;
    border-radius: 50%;
        top: -0.3em;
    z-index: 1;
    color: #fff;
    border: 2px solid #FE4D3C;
    display: block;
    height: 1.4em;
    margin: 0 auto -0.6em;
   left: -54em;
    right: 0;
    position: absolute;
    width: 1.4em;
}
.icon-wrap2 {
    background: #fff;
    border-radius: 50%;
    top: -0.3em;
    z-index: 1;
    color: #fff;
    border: 2px solid #FE4D3C;
    display: block;
    height: 1.4em;
    margin: 0 auto -0.6em;
    left: -7.5em;
    right: 0;
    position: absolute;
    width: 1.4em;
}
.icon-wrap3 {
    background: #fff;
    border-radius: 50%;
    top: -0.3em;
    z-index: -1;
    color: #fff;
    border: 2px solid #FE4D3C;
    display: block;
    height: 1.4em;
    margin: 0 auto -0.6em;
    left: 52em;
    right: 0;
    position: absolute;
    width: 1.4em;
}
.icon-wrap4 {
    background: #fff;
    border-radius: 50%;
    top: -0.3em;
    z-index: 1;
    color: #fff;
    border: 2px solid #FE4D3C;
    display: block;
    height: 1.4em;
    margin: 0 auto -0.6em;
    left: 42em;
    right: 0;
    position: absolute;
    width: 1.4em;
}
 .icon-check-mark{
    top: 1.3em;
    z-index: 1;
    left: 5em;
    right: 0;
    position: absolute;
}
.icon-check-mark2{
       top: 1.3em;
    z-index: 1;
    left: 23em;
    right: 0;
    position: absolute;
}
.icon-check-mark3{
      top: 1.3em;
    z-index: 1;
    left: 45.5em;
    right: 0;
    position: absolute;
}
.bg-danger-100{
    background-color: #FE4D3C;
}
</style>
