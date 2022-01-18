<template>
  <div class="container-fluid p-4 bg-white">
    <div class="w-full">
      <div class="w-full" style="border-bottom: 1px solid #c2c7d6">
        <span
          class="flex flex-col w-full justify-center font-bold text-xl text-primary py-2"
        >
          New Service
        </span>
        <!-- <registration-chart class="w-full" :height="100" /> -->
      </div>

      <div class="w-full py-5">
        <span class="flex items-center">
          <cornie-avatar-field v-model="img.url" />
        </span>
      </div>

      <div class="w-full grid grid-cols-3 gap-4">
           <fhir-input          
              reference="http://hl7.org/fhir/ValueSet/c80-practice-codes"
              class="w-full"
              v-model="reqBody.specialty"
              label="Specialty"
              placeholder="--Select--"
            />
            <fhir-input         
                reference="http://hl7.org/fhir/ValueSet/service-category"
                class="w-full"
                v-model="reqBody.category"
                label="category"
                  placeholder="--Select--"
              />
               <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/service-type"
                    class="w-full"
                    v-model="reqBody.type"
                    label="type"
                    placeholder="--Select--"
                />
                <cornie-input :label="'Service Name'" placeholder="--Enter--" />
                 <cornie-input v-model="reqBody.description" :label="'Description'" placeholder="--Enter--" />
                 <cornie-input
                  :label="'Item Code'"
                  v-model="reqBody.itemCode"
                  placeholder="--DNS Generated--"
                  :disabled="true"
                />
                 <cornie-select  
                     :items="nationState.countries"
                      v-model="reqBody.address"
                      label="location"
                      class="w-full"
                       placeholder="--Select--"
                  />
                  <cornie-select
                      :items="allLocation"
                      v-model="reqBody.coverageArea"
                      label="Coverage area"
                      class="w-full"
                      placeholder="--Select--"
                    />
                    <cornie-select  
                     :items="['Active','Inactive']"
                      v-model="reqBody.status"
                      label="location"
                      class="w-full"
                       placeholder="--Select--"
                  />
                  <cornie-select
                      :items="['providers']"
                      v-model="reqBody.providedBy"
                      label="Provided by"
                      class="w-full"
                      placeholder="--Select--"
                    />
                    <combo-input :label="'Unit of Service'">
                      <template #list>
                        <cornie-select
                          v-model="reqBody.serviceUOM"
                          :items="['hours']"
                          style="width: 100%; border-radius: 8px 0 0 8px"
                        />
                      </template>
                      <template #input>
                        <input-with-desc>
                          <input
                            type="text"
                            class="p-2 border w-100 w-full"
                            style="border-radius: 0 8px 8px 0"
                          />
                        </input-with-desc>
                      </template>
                    </combo-input>
                    <cornie-input v-model="reqBody.description" :label="'Cost Per Unit'" placeholder="--Enter--" />
                    <div class="w-full">
                      <span class="text-dark font-semibold capitalize text-sm mb-5">Priced</span>
                      <div class="w-full flex space-x-4 mt-4">
                        <cornie-radio
                            v-model="reqBody.ingredientStatus"
                            :label="'Yes'"
                            :value="'yes'"
                            name="status"
                            checked
                        />
                        <cornie-radio
                              v-model="reqBody.ingredientStatus"
                              :label="'No'"
                              :value="'no'"
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


      <div class="w-full py-4">
        <p class="sub-headers">Fee Information</p>
      </div>

      <div class="w-full grid grid-cols-3 gap-4">
          <cornie-input
            v-model.number="reqBody.cost"
            :label="'Service Cost (NGN)'"
            placeholder="--Enter--"
          />
          <cornie-input :label="'Free Markup'" :disabled="true" placeholder="--Autoloaded--" />
            <cornie-input
              :label="'Discount Limit'"
              placeholder="--Autoloaded--"
              :disabled="true"
            />

      </div>

      <div class="w-full mb-8 mt-3 py-4">
        <div class="w-full overflow-x-scroll">
          <div class="w-full flex ths py-2" style="min-width: 1330px">
            <div class="th flex items-center">
              <span>unit of Service</span>
            </div>
            <div class="th flex items-center">
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
          <div class="w-full flex tbs py-3 px-3 mb-3" style="min-width: 1330px">
            <div class="th flex items-center">
              <span>Hour</span>
            </div>
            <div class="th flex items-center">
              <span>1</span>
            </div>
            <div class="th flex items-center">
              <span>Autoloaded</span>
            </div>
            <div class="th flex items-center">
              <span><cornie-input v-model="reqBody.markup" /></span>
            </div>
            <div class="th flex items-center">
              <span>Autoloaded</span>
            </div>
            <div class="th flex items-center">
              <span>Autoloaded</span>
            </div>
            <div class="th flex items-center">
              <span>Autoloaded</span>
            </div>
            <div class="th flex items-center">
              <span><cornie-input v-model="reqBody.discountLimit" /></span>
            </div>
            <div class="th flex items-center">
              <span>Autoloaded</span>
            </div>
            <div class="th flex items-center">
              <span>Autoloaded</span>
            </div>
            <div class="th flex items-center">
              <span>Autoloaded</span>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full py-4">
        <p class="sub-headers">Tax Information</p>
      </div>

      <div class="w-full">
        <div class="w-full flex">
          <label class="inline-flex items-center">
            <input
              v-model="reqBody.applyVat"
              type="checkbox"
              class="form-radio h-3 w-3"
              :value="'Apply VAT to this service item'"
            />
            <span class="ml-2 noraml-text text-sm font-normal"
              >Apply VAT to this service item</span
            >
          </label>
        </div>
      </div>

      <div class="w-full grid grid-cols-3 gap-4 mt-5">
           <fhir-input            
              reference="http://hl7.org/fhir/ValueSet/service-referral-method"
              class="w-full"
              v-model="referralMethod"
              label="referral method"
              placeholder="--Select--"
            />
            <div class="w-full">
                <span class="text-dark capitalize font-semibold text-sm mb-3">appointment required?</span>
                <div class="w-full flex space-x-4 mt-4">
                  <cornie-radio
                      v-model="reqBody.ingredientStatus"
                      :label="'Yes'"
                      :value="'yes'"
                      name="required"
                      checked
                  />
                  <cornie-radio
                        v-model="reqBody.ingredientStatus"
                        :label="'No'"
                        :value="'no'"
                        name="required"
                    />

                </div>
            </div>
             <cornie-select
                :items="['providers']"
                v-model="reqBody.providedBy"
                label="Available Times"
                class="w-full"
                placeholder="--Select--"
              />
              <cornie-input
                v-model="reqBody.availabilityExceptions"
                label="availability exceptions"
                  placeholder="--Enter--"
                  class="w-full"
              />
              <cornie-select           
                v-model="reqBody.notAvailableChannel"
                label="Channel of Service"
                :items="['dental', 'hospice']"
                  placeholder="--Select--"
                  class="w-full"
              />
               <cornie-select
                  :items="dropdown.CommunicationLanguage"
                  v-model="reqBody.communicationLanguage"
                  label="Telecom"
                   placeholder="--Select--"
                   class="w-full"
                />
      </div>
      <div class="w-full">
        <span class="w-full bg-danger">
          <span class="flex justify-end w-full my-5">
            <cornie-btn
              class="m-5 px-6 font-semibold rounded-full"
              style="color: #080056; border: 1px solid #080056"
              @click="() => $router.go(-1)"
            >
              Cancel
            </cornie-btn>

            <cornie-btn
              class="bg-danger px-6 text-white my-5 mx-4 font-semibold rounded-full"
              :loading="loading"
              @click="onSave"
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
                @click="() => (addNew = false)"
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
import CornieInput from "@/components/cornieinput.vue";
import ComboInput from "@/views/dashboard/ehr/vitals/components/split-input.vue";
import CornieCheckbox from "@/components/corniecheckbox.vue";
import ServiceDropdown from "./service-name.vue";
import Modal from "@/components/modal.vue";
import CloseIcon from "@/components/icons/close.vue";
import { namespace } from "vuex-class";
import ICatalogueService from "@/types/ICatalogue";
import FhirInput from "@/components/fhir-input.vue";
import { useCountryStates } from "@/composables/useCountryStates";
import CornieRadio from "@/components/cornieradio.vue";

