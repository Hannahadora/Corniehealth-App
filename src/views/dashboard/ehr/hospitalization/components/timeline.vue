<template>
  <div class="container-fluid">
    <div class="w-full mb-4">
      <p class="header flex justify-between">
        <span>Timeline</span>
        <span class="cursor-pointer" @click="() => $emit('closesidemodal')"
          ><close-icon
        /></span>
      </p>
    </div>
    <div class="w-full border-l-4">
      <div class="w-full" style="width: 522px">
        <div class="w-full flex items-start -ml-7 my-4">
          <div class="flex items-center justify-center" style="width: 10%">
            <div class="grey-circle"></div>
          </div>
          <div class="-mt-1" style="width: 90%">
            <p class="flex justify-between items-center">
              <span class="text-danger">Admitted</span>
              <span>21/02/2021</span>
            </p>
            <p class="flex flex-col">
              <span class="">Dr. Ade John</span>
              <span class="text-sm text-gray-400 text-xs">Pathology</span>
            </p>
          </div>
        </div>
        <div class="w-full flex items-start -ml-7 my-4">
          <div class="flex items-center justify-center mt-1" style="width: 10%">
            <div class="grey-circle bg-success"></div>
          </div>
          <div class="" style="width: 90%">
            <p class="flex justify-between items-center">
              <span class="text-danger">Admitted</span>
              <span>21/02/2021</span>
            </p>
            <p class="flex flex-col">
              <span class="">Dr. Ade John</span>
              <span class="text-sm text-gray-400 text-xs">Pathology</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full flex justify-end mt-4">
      <CornieBtn
        @click="$emit('closesidemodal')"
        class="bg-danger p-2 rounded-full px-8 mx-2 cursor-pointer"
      >
        <span class="text-white font-semibold">Close</span>
      </CornieBtn>
    </div>
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import CloseIcon from "@/components/icons/CloseIcon.vue";

@Options({
  components: {
    CloseIcon,
  },
})
export default class TimeLine extends Vue {}
</script>

<style scoped>
.grey-circle {
  width: 20px;
  height: 20px;
  background: #c2c7d6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  /* identical to box height, or 140% */

  /* Primary/Indigo Dye */

  color: #080056;
}

.bg-success {
  background: #35ba83;
}
</style>
