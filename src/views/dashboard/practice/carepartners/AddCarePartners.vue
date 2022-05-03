<template>
  <cornie-dialog
    v-model="show"
    right
    class="w-3/12 h-full"
  >
    <cornie-card height="100%" class="flex flex-col animated fadeInUp">
      <cornie-card-title class="w-full p-3">
        <cornie-icon-btn @click="$emit('close-added-diag')">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Added Care Partners
          </h2>
        </div>
      </cornie-card-title>
      <cornie-card-text
        class="flex-grow scrollable flex flex-col overflow-y-hidden"
      >
        <div class="text-xs text-gray-400 mb-5">
          {{ addedCarePartners.length }} Added
        </div>
        <div
          class="p-2 flex flex-col overflow-y-auto flex-1 border border-gray-200 rounded-sm mb-14"
        >
          <template v-if="addedCarePartners.length">
            <div
              v-for="(partner, index) in addedCarePartners"
              :key="partner.id"
              class="border-gray-200 flex justify-between py-2 px-3"
              :class="index !== addedCarePartners.length - 1 ? 'border-b' : ''"
            >
              <div class="flex flex-col flex-1">
                <div class="text-gray-600 text-md">{{ partner.name }}</div>
                <div class="text-gray-400 text-sm">{{ partner.address }}</div>
              </div>
              <div class="flex flex-row">
                <button
                  class="mr-10"
                  type="button"
                  @click="$emit('edit-added-partner', { index, partner })"
                >
                  <edit-icon />
                </button>
                <button
                  type="button"
                  @click="
                    $emit('delete-added-partner', { index, id: partner.id })
                  "
                >
                  <delete-icon />
                </button>
              </div>
            </div>
          </template>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="outline-primary rounded-md text-black mr-3 py-2 pr-8 pl-8 px-3 focus:outline-none hover:bg-primary hover:text-white border-primary border-2"
            @click="$emit('close-added-diag')"
          >
            Close
          </button>
        </div>
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieInput from "@/components/cornieinput.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import ICarePartner from "@/types/ICarePartner";
import EditIcon from "@/components/icons/edit-purple.vue";
import DeleteIcon from "@/components/icons/delete-red.vue";

import { namespace } from "vuex-class";

const carePartners = namespace("CarePartnersStore");
const dropdown = namespace("dropdown");

@Options({
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    CornieInput,
    CloseIcon,
    EditIcon,
    DeleteIcon,
  },
  emits: ["edit-added-partner", "delete-added-partner"],
})
export default class AddCarePartner extends Vue {
  @Prop({ type: Boolean, default: false })
  visible!: boolean;

  @PropSync("visible")
  show!: boolean;

  @Prop({ type: Array, default: [] })
  addedCarePartners!: ICarePartner[];

  @Watch("visible")
  handleShow() {
    this.show = this.visible;
  }
}
</script>
