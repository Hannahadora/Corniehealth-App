<template>
  <div class="">
    <modal :visible="visible">
      <div
        class="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
            >&#8203;</span
          >
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full"
          >
            <div class="bg-white px-2 pt-3 pb-2 sm:p-3 sm:pb-2">
              <div>
                <div class="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    class="text-lg leading-6 text-primary font-medium"
                    id="modal-title"
                  >
                    Add a Member
                  </h3>
                  <div class="mt-5">
                    <div class="mb-5">
                      <cornie-select
                        :rules="required"
                        :items="['Active', 'Inactive']"
                        v-model="type"
                        label="Type"
                        placeholder="--Select--"
                      >
                      </cornie-select>
                    </div>
                    <cornie-input
                      label="Name"
                      class="mb-3"
                      placeholder="--Input--"
                      v-model="name"
                    />
                  </div>
                </div>
                <close-icon
                  class="items-end absolute right-5 top-5 cursor-pointer"
                  @click="show = false"
                />
              </div>
            </div>
            <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <cornie-btn
                @click="addmember"
                :loading="loading"
                class="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-danger text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                type="submit"
              >
                Add
              </cornie-btn>
              <button
                @click="show = false"
                type="button"
                class="mt-3 w-full inline-flex justify-center shadow-sm px-4 py-2 text-base font-medium text-primary focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script lang="ts">
import Modal from "@/components/modal.vue";
import { Prop, PropSync } from "vue-property-decorator";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { cornieClient } from "@/plugins/http";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "memberModal",
  components: {
    Modal,
    CornieInput,
    CornieSelect,
    ArrowLeftIcon,
    CloseIcon,
    EyeIcon,
    DeleteIcon,
  },
})
export default class memberModal extends Vue {
  @Prop({ type: Boolean, required: true, default: false })
  visible!: boolean;

  @Prop({ type: String, default: "" })
  paymentId!: string;

  @PropSync("visible", { type: Boolean, required: true, default: false })
  show!: boolean;

  loading = false;
  type = "";
  name = "";
  groupId = "";

  get classes() {
    return this.show ? ["flex"] : ["hidden"];
  }
  get payload() {
    return {
      groupId: this.paymentId,
      type: this.type,
      name: this.name,
    };
  }

  async addmember() {
    this.loading = true;
    try {
      const response = await cornieClient().post(
        "/api/v1/groupMembers/",
        this.payload
      );
      if (response.success) {
        this.loading = false;
        window.notify({ msg: "Member added", status: "success" });
        this.show = false;
      } else {
        window.notify({ msg: response.errors!.summary, status: "error" });
        this.show = false;
      }
    } catch (error) {
      this.loading = false;
      window.notify({ msg: "Member not added", status: "error" });
      this.show = false;
    }
  }
}
</script>
