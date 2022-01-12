<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-4/6">
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <span class="pr-2 flex items-center cursor-pointer border-r-2">
              <cornie-icon-btn @click="show = false">
                <arrow-left-icon />
              </cornie-icon-btn>
            </span>

            <h2 class="font-bold text-lg text-primary ml-3 -mt-0.5">
              Update Location
            </h2>

          </div>
          <cancel-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="overflow-y-auto">
          <div class="mb-5 w-full h-full pb-32">
                <span class="text-sm font-semibold mb-2">Approved Locations</span>
                <Multiselect
                    v-model="locations"
                    mode="tags"
                    :hide-selected="false"
                    :close-on-select="true"
                    id="field-id"
                    :options="allLocation"
                    value-prop="code"
                    label="label"
                    :before="'Approved Location'"
                    placeholder="--Select--"
                    class="w-full"
                >
                <template v-slot:tag="{ option, handleTagRemove, disabled }">
                <div class="multiselect-tag is-user">
                    {{ option.display }}
                    <span
                    v-if="!disabled"
                    class="multiselect-tag-remove"
                    @mousedown.prevent="handleTagRemove(option, $event)"
                    >
                    <span class="multiselect-tag-remove-icon"></span>
                    </span>
                </div>
                </template>
                <template v-slot:option="{ option }">
                <span class="w-full text-sm">{{ option.display }}</span>
                </template>
                </Multiselect>
            </div>
      </cornie-card-text>
      <div class="flex justify-end mx-4 mt-auto mb-4">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-5 mr-4 rounded-full text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn :loading="loading" @click="apply" class="text-white bg-danger  px-4 rounded-full">
          Update
        </cornie-btn>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import UpdateIcon from "@/components/icons/blueupdate.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CheckIcon from "@/components/icons/authcheck.vue";
import { cornieClient } from "@/plugins/http";
import Multiselect from "@vueform/multiselect";
import DEdit from "@/components/icons/aedit.vue";
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import CDelete from "@/components/icons/adelete.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import BluecheckIcon from "@/components/icons/bluecheck.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";


import { string } from "yup";


@Options({
  name: "statusDialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    Multiselect,
    CDelete,
    UpdateIcon,
    DeleteorangeIcon,
    CheckIcon,
    BluecheckIcon,
    DEdit,
    CancelIcon,
    InfoIcon,
    CornieDialog,
    SearchIcon,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
    MainCornieSelect,
  },
})
export default class Medication extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  updatedBy!: string;

  @Prop({ type: String, default: "" })
  currentStatus!: string;

  @Prop({ type: String, default: "" })
  updateDate!: string;

  status = "";
  loading = false;
  expand = false;
  isVisible = "";
  location = [];
  locations = [];

  active = "clinical";

  required = string().required();

  async updateLocation() {
    const id = this.id;
    const url = `/api/v1/practitioner/authorize-locations/${id}`;

    try {
      const response = await cornieClient().patch(url, this.locations);
      if (response.success) {
        window.notify({ msg: "Approved Locations Updated", status: "success" });
        this.done();
      }
    } catch (error) {
      window.notify({ msg: "Approved Locations Not Updated", status: "error" });
    }
  }

  done() {
    this.$emit("location-update");
    this.show = false;
  }
  async apply() {
    this.loading = true;
    await this.updateLocation();
    this.loading = false;
  }
  get allLocation() {
    if (!this.location || this.location.length === 0) return [];
    return this.location.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }
 
  async fetchLocation() {
    const AllLocation = cornieClient().get(
      "/api/v1/location/myOrg/getMyOrgLocations"
    );
    const response = await Promise.all([AllLocation]);
    this.location = response[0].data;
  }

  async created() {
      await this.fetchLocation();
  }
}
</script>

