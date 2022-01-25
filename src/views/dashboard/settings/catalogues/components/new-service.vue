<template>
  <div class="container-fluid p-4 bg-white">
    <div class="w-full">
      <!-- <div class="w-full" style="border-bottom: 1px solid #c2c7d6">
        <span
          class="flex flex-col w-full justify-center font-bold text-xl text-primary py-2"
        >
          New Service
        </span>
      </div> -->

      <accordion-component title="New Service" class="text-primary capitalize" :opened="true">
         <template v-slot:default>
        <div>
          <div class="w-full py-5">
            <span class="flex items-center">
              <cornie-avatar-field v-model="img.url" />
            </span>
          </div>

          <div class="w-full grid grid-cols-3 gap-4">
              <fhir-input          
                  reference="http://hl7.org/fhir/ValueSet/c80-practice-codes"
                  class="w-full"
                  v-model="specialty"
                  label="Specialty"
                  placeholder="--Select--"
                />
                <fhir-input         
                    reference="http://hl7.org/fhir/ValueSet/service-category"
                    class="w-full"
                    v-model="category"
                    label="category"
                      placeholder="--Select--"
                  />
                  <fhir-input
                        reference="http://hl7.org/fhir/ValueSet/service-type"
                        class="w-full"
                        v-model="type"
                        label="type"
                        placeholder="--Select--"
                    />
                    <cornie-input :label="'Service Name'" v-model="name" placeholder="--Enter--" />
                    <cornie-input v-model="description" :label="'Description'" placeholder="--Enter--" />
                    <cornie-input
                      :label="'Item Code'"
                      v-model="itemCode"
                      placeholder="--DNS Generated--"
                      :disabled="true"
                    />
                      <div>
                          <span class="text-sm font-semibold mb-2">Locations</span>
                          <Multiselect
                            v-model="locations"
                            mode="tags"
                            :hide-selected="false"
                            :close-on-select="true"
                            id="field-id"
                            :options="allLocation"
                            value-prop="code"
                            label="label"
                            :before="'Location'"
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
                      
                      <cornie-select
                          :items="allLocation"
                          v-model="coverageArea"
                          label="Coverage area"
                          class="w-full"
                          placeholder="--Select--"
                        />
                      
                        <cornie-select  
                        :items="['active','inactive','entered-in-error']"
                          v-model="status"
                          label="Status"
                          class="w-full"
                          placeholder="--Select--"
                      />
                      <cornie-select
                          :items="['providers']"
                          v-model="providedBy"
                          label="Provided by"
                          class="w-full"
                          placeholder="--Select--"
                        />
                        <combo-input :label="'Unit of Service'">
                          <template #list>
                            <cornie-select
                              v-model="serviceUOM"
                              :items="['minutes','hours','sessions']"
                              style="width: 100%; border-radius: 8px 0 0 8px"
                              placeholder="--Select--"
                            />
                          </template>
                          <template #input>
                            <input-with-desc>
                              <input
                                type="text"
                                class="p-2 border w-100 w-full"
                                style="border-radius: 0 8px 8px 0"
                              value="0"
                              />
                            </input-with-desc>
                          </template>
                        </combo-input>
                        <cornie-input v-model="cost" :label="'Cost Per Unit'" placeholder="--Enter--" />
                        <div class="w-full">
                          <span class="text-dark font-semibold capitalize text-sm mb-5">Priced</span>
                          <div class="w-full flex space-x-4 mt-4">
                            <cornie-radio
                                v-model="priced"
                                :label="'Yes'"
                                :value="true"
                                name="status"
                                checked
                            />
                            <cornie-radio
                                  v-model="priced"
                                  :label="'No'"
                                  :value="false"
                                  name="status"
                              />

                          </div>
                        </div>
                        <div class="w-full">
                          <span class="text-dark font-semibold capitalize text-sm mb-3">Discount Applicable?</span>
                          <div class="w-full flex space-x-4 mt-4">
                            <cornie-radio
                                v-model="reqBody.ingredientStatus"
                                :label="'Yes'"
                                :value="'yes'"
                                name="newstatus"
                                checked
                            />
                            <cornie-radio
                                  v-model="reqBody.ingredientStatus"
                                  :label="'No'"
                                  :value="'no'"
                                  name="newstatus"
                              />

                          </div>
                        </div>
            <!-- <div class="w-4/12">
              <service-dropdown
                @add="() => (addNew = true)"
                v-model="reqBody.name"
                :label="'Service Name'"
                :items="[
                  'Specialist Consultation',
                  'General Consultation',
                  'Biopsy',
                ]"
              />
            </div> -->
          </div>
        </div>
         </template>
      </accordion-component>

     <accordion-component title="Fee Information" class="text-primary capitalize" :opened="true">
         <template v-slot:default>
          <div class="mt-5">

            <div class="w-full grid grid-cols-3 gap-4">
                <cornie-input
                  v-model.number="cost"
                  :label="'Service Cost (NGN)'"
                  placeholder="--Enter--"
                  :disabled="true"
                />
                <cornie-input :label="'Fee Markup'"  v-model.number="markup" :disabled="true" placeholder="--Autoloaded--" />
                  <cornie-input
                    :label="'Discount Limit'"
                    placeholder="--Autoloaded--"
                    v-model="discountLimit"
                    :disabled="true"
                  />

            </div>

            <div class="w-full mb-8 mt-3 py-4">
              <div class="w-full overflow-x-scroll">
                <div class="w-full flex ths py-2" style="min-width: 1220px">
                  <div class="th flex items-center">
                    <span>unit of Service</span>
                  </div>
                  <div class="th flex items-center hidden">
                    <span>QTY</span>
                  </div>
                  <div class="th flex items-center">
                    <span>service cost</span>
                  </div>
                  <div class="th flex items-center">
                    <span>Fee markup</span>
                  </div>
                  <div class="th flex items-center">
                    <span>Service fee</span>
                  </div>
                  <div class="th flex items-center">
                    <span>margin (ngn)</span>
                  </div>
                  <div class="th flex items-center">
                    <span>margin (%)</span>
                  </div>
                  <div class="th flex items-center">
                    <span>discount limit</span>
                  </div>
                  <div class="th flex items-center">
                    <span>Service fee (discounted)</span>
                  </div>
                  <div class="th flex items-center">
                    <span>DISCOUNTED margin (ngn)</span>
                  </div>
                  <div class="th flex items-center">
                    <span>DISCOUNTED margin(%)</span>
                  </div>
                </div>
                <div class="w-full flex tbs py-3 px-3 mb-3" style="min-width: 1220px">
                  <div class="th flex items-center">
                    <span>{{serviceUOM}}</span>
                  </div>
                  <div class="th flex items-center hidden">
                    <span>1</span>
                  </div>
                  <div class="th flex items-center">
                    <span>{{markupData.sampleUnitCost}}</span>
                  </div>
                  <div class="th flex items-center">
                    <span><cornie-input v-model="markup" palceholder="100%" /></span>
                  </div>
                  <div class="th flex items-center">
                    <span>{{markupData.cdmPrice}}</span>
                  </div>
                  <div class="th flex items-center">
                    <span>{{markupData.margin}}</span>
                  </div>
                  <div class="th flex items-center">
                    <span>{{markupData.marginPercentage}}</span>
                  </div>
                  <div class="th flex items-center">
                    <span><cornie-input v-model="discountLimit" palceholder="0%"/></span>
                  </div>
                  <div class="th flex items-center">
                    <span>{{markupData.maxAllowedDiscount}}</span>
                  </div>
                  <div class="th flex items-center">
                    <span>{{markupData.discountedMargin}}</span>
                  </div>
                  <div class="th flex items-center">
                    <span>{{markupData.discountedMarginPercentage}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
         </template>
     </accordion-component>

    <accordion-component title="Tax Information" class="text-primary capitalize" :opened="true">
         <template v-slot:default>
        <div class="w-full mt-5">
          <div class="w-full flex">
            <label class="inline-flex items-center">
              <input
                v-model="applyVat"
                type="checkbox"
                class="form-radio h-3 w-3"
                :value="true"
              />
              <span class="ml-2 noraml-text text-sm font-normal"
                >Apply VAT to this service item</span
              >
            </label>
          </div>
        </div>

        <div class="w-full grid grid-cols-3 gap-4 mt-5">
        
            <div>

            <fhir-input            
                reference="http://hl7.org/fhir/ValueSet/service-referral-method"
                class="w-full mb-5"
                v-model="referralMethod"
                label="referral method"
                placeholder="--Select--"
              />
              <div class="w-full mb-8">
                  <span class="text-dark capitalize font-semibold text-sm mb-3">appointment required?</span>
                  <div class="w-full flex space-x-4 mt-4">
                    <cornie-radio
                        v-model="requiresAppointment"
                        :label="'Yes'"
                        :value="true"
                        name="required"
                        checked
                    />
                    <cornie-radio
                          v-model="requiresAppointment"
                          :label="'No'"
                          :value="false"
                          name="required"
                      />

                  </div>
              </div>
              <div>
                    <span class="text-sm font-semibold capitalize mb-2">Availability Exceptions</span>
                        <Multiselect
                          v-model="availabilityExceptions"
                          mode="tags"
                          :hide-selected="false"
                          :close-on-select="true"
                          id="value"
                          :options="options"
                          value-prop="value"
                          label="label"
                          :before="'Location'"
                          placeholder="--Select--"
                          class="w-full"
                        >
                        <template v-slot:tag="{ option, handleTagRemove, disabled }">
                        <div class="multiselect-tag is-user">
                          {{ option.label }}
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
                        <span class="w-full text-sm">{{ option.label }}</span>
                      </template>
                        </Multiselect>
              </div>
                    
                <!-- <cornie-input
                  v-model="availabilityExceptions"
                  label="availability exceptions"
                    placeholder="--Enter--"
                    class="w-full mb-8"
                /> -->
                <cornie-select           
                  v-model="channelOfService"
                  label="Channel of Service"
                  :items="['dental', 'hospice']"
                    placeholder="--Select--"
                    class="w-full mb-5"
                />
                <cornie-select
                    :items="dropdown.CommunicationLanguage"
                    v-model="telecom"
                    label="Telecom"
                    placeholder="--Select--"
                    class="w-full"
                  />
            </div>
        </div>
         </template>
    </accordion-component>

        <accordion-component title="Availability" class="text-primary capitalize" :opened="true">
         <template v-slot:default>
          <div class="mt-5 w-full">
              <operation-hours v-model="availableTimes" />
            </div>
         </template>
        </accordion-component>
      <div class="w-full">
        <span class="w-full bg-danger">
          <span class="flex justify-end w-full my-5">
            <cornie-btn
              class="m-5 px-6 font-semibold rounded"
              style="color: #080056; border: 1px solid #080056"
              @click="() => $router.go(-1)"
            >
              Cancel
            </cornie-btn>

            <cornie-btn
              class="bg-danger px-6 text-white my-5 mx-4 font-semibold rounded"
              :loading="loading"
              @click="submit"
            >
              {{ $route.params.serviceId ? "Update" : "Save" }}
            </cornie-btn>
          </span>
        </span>
      </div>
    </div>

    <modal :visible="addNew">
      <div class="w-full p-4 bg-white" style="min-width: 400px">
        <div class="w-full">
          <p class="modal-header flex justify-between">
            <span>Add New</span>
            <span class="cursor-pointer" @click="() => (addNew = false)"
              ><close-icon
            /></span>
          </p>
          <p class="my-3 modal-text">Some modal text if necessary</p>
        </div>

        <div class="w-full my-4">
          <cornie-input
            :label="'Name'"
            v-model="reqBody.name"
            style="width: 100%"
          />
        </div>

        <div class="w-full my-4">
          <cornie-input
            :label="'Code'"
            v-model="reqBody.itemCode"
            style="width: 100%"
          />
        </div>

        <div class="w-full">
          <span class="w-full bg-danger">
            <span class="flex justify-end w-full my-5">
              <cornie-btn
                class="bg-danger text-white mx-4 font-semibold rounded-full"
                @click="submit"
              >
                Save
              </cornie-btn>
            </span>
          </span>
        </div>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import CornieAvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import CornieSelect from "@/components/cornieselect.vue";
import { cornieClient } from "@/plugins/http";
import AccordionComponent from "@/components/form-accordion.vue";
import CornieInput from "@/components/cornieinput.vue";
import ComboInput from "@/views/dashboard/ehr/vitals/components/split-input.vue";
import CornieCheckbox from "@/components/corniecheckbox.vue";
import ServiceDropdown from "./service-name.vue";
import Modal from "@/components/modal.vue";
import CloseIcon from "@/components/icons/close.vue";
import { namespace } from "vuex-class";
import { Prop, Watch } from "vue-property-decorator";
import ICatalogueService, { AvailableTimes } from "@/types/ICatalogue";
import FhirInput from "@/components/fhir-input.vue";
import { useCountryStates } from "@/composables/useCountryStates";
import CornieRadio from "@/components/cornieradio.vue";
import OperationHours from "@/components/new-operation-hours.vue";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import Multiselect from "@vueform/multiselect";
import User, { CornieUser } from "@/types/user";

const dropdown = namespace("dropdown");
const catalogue = namespace("catalogues");
const userStore = namespace("user");
const markup = namespace("markup");

@Options({
  components: {
    CornieAvatarField,
    CornieSelect,
    AccordionComponent,
    CornieInput,
    ComboInput,
    CornieCheckbox,
    ServiceDropdown,
    Modal,
    CloseIcon,
    FhirInput,
    CornieRadio,
    OperationHours,
    Multiselect,
  },
})
export default class NwService extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  @catalogue.Action
  createService!: (service: ICatalogueService) => Promise<boolean>;

  @catalogue.Action
  getServices!: () => Promise<void>;

  @catalogue.Action
  updateService!: (service: ICatalogueService) => Promise<boolean>;

  @catalogue.State
  services!: ICatalogueService[];

  @userStore.Getter
  authPractitioner!: IPractitioner;

  @userStore.Getter
  cornieUser!: CornieUser;

  @markup.State
  markups!: any[];

  @markup.Action
  fetchMarkups!: () => Promise<void>;

  options = [
    { value: "holidays", label: "Holidays" },
    { value: "weekends", label: "Weekends" },
    { value: "Fridays", label: "Fridays" },
    { value: "sundays", label: "Sundays" },
  ];
  image = "";
  category = "";
  subcategory = "subcategory";
  name = "";
  description = "";
  itemCode = "code";
  serviceUOM = "";
  quantity = 0;
  cost = 0;
  markup = 0;
  availabilityExceptions = [];
  discountLimit = 0;
  applyVat = false;
  status = "";
  organizationId = "";
  specialty = "";
  type = "";
  coverageArea = "";
  providedBy = "";
  priced = false;
  channelOfService = "";
  telecom = "";

  referralMethod = "";
  requiresAppointment = false;
  locations = [] as any;
  availableTimes: AvailableTimes[] = [];
  hoursOfOperation: HoursOfOperation[] = [];

  img = setup(() => useHandleImage());
  nationState = setup(() => useCountryStates());
  addNew = false;
  loading = false;
  markupData = [];
  dropdown = {} as IIndexableObject;
  location = [];
  reqBody = {
    quantity: 1,
    cost: 10,
    status: "active",
  } as ICatalogueService;

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  @catalogue.Action
  getServicesById!: (id: string) => Promise<ICatalogueService>;

  @Watch("id")
  idChanged() {
    this.setServices();
  }

  async setServices() {
    const service = await this.getServicesById(this.id);
    console.log(service, "HELLO AM SERCICE");
    if (!service) return;
    this.img.url = service.image;
    this.category = service.category;
    this.subcategory = service.subcategory;
    this.name = service.name;
    this.description = service.description;
    this.itemCode = service.itemCode;
    this.serviceUOM = service.serviceUOM;
    // this.quantity = service.quantity;
    this.discountLimit = service.discountLimit;
    this.applyVat = service.applyVat;
    this.status = service.status;
    this.specialty = service.specialty;
    this.type = service.type;
    this.coverageArea = service.coverageArea;
    this.providedBy = service.providedBy;
    this.priced = service.priced;
    this.availabilityExceptions = service.availabilityExceptions;
    this.referralMethod = service.referralMethod;
    this.channelOfService = service.channelOfService;
    this.telecom = service.telecom;
    this.requiresAppointment = service.requiresAppointment;
    this.locations = service.locations;
    this.availableTimes = service.availableTimes;
  }
  get payload() {
    return {
      image: this.img?.url,
      category: this.category,
      name: this.name,
      description: this.description,
      itemCode: this.itemCode,
      serviceUOM: this.serviceUOM,
      // subcategory : this.subcategory,
      // quantity: this.quantity,
      cost: this.cost,
      markup: this.markup,
      discountLimit: this.discountLimit,
      applyVat: this.applyVat,
      status: this.status,
      // organizationId: this.organizationId,
      specialty: this.specialty,
      type: this.type,
      coverageArea: this.coverageArea,
      providedBy: this.providedBy,
      priced: this.priced,
      availabilityExceptions: this.availabilityExceptions,
      referralMethod: this.referralMethod,
      channelOfService: this.channelOfService,
      telecom: this.telecom,
      requiresAppointment: this.requiresAppointment,
      locations: this.locations,
      availableTimes: this.availableTimes,
    };
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.update();
    else await this.create();
    this.loading = false;
  }

  async create() {
    // this.payload.organizationId = this.cornieUser.organizationId;
    try {
      const response = await cornieClient().post(
        "/api/v1/catalogue-service",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Catalogue service Created", status: "success" });
        this.$router.push("/dashboard/provider/settings/catalogues");
      }
    } catch (error) {
      window.notify({ msg: "Catalogue service not Created", status: "error" });
    }
  }

  async update() {
    const url = `/api/v1/catalogue-service/${this.id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      window.notify({ msg: "Catalogue service Updated", status: "success" });
      this.$router.push("/dashboard/provider/settings/catalogues");
    } catch (error) {
      window.notify({ msg: "Catalogue service not Updated", status: "error" });
    }
  }

  async onSave() {
    if (!this.img?.url) {
      window.notify({ msg: "Please add an image", status: "info" });
      return false;
    }
    try {
      this.loading = true;
      this.reqBody.image = this.img?.url;
      let done = false;

      if (this.reqBody?.id) {
        done = await this.updateService(this.reqBody);
      } else {
        done = await this.createService(this.reqBody);
      }

      if (done) {
        window.notify({
          msg: `Service ${this.reqBody?.id ? "updated" : "saved"} successfully`,
          status: "success",
        });
        this.$router.go(-1);
      } else {
        window.notify({
          msg: "There was an error, please check the form and try again",
          status: "error",
        });
      }
      this.loading = false;
    } catch (error) {
      window.notify({
        msg: "There was an error, please check the form and try again",
        status: "error",
      });
      this.loading = false;
    }
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
  async setDropdown() {
    const data = await this.getDropdowns("practitioner");
    this.dropdown = data;
  }

  get allP() {
    return this.cornieUser;
  }

  async fetchMarkup() {
    const AllMarkup = cornieClient().get(
      "/api/v1/markup-discount/findAllByOrgId/"
    );
    const response = await Promise.all([AllMarkup]);
    this.markupData = response[0].data[0];
  }
  async created() {
    await this.setDropdown();
    await this.fetchLocation();
    await this.fetchMarkup();
    await this.setServices();
    // if (this.$route.params.serviceId) {
    //   if (this.services?.length <= 0) await this.getServices();
    //   this.reqBody = this.services.find(
    //     (service) => service.id === this.$route.params.serviceId
    //   ) as ICatalogueService;
    //   this.img.url = this.reqBody?.image;
    // }
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.sub-headers {
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #fe4d3c;
}

.th {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 19px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #080056;
  min-width: 120px;
  padding: 0.25rem;
}

.ths {
  background: #f0f4fe;
  border-radius: 8px 8px 0px 0px;
  padding: 0.25rem;
}

.tbs {
  background: #ffffff;
  border: 1px solid #c2c7d6;
  box-sizing: border-box;
  border-radius: 0px 0px 8px 8px;
}

input[type="checkbox"]:after {
  border: 1px solid #c4bdbd !important;
}
input[type="checkbox"]:checked:after {
  background-color: #ff0000 !important;
}

.modal-header {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  color: #080056;
}

.modal-text {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #14171f;
}
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
  -webkit-mask-image: url("../../../../../assets/img/Chevron.png");
  mask-image: url("../../../../../assets/img/Chevron.png");
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
