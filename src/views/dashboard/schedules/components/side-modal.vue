<template>
  <Modal :visible="visible">
    <div class="modal-con p-2" :style="{ width: width + 'px' }">
      <div class="container-fluid">
        <div class="w-full px-3 flex items-center justify-between">
          <h5 class="flex items-center py-3">
            <span class="font-bold flex items-center cursor-pointer" @click="close"
              ><ArrowLeft class="mr-3" /> <span class="text-gray-500"></span
            ></span>
            <p class="mx-3 font-semibold text-lg header">
              <span>{{ header ? header : "Edit Slot" }}</span>
            </p>
          </h5>
          <span class="cursor-pointer" @click="() => $emit('closesidemodal')"
            ><close-icon
          /></span>
        </div>
        <div class="w-full">
          <slot />
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CloseIcon from "@/components/icons/close.vue";
import Modal from "@/components/modal.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { Modal, ArrowLeft, CloseIcon },

  props: ["visible", "header", "width"],

  setup(props, { emit }) {
    const close = () => {
      emit("closesidemodal");
    };

    return {
      close,
    };
  },
});
</script>

<style scoped>
.modal-con {
  width: 430px;
  height: 100vh;
  overflow: scroll;
  background: #fff;
  position: absolute;
  right: 0;
  top: 0;
}

.header {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 34px;
  color: #080056;
}
</style>