<style scoped>
.multiselect-option.is-selected {
    background: #fe4d3c;
    color: var(--ms-option-color-selected,#fff);
}
.multiselect-option.is-selected.is-pointed {
    background: var(--ms-option-bg-selected-pointed,#fe4d3c);
    color: var(--ms-option-color-selected-pointed,#fff);
}
.multiselect-option.is-selected {
    background: var(--ms-option-bg-selected,#fe4d3c);
    color: var(--ms-option-color-selected,#fff);
}

.multiselect {
    position: relative;
    margin: 0 auto;
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    cursor: pointer;
    outline: none;
    border: var(--ms-border-width, 1px) solid var(--ms-border-color, #d1d5db);
    border-radius: var(--ms-radius, 4px);
    background: var(--ms-bg, #fff);
    font-size: var(--ms-font-size, 1rem);
    min-height: calc( var(--ms-border-width, 1px) * 2 + var(--ms-font-size, 1rem) * var(--ms-line-height, 1.375) + var(--ms-py, 0.5rem) * 2);
}

.multiselect-tags {
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-wrap: wrap;
    margin: var(--ms-tag-my, 0.25rem) 0 0;
    padding-left: var(--ms-py, 0.5rem);
    align-items: center;
}

.multiselect-tag.is-user {
    padding: 5px 12px;
    border-radius: 22px;
    background: #080056;
    margin: 3px 3px 8px;
    position: relative;
    left: -10px;
}


/* .multiselect-clear-icon {
      -webkit-mask-image: url("/components/icons/chevrondownprimary.vue");
      mask-image: url("/components/icons/chevrondownprimary.vue");
      background-color: #080056;
      display: inline-block;
      transition: .3s;
  } */

.multiselect-placeholder {
    font-size: 0.8em;
    font-weight: 400;
    font-style: italic;
    color: #667499;
}

.multiselect-caret {
    transform: rotate(0deg);
    transition: transform 0.3s;
    -webkit-mask-image: url("../../../../assets/img/Chevron.png");
    mask-image: url("../../../../assets/img/Chevron.png");
    background-color: #080056;
    margin: 0 var(--ms-px, 0.875rem) 0 0;
    position: relative;
    z-index: 10;
    flex-shrink: 0;
    flex-grow: 0;
    pointer-events: none;
}

.multiselect-tag.is-user img {
    width: 18px;
    border-radius: 50%;
    height: 18px;
    margin-right: 8px;
    border: 2px solid #ffffffbf;
}

.multiselect-tag.is-user i:before {
    color: #ffffff;
    border-radius: 50%;
}

.multiselect-tag-remove {
    display: flex;
    align-items: center;
    /* border: 1px solid #fff;
    background: #fff; */
    border-radius: 50%;
    color: #fff;
    justify-content: center;
    padding: 0.77px;
    margin: var(--ms-tag-remove-my, 0) var(--ms-tag-remove-mx, 0.5rem);
}

.bg-gray {
  background-color: #f6f8f9;
}
.icon-wrap {
  content: counter(step);
  counter-increment: step;
  background: #fff;
  border-radius: 50%;
  top: -0.3em;
  z-index: 1;
  color: #fff;
  border: 2px solid #fe4d3c;
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
  border: 2px solid #fe4d3c;
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
  border: 2px solid #fe4d3c;
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
  border: 2px solid #fe4d3c;
  display: block;
  height: 1.4em;
  margin: 0 auto -0.6em;
  left: 42em;
  right: 0;
  position: absolute;
  width: 1.4em;
}
.icon-check-mark {
  top: 1.3em;
  z-index: 1;
  left: 5em;
  right: 0;
  position: absolute;
}
.icon-check-mark2 {
  top: 1.3em;
  z-index: 1;
  left: 23em;
  right: 0;
  position: absolute;
}
.icon-check-mark3 {
  top: 1.3em;
  z-index: 1;
  left: 45.5em;
  right: 0;
  position: absolute;
}
.bg-danger-100 {
  background-color: #fe4d3c;
}
</style>
