<template>
  <big-dialog
    v-model="show"
    title="Identifier"
    :id="newhistoryId"
    :horizontal="false"
  >
    <div class="w-full">
      <div class="float-left">
        <img class="mr-2" v-if="orgInfo.image" :src="orgInfo.image" />
        <avatar class="mr-2" v-else :src="localSrc" />
      </div>
      <div class="block float-right">
        <p class="text-sm">{{ orgInfo.name }}</p>
        <p class="text-sm" v-if="orgInfo.address">{{ orgInfo.address }}</p>
        <p class="text-sm" v-else>N/A</p>
        <p class="text-sm" v-if="orgInfo.phone">{{ orgInfo.phone }}</p>
        <p class="text-sm" v-else>N/A</p>
        <p class="text-sm" v-if="orgInfo.email">{{ orgInfo.email }}</p>
        <p class="text-sm" v-else>N/A</p>
      </div>
    </div>

    <div class="w-full mt-32 border-dashed border-gray-300 pb-6 border-b-2">
      <p class="font-bold text-black">{{ payload.name }}</p>
      <div class="grid grid-cols-2 gap-4">
        <div class="mt-4">
          <div class="mb-2">
            <p>Status</p>
            <span class="text-danger text-xs">{{ payload.status }}</span>
          </div>
          <div class="mb-2">
            <p>Date</p>
            <span class="text-gray-400 text-xs">{{
              new Date(payload.effectivePeriod.start).toLocaleDateString()
            }}</span>
          </div>
          <div class="mb-2">
            <p>Last Review Date</p>
            <span class="text-gray-400 text-xs">{{
              new Date(payload.effectivePeriod.end).toLocaleDateString()
            }}</span>
          </div>
        </div>
        <div class="mt-4">
          <div class="mb-2">
            <p>Publisher</p>
            <span class="text-gray-400 text-xs" v-if="authPractitioner">{{
              authPractitioner.firstName + " " + authPractitioner.lastName
            }}</span>
            <span class="text-gray-400 text-xs" v-else>N/A</span>
          </div>
          <div class="mb-2">
            <p>Contact</p>
            <span class="text-gray-400 text-xs" v-if="authPractitioner">{{
              authPractitioner.phone.dialCode +
              " " +
              authPractitioner.phone.number
            }}</span>
            <span class="text-gray-400 text-xs" v-else>N/A</span>
          </div>
          <div class="mb-2">
            <p>Approval Date</p>
            <span class="text-gray-400 text-xs">{{
              payload.approvalDate
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-for="(input, id) in sectionsPayload" :key="`${id}`">
        <div v-for="(newinput, index) in input.items[1]" :key="`${index}`">
          <accordion-component
            class="capitalize"
            :title="newinput.prefix + ' ' + newinput.text"
            :opened="true"
          >
            <template v-slot:default>
              <div
                v-for="(anewinput, index) in newinput.items[index]"
                :key="`${index}`"
              >
                <div class="mt-5" v-if="anewinput.answerType == 'openChoice'">
                  <p class="text-black font-semibold text-sm mb-5">
                    {{ anewinput.prefix + " " + anewinput.text }}
                  </p>
                  <div
                    v-for="(bnewinput, index) in anewinput.answerOptions"
                    :key="`${index}`"
                  >
                    <div class="mb-4">
                      <select-option :label="bnewinput" />
                    </div>
                  </div>
                </div>
                <div class="mt-5" v-if="anewinput.answerType == 'choice'">
                  <p class="text-black font-semibold text-sm mb-5">
                    {{ anewinput.prefix + " " + anewinput.text }}
                  </p>
                  <div
                    v-for="(bnewinput, index) in anewinput.answerOptions"
                    :key="`${index}`"
                  >
                    <div class="mb-4">
                      <cornie-radio
                        :label="bnewinput"
                        class="mb-3"
                        name="question"
                      />
                    </div>
                  </div>
                </div>
                <div class="mt-5" v-if="anewinput.answerType == 'text'">
                  <p class="text-black font-semibold text-sm mb-5">
                    {{ anewinput.prefix + " " + anewinput.text }}
                  </p>
                  <p class="text-sm">
                    {{ anewinput.answerOptions }}
                  </p>
                </div>
              </div>
              <div class="border-b-2 border-gray-100"></div>
              <div
                class="mt-5 pb-4"
                v-for="(anewinput, index) in newinput.items[1]"
                :key="`${index}`"
              >
                <cornie-textarea
                  :label="anewinput.display"
                  class="w-full"
                  placeholder="Start Typing"
                />
              </div>
            </template>
          </accordion-component>
        </div>
      </div>
      <div v-for="(input, id) in sectionsPayload" :key="`${id}`">
        <div v-for="(newinput, index) in input.items[0]" :key="`${index}`">
          <div class="mt-5" v-if="newinput.answerType == 'openChoice'">
            <p class="text-black font-semibold text-sm mb-5">
              {{ newinput.prefix + " " + newinput.text }}
            </p>
            <div
              v-for="(bnewinput, index) in newinput.answerOptions"
              :key="`${index}`"
            >
              <div class="mb-4">
                <select-option :label="bnewinput" />
              </div>
            </div>
          </div>
          <div class="mt-5" v-if="newinput.answerType == 'choice'">
            <p class="text-black font-semibold text-sm mb-5">
              {{ newinput.prefix + " " + newinput.text }}
            </p>
            <div
              v-for="(bnewinput, index) in newinput.answerOptions"
              :key="`${index}`"
            >
              <div class="mb-4">
                <cornie-radio :label="bnewinput" class="mb-3" name="question" />
              </div>
            </div>
          </div>
          <div class="mt-5" v-if="newinput.answerType == 'text'">
            <p class="text-black font-semibold text-sm mb-5">
              {{ newinput.prefix + " " + newinput.text }}
            </p>
            <p class="text-sm">
              {{ newinput.answerOptions }}
            </p>
          </div>
        </div>
      </div>
      <div v-for="(input, id) in sectionsPayload" :key="`${id}`">
        <div v-for="(newinput, index) in input.items[2]" :key="`${index}`">
          <cornie-textarea
            :label="newinput.display"
            class="w-full"
            placeholder="Start Typing"
          />
        </div>
      </div>
    </div>

    <template #actions>
      <span class="flex justify-end">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 mr-3 pl-4 pr-4 rounded-xl text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          :loading="loading"
          type="submit"
          @click="submit"
          class="text-white bg-danger pl-4 pr-4 px-6 rounded-xl mr-4"
        >
          Save
        </cornie-btn>
      </span>
    </template>
  </big-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import Avatar from "@/components/avatar.vue";
import CornieNuminput from "@/components/cornienuminput.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import BigDialog from "@/components/formdialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieTextarea from "@/components/textarea.vue";
import CornieSelect from "@/components/autocomplete.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import { namespace } from "vuex-class";
import IPractitioner from "@/types/IPractitioner";
import PlusIcon from "@/components/icons/plus.vue";
import SelectOption from "@/components/custom-checkbox.vue";

const userStore = namespace("user");

@Options({
  name: "viewForm",
  components: {
    ...CornieCard,
    CornieIconBtn,
    CancelIcon,
    CornieTextarea,
    PlusIcon,
    ArrowLeftIcon,
    Avatar,
    InfoIcon,
    BigDialog,
    CornieNuminput,
    AccordionComponent,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
    SelectOption,
    MainCornieSelect,
  },
})
export default class ViewForm extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Array, default: [] })
  payload!: object;

  @Prop({ type: Array, default: [] })
  sectionsPayload!: object;

  @userStore.Getter
  authPractitioner!: IPractitioner;

  localSrc = require("../../../../assets/img/placeholder.png");
  orgInfo = [];
  loading = false;

  async fetchOrgInfo() {
    try {
      const response = await cornieClient().get(
        "/api/v1/organization/myOrg/get"
      );
      this.orgInfo = response.data || {};
    } catch (error) {
      window.notify({ msg: "Could not fetch organization", status: "error" });
    }
  }
  async submit() {
    this.loading = true;
    this.createPracticeform();
    this.loading = false;
  }
  async createPracticeform() {
    try {
      const response = await cornieClient().post(
        "/api/v1/practice-form",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Practice form created", status: "success" });
        this.$router.push(
          "/dashboard/provider/settings/practise-management/forms-questionnaires"
        );
      } else {
        window.notify({ msg: response.errors!.summary, status: "error" });
        // this.$router.push("/dashboard/provider/settings/practice-templates");
      }
    } catch (error) {
      window.notify({ msg: "Practice form not created", status: "error" });
      // this.$router.push("/dashboard/provider/settings/practice-templates");
    }
  }

  async created() {
    this.fetchOrgInfo();
  }
}
</script>

<style></style>
