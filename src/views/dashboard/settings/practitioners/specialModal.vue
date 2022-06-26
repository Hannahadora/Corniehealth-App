<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Specialty
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
          <div
            class="border-b-2 w-full border-dashed pb-2 mb-5 border-gray-300"
          >
            <span class="text-dark text-sm font-medium">Select Specialty</span>
          </div>
          <div>
            <span class="text-sm font-semibold mb-1">Specialty</span>
            <Multiselect
              v-model="specialties"
              mode="multiple"
              value="code"
              :searchable="true"
              :options="allSpecials"
              :clear-on-select="false"
              label-prop="display"
              value-prop="code"
              trackBy="code"
              label="code"
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
                <select-option :value="option.code" @click="set" />
                <span class="w-full text-sm">{{ option.display }}</span>
              </template>
            </Multiselect>
          </div>
          <div v-if="id">
            <div
              class="w-full -mb-12"
              v-for="(item, index) in specialspecialties"
              :key="index"
            >
              <accordion-component
                class="-mb-8"
                :title="item.name"
                :addborder="true"
                :opened="true"
              >
                <div class="w-full mb-8">
                  <p class="text-sm text-center font-bold mt-5">
                    Start by adding services you render for {{ item.name }}
                  </p>
                  <div class="flex justify-center mt-5">
                    <span
                      class="text-danger font-semibold text-sm cursor-pointer"
                      @click="showService(item)"
                    >
                      <span class="text-lg">+</span> Add services
                    </span>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4 w-full mt-8 justify-center">
                  <span v-for="(input, index) in specialservices" :key="index">
                    <select-option
                      :label="getServiceName(input)"
                      :checked="true"
                    />
                  </span>
                </div>
              </accordion-component>
            </div>
          </div>
          <div>
            <div v-if="specialties.length > 0">
              <div
                class="w-full -mb-12"
                v-for="(item, index) in specialties"
                :key="index"
              >
                <accordion-component
                  class="-mb-8"
                  :title="getSpecialityName(item)"
                  :addborder="true"
                  :opened="true"
                >
                  <div class="w-full mb-8">
                    <div class="flex justify-center">
                      <circle-icon />
                    </div>
                    <p class="text-sm text-center font-bold mt-5">
                      Start by adding services you render for
                      {{ getSpecialityName(item) }}
                    </p>
                    <div class="flex justify-center mt-5">
                      <span
                        class="text-danger font-semibold text-sm cursor-pointer"
                        @click="showService(item)"
                      >
                        <span class="text-lg">+</span> Add services
                      </span>
                    </div>
                  </div>
                  <div
                    class="grid grid-cols-2 gap-4 w-full mt-8 justify-center"
                  >
                    <span
                      v-for="(input, index) in specialservices"
                      :key="index"
                    >
                      <select-option
                        :label="getServiceName(input)"
                        :checked="true"
                      />
                    </span>
                  </div>
                </accordion-component>
              </div>
            </div>
          </div>
        </v-form>
      </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="apply"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
  <service-modal
    v-model="showAService"
    :name="serviceName"
    @add-services="addservices"
  />
</template>