const dropdown = namespace("dropdown");
const catalogue = namespace("catalogues");

@Options({
  components: {
    CornieAvatarField,
    CornieSelect,
    CornieInput,
    ComboInput,
    CornieCheckbox,
    ServiceDropdown,
    Modal,
    CloseIcon,
    FhirInput,
    CornieRadio
  },
})
export default class NwService extends Vue {
  @catalogue.Action
  createService!: (service: ICatalogueService) => Promise<boolean>;

  @catalogue.Action
  getServices!: () => Promise<void>;

  @catalogue.Action
  updateService!: (service: ICatalogueService) => Promise<boolean>;

  @catalogue.State
  services!: ICatalogueService[];

  img = setup(() => useHandleImage());
  nationState = setup(() => useCountryStates());
  addNew = false;
  loading = false;
  dropdown = {} as IIndexableObject;
  location=[];
  reqBody = {
    quantity: 1,
    cost: 10,
    status: "active",
  } as ICatalogueService;

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

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

  async created() {
    await this.setDropdown();
    if (this.$route.params.serviceId) {
      if (this.services?.length <= 0) await this.getServices();
      this.reqBody = this.services.find(
        (service) => service.id === this.$route.params.serviceId
      ) as ICatalogueService;
      this.img.url = this.reqBody?.image;
    }
  }
}
</script>

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
</style>
