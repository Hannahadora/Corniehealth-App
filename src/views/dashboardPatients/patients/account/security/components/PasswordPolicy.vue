<template>
  <cornie-dialog v-model="show" center class="md:w-1/4 w-2/2 h-auto">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll py-6"
    >
      <cornie-card-title class="flex items-center">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Password Strength
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="mt-4">
        <p class="pb-4 text-sm">All passwords must satisfy these requirements. Passwords Must have:</p>

        <ul class="py-4 px-2 border-b border-t border-gray-200 list-disc">
          <li class="mb-4">Must have at least 1 upper case</li>
          <li class="mb-4">Must have at least 1 lower case</li>
          <li class="mb-4">Must have at least 1 number</li>
          <li class="mb-4">Must have at least 1 special character or symbol</li>
          <li class="mb-4">Must have at least 8 characters</li>
        </ul>
        
        <div class="mt-4 flex items-center justify-end">
          <cornie-btn
          class="xl:w-auto w-full bg-red-500 px-6 py-1 text-white rounded-xl"
          @click="show = false"
        >
          Ok
        </cornie-btn>
        </div>
    </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { CornieUser } from "@/types/user";

import moment from "moment";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import IconBtn from "@/components/CornieIconBtn.vue";

const account = namespace("user");

@Options({
  components: {
    CornieDialog,
    CornieSelect,
    CornieBtn,
    CancelRedBg,
    ArrowLeft,
    IconBtn,
  },
})
export default class DoctorsPage extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;
  loading: Boolean = false;

  async created() {}
}
</script>

<style scoped>
img {
  filter: brightness(8.5);
}

.text-grey-blue {
  color: #667499;
}
.info-container {
  background: #ffffff;
  border: 0.2px solid #c2c7d6;
  box-sizing: border-box;
  box-shadow: 0px 15px 40px rgba(20, 23, 31, 0.08);
  border-radius: 16px;
}

.text-grey-eth {
  color: #c2c7d6;
}


</style>
