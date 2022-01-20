<template>
  <div class="container-fluid">
    <div class="container-fluid w-full flex items-center justify-between">
      <div class="border-b-2 w-11/12"></div>
      <div
        class="bg-primary border text-white w-1/11 p-1 rounded-full flex items-center justify-center text-xl font-bold cursor-pointer"
        style="height: 24px; width: 24px"
        @click="closeSection"
      >
        ×
      </div>
    </div>

    <div class="container-fluid">
      <div class="w-full flex py-4 border-dashed-b-2 mb-4">
        <ToggleCheck
          :uncheckedText="`Disabled`"
          :checkedText="'Enabled'"
          style="margin-left: 1rem"
        />
      </div>

      <div class="w-full flex py-4">
        <h2 class="mb-2 font-semibold text-lg">Questions & Answeers</h2>
      </div>

      <div class="w-full py-4">
        <div class="question p-1 w-full">
          <p>
            Question 1: What is the name of your best teacher in primary school?
          </p>
        </div>
        <div class="answer p-2 w-full">
          <p>Question</p>
        </div>
      </div>

      <div class="w-full">
        <div class="container-fluid">
          <Dropdown :items="[1, 2, 3, 4, 5]" />
          <div class="w-full">
            <CornieInput placeholder="Answer here" />
          </div>
        </div>
      </div>

      <div class="w-full">
        <div class="container-fluid my-4">
          <a class="text-primary font-bold py-4">Add Question</a>
        </div>
      </div>

      <div class="w-full mt-6 mb-2 flex justify-end">
        <Button :loading="false" class="focus:outline-none">
          <span
            style="background: #fe4d3c"
            class="text-white-500 curved border cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full"
          >
            Save
          </span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ToggleCheck from "@/components/ToogleCheck.vue";
import CornieInput from "@/components/cornieinput.vue";
import Dropdown from "@/components/cornieselect.vue";

@Options({
  components: {
    ToggleCheck,
    CornieInput,
    Dropdown,
  },
})
export default class TwoFA extends Vue {
  closeSection() {
    this.$emit("closesection", "");
  }
}
</script>

<style scoped>
.border-dashed-b-2 {
  border-bottom: 1px dashed #c5c4d4;
}

.question {
  background: #f5f4fa;
  border-radius: 4px;
}

.answer {
  background: #ffffff;
  /* Whites/Cotton_Ball */

  border: 1px solid #f5f4fa;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