<script lang="ts">
  import CornieCard from "@/components/cornie-card";
  import CornieBtn from "@/components/CornieBtn.vue";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import SelectOption from "@/components/custom-checkbox.vue";
  import AccordionComponent from "@/components/form-accordion.vue";
  import IconInput from "@/components/IconInput.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import CircleIcon from "@/components/icons/circle.vue";
  import CancelIcon from "@/components/icons/CloseIcon.vue";
  import SearchIcon from "@/components/icons/search.vue";
  import CloseIcon from "@/components/icons/whitecancel.vue";
  import { cornieClient } from "@/plugins/http";
  import ICatalogueService from "@/types/ICatalogue";
  import ILocation from "@/types/ILocation";
  import IPractitioner from "@/types/IPractitioner";
  import ISpecial from "@/types/ISpecial";
  import Multiselect from "@vueform/multiselect";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync, Watch } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import ServiceModal from "./services.vue";

  const catalogue = namespace("catalogues");
  const location = namespace("location");
  const special = namespace("special");
  const practitioner = namespace("practitioner");

  @Options({
    name: "spcialModal",
    components: {
      ...CornieCard,
      CornieIconBtn,
      ArrowLeftIcon,
      CancelIcon,
      SelectOption,
      Multiselect,
      AccordionComponent,
      CornieDialog,
      CircleIcon,
      SearchIcon,
      IconInput,
      CornieBtn,
      CornieSelect,
      CloseIcon,
      ServiceModal,
    },
  })
  export default class SpecialModal extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: String, default: "" })
    id!: string;

    @location.State
    locations!: ILocation[];

    @location.Action
    fetchLocations!: () => Promise<void>;

    @catalogue.State
    services!: ICatalogueService[];

    @catalogue.Action
    getServices!: () => Promise<void>;

    specialservices = [] as any;

    @special.State
    specials!: ISpecial[];

    @special.Action
    fetchSpecials!: () => Promise<void>;

    @practitioner.Action
    getPractitionerById!: (id: string) => Promise<IPractitioner>;

    loading = false;
    specialarray = [] as any;
    special = "";
    showAService = false;
    specialties = [] as any;
    specialspecialties = [] as any;
    serviceName = "";
    add = [];
    remove = [];

    fullName = "";
    dateOfBirth = "";
    nationality = "";
    emailAddress = "";
    phoneNumber = {
      number: "",
      dialCode: "+234",
    };
    taxIdentificationNumber = "";
    identificationDocumentNumber = "";
    practiceLicenseDocument = "";
    uploadedPracticeLicenseDocument = "" as string;
    practiceLicenseNumber = "";
    practiceLicenseDocumentType = "";
    identificationDocumentType = "";
    identificationDocument = "";

    @Watch("id")
    idChanged() {
      this.setPractitioner();
    }

    async setPractitioner() {
      const practitioner = await this.getPractitionerById(this.id);
      if (!practitioner) return;
      this.services = practitioner.services;
      this.specialspecialties = practitioner.specialties;
    }
    get payload() {
      return {
        remove: this.remove,
        add: this.add,
      };
    }

    //  async apply() {
    //   this.loading = true;
    //    await this.saveSpecial();
    //   this.loading = false;
    // }
    async apply() {
      this.loading = true;
      if (this.id) await this.NewSpecialty();
      else await this.saveSpecial();
      this.loading = false;
    }

    get spaciallItems() {
      return {
        text: this.special,
      };
    }
    addArray() {
      if (this.special == "") {
        window.notify({
          msg: "Please input a contact number",
          status: "error",
        });
      } else {
        this.specialarray.push(this.spaciallItems);
      }
    }

    async NewSpecialty() {
      this.payload.add = this.specialties;
      try {
        const response = await cornieClient().patch(
          `/api/v1/practitioner/specialties/${this.id}`,
          this.payload
        );
        if (response.success) {
          this.done();
          window.notify({
            msg: "Specialties added successfully",
            status: "success",
          });
        }
      } catch (error) {
        window.notify({ msg: "Specialties not added", status: "error" });
      }
    }

    async addservices(value: any) {
      this.$emit("add-another-services", value);
      this.specialservices = value;
    }
    getServiceName(id: string) {
      const pt = this.services.find((i: any) => i.id === id);
      return pt ? `${pt.name}` : "";
    }

    getSpecialityName(id: string) {
      const pt = this.specials.find((i: any) => i.id === id);
      return pt ? `${pt.name}` : "";
    }

    showService(value: string) {
      this.showAService = true;
      this.serviceName = this.getSpecialityName(value);
    }
    removearray(index: number) {
      this.specialties.splice(index, 1);
    }
    get newaction() {
      return this.id ? "Update" : "Add";
    }

    async saveSpecial() {
      this.$emit("send-speicality", this.specialties);
      this.show = false;
    }

    get allSpecials() {
      return this.specials.map((i: any) => {
        return {
          code: i.id,
          display: i.name,
        };
      });
    }

    done() {
      this.$emit("save-sepcailty");
      this.show = false;
    }

    created() {
      this.setPractitioner();
      this.getServices();
      this.fetchLocations();
      this.fetchSpecials();
      //this.setImpression();
    }
  }
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
  .multiselect-option.is-selected {
    background: #fe4d3c;
    color: var(--ms-option-color-selected, #fff);
  }
  .multiselect-option.is-selected.is-pointed {
    background: var(--ms-option-bg-selected-pointed, #fe4d3c);
    color: var(--ms-option-color-selected-pointed, #fff);
  }
  .multiselect-option.is-selected {
    background: var(--ms-option-bg-selected, #fe4d3c);
    color: var(--ms-option-color-selected, #fff);
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
    min-height: calc(
      var(--ms-border-width, 1px) * 2 + var(--ms-font-size, 1rem) *
        var(--ms-line-height, 1.375) + var(--ms-py, 0.5rem) * 2
    );
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
</style>
