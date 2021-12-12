<template>
  <div class="container-fluid p-4 bg-white overflow-y-scroll">
    <div class="w-full">
      <div class="w-full py-4" style="border-bottom: 1px solid #c2c7d6">
        <p class="header">KYC</p>
      </div>

      <div class="w-full">
        <!-- <form> -->
        <div class="w-full flex flex-wrap items-center pt-6 pb-8">
          <p class="normal-text mr-4">Is this practice registered?</p>
          <div class="mx-5 -mb-2">
            <cornie-radio
              v-model="data.practiceRegister"
              :label="'Yes'"
              value="Yes"
            />
          </div>
          <div class="mx-5 -mb-2">
            <cornie-radio
              v-model="data.practiceRegister"
              :label="'No'"
              value="No"
            />
          </div>
        </div>

        <div
          class="w-full section-card px-4 my-6"
          v-if="data.practiceRegister == 'Yes'"
        >
          <collapse-section :title="'Incorporation Details'" :height="200">
            <template #form>
              <div class="w-full flex items-center mb-6">
                <div class="w-4/12">
                  <cornie-input
                    v-model="data.incoporatedName"
                    :label="'Incorporated Name'"
                  />
                </div>
                <div class="w-4/12">
                  <cornie-input v-model="data.rcNumber" :label="'RC Number'" />
                </div>
                <div class="w-4/12">
                  <cornie-input
                    v-model="data.certificateOfIncoporation"
                    :label="'Certificate of Incorporation'"
                  />
                </div>
              </div>
              <div class="w-full flex items-center my-6">
                <div class="w-4/12">
                  <cornie-input
                    v-model="data.formCAC"
                    :label="'Form CAC 1.1'"
                  />
                </div>
                <div class="w-4/12">
                  <cornie-input
                    v-model="data.memorandumAndArticleOfAssociation"
                    :label="'Memorandum & Articles of Association'"
                  />
                </div>
                <div class="w-4/12">
                  <cornie-input
                    v-model="data.taxIdentificationNumber"
                    :label="'Tax Identification Number'"
                  />
                </div>
              </div>
            </template>
          </collapse-section>
        </div>

        <div class="w-full section-card px-4 my-6">
          <collapse-section
            :title="'Particulars of Directors'"
            :overflow="true"
            @add="() => (nominateRefree = true)"
            :height="480"
            :showAdd="true"
            :buttonText="'Select existing director'"
          >
            <template #form>
              <div class="w-full section-card p-4">
                <collapse-section
                  :title="'Director 1'"
                  :height="330"
                  :overflow="true"
                >
                  <template #form>
                    <div class="w-full flex items-center mb-6">
                      <div class="w-4/12">
                        <cornie-input
                          v-model="director.fullName"
                          :label="'Full Name'"
                        />
                      </div>
                      <div class="w-4/12">
                        <div class="w-11/12">
                          <date-picker
                            v-model="director.dateOfBirth"
                            :label="'Date of Birth'"
                          />
                        </div>
                      </div>
                      <div class="w-4/12">
                        <cornie-input
                          v-model="director.nationality"
                          :label="'Nationality'"
                        />
                      </div>
                    </div>

                    <div class="w-full flex items-center my-6">
                      <div class="w-4/12">
                        <cornie-input
                          v-model="director.emailAddress"
                          :label="'Email Address'"
                        />
                      </div>
                      <div class="w-4/12">
                        <div class="w-11/12">
                          <phone-input
                            v-model="director.phone"
                            v-model:code="director.dialCode"
                            :label="'Phone Number'"
                          />
                        </div>
                      </div>
                      <div class="w-4/12">
                        <cornie-input
                          :label="'Tax Identification Number'"
                          v-model="director.taxIdentificationNumber"
                        />
                      </div>
                    </div>
                    <div class="w-full flex items-center mb-6">
                      <div class="w-4/12 -mb-4">
                        <cornie-select
                          :items="[
                            'Nigerian Bank Identification Number (BVN)',
                            'International Passport',
                            'National Identitiy Number (NIN)',
                            'Driver\'s License',
                            'Voter\'s Card',
                          ]"
                          :label="'Identification Document'"
                        />
                      </div>
                      <div class="w-4/12">
                        <cornie-input
                          v-model="director.identificationDocumentNumber"
                          :label="'Identification Document Number'"
                        />
                      </div>
                      <div class="w-4/12">
                        <file-picker
                          @uploaded="idFileUploaded"
                          :label="'Upload Identitification Document '"
                        />
                      </div>
                    </div>
                    <div class="w-full flex items-center mb-6">
                      <div class="w-4/12 -mb-4">
                        <cornie-select
                          v-model="director.practiceLicenseDocument"
                          style="z-index: 1000"
                          :items="[
                            'Medical Practice Licence',
                            'Pharmacy Practice Licence',
                            'Radiology Practice Licence',
                            'Pathology Practice Licence',
                            'Not Applicable',
                          ]"
                          :label="'Practice Licence Document'"
                        />
                      </div>
                      <div class="w-4/12">
                        <cornie-input
                          v-model="director.practiceLicenseNumber"
                          :label="'Practice Licence Number'"
                        />
                      </div>
                      <div class="w-4/12">
                        <file-picker
                          @uploaded="practiceLicenceUploaded"
                          :label="'Upload Practice Licence Document'"
                        />
                      </div>
                    </div>
                  </template>
                </collapse-section>
              </div>
            </template>
          </collapse-section>
        </div>

        <div class="w-full section-card px-4 my-6">
          <collapse-section :title="'Address'" :height="370">
            <template #form>
              <div class="w-full flex items-center mb-6">
                <div class="w-4/12 -mb-4">
                  <cornie-select
                    v-model="data.country"
                    :items="['Nigeria']"
                    :label="'Country'"
                  />
                </div>
                <div class="w-4/12 -mb-4">
                  <cornie-select
                    v-model="data.stateRegion"
                    :items="['Lagos']"
                    :label="'State of Region'"
                  />
                </div>
                <div class="w-4/12 -mb-4">
                  <cornie-select
                    v-model="data.city"
                    :items="['Ikeja']"
                    :label="'City'"
                  />
                </div>
              </div>
              <div class="w-full flex items-center mb-6">
                <div class="w-4/12">
                  <cornie-input
                    v-model="data.zipCode"
                    :label="'ZIP or Post Code'"
                  />
                </div>
                <div class="w-4/12">
                  <cornie-input v-model="data.address" :label="'Address'" />
                </div>
                <div class="w-4/12">
                  <cornie-input
                    v-model="data.apartment"
                    :label="'Apartment or House Number'"
                  />
                </div>
              </div>
              <div class="w-full flex items-start mb-6">
                <div class="w-4/12">
                  <file-picker
                    @uploaded="addrssProofUploaded"
                    :label="'Please upload a proof of address *'"
                  />
                </div>
                <div class="w-8/12">
                  <div class="w-full upload-desc p-3">
                    <p
                      style="border-bottom: 1px solid #c2c7d6"
                      class="pb-4 mb-3"
                    >
                      Proof of address can be any of the listed documents below,
                      not more than 3 months old.
                    </p>
                    <div class="w-full">
                      <ul class="pl-4" style="list-style: unset">
                        <li class="text-normal" style="color: #14171f">
                          Utility bill for services to the address
                        </li>
                        <li class="text-normal" style="color: #14171f">
                          Bank statement showing current address
                        </li>
                        <li class="text-normal" style="color: #14171f">
                          Tax assessment document showing address
                        </li>
                        <li class="text-normal" style="color: #14171f">
                          Letter from a public authority
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </collapse-section>
        </div>

        <div
          class="w-full section-card px-4 my-6"
          v-if="data.practiceRegister == 'Yes'"
        >
          <collapse-section
            :title="'Beneficial Owners'"
            :showAddExisting="true"
            @add="() => (addOwner = true)"
            :showAdd="true"
            :buttonText="'Select existing dirctor'"
            :height="owners?.length <= 0 ? 45 : 52 * owners?.length + 40"
          >
            <template #form>
              <div
                class="w-full flex"
                v-for="(owner, index) in owners"
                :key="index"
              >
                <div class="w-4/12 py-3 px-2" style="border: 1px solid #c2c7d6">
                  <span class="normal-text">{{ owner?.name }}</span>
                </div>
                <div
                  class="w-4/12 py-3 px-2 flex justify-end"
                  style="border: 1px solid #c2c7d6"
                >
                  {{ owner.percentage }}%
                </div>
                <div
                  class="w-4/12 py-3 px-2 flex justify-end"
                  style="border: 1px solid #c2c7d6"
                >
                  <span><delete-icon /></span>
                  <span class="text-sm font-normal mx-2">Delete</span>
                </div>
              </div>
              <!-- <div class="w-full flex">
                                    <div class="w-4/12 py-3 px-2" style="border: 1px solid #C2C7D6">
                                        <span class="normal-text">Ademola Emeka</span>
                                    </div>
                                    <div class="w-4/12 py-3 px-2 flex justify-end" style="border: 1px solid #C2C7D6">
                                        10%
                                    </div>
                                    <div class="w-4/12 py-3 px-2 flex justify-end" style="border: 1px solid #C2C7D6">
                                        <span><delete-icon /></span>
                                        <span class="text-sm font-normal mx-2">Delete</span>
                                    </div>
                                </div> -->
            </template>
          </collapse-section>
        </div>

        <div class="w-full section-card px-4 my-6">
          <collapse-section
            :title="'Nominate Referees'"
            @add="() => (nominateRefree = true)"
            :showAddExisting="true"
            :overflow="
              nominees.findIndex((i) => i.showEditEmail || i.showEditPhone) >= 0
            "
            :showAdd="true"
            :buttonText="'Select existing dirctor'"
            :height="nominees?.length <= 0 ? 45 : 52 * nominees?.length + 40"
          >
            <template #form>
              <div
                class="w-full flex"
                v-for="(nominee, index) in nominees"
                :key="index"
              >
                <div
                  class="py-3 px-2"
                  style="border: 1px solid #c2c7d6; width: 30%"
                >
                  <span class="normal-text">{{ nominee?.name }}</span>
                </div>
                <div
                  class="py-3 px-4 relative"
                  style="border: 1px solid #c2c7d6; width: 30%"
                >
                  <div class="w-full flex justify-between">
                    <span>{{ nominee.email }}</span>
                    <span
                      class="cursor-pointer"
                      @click="toggleEditDialog(nominee, index)"
                      ><edit-icon
                    /></span>
                  </div>
                  <div
                    id="myModal"
                    class="modal edit-dialog p-4"
                    v-if="nominee.showEditEmail"
                  >
                    <!-- Modal content -->
                    <div class="modal-content">
                      <cornie-input v-model="nominee.newEmail" />
                      <div class="w-11/12 flex justify-between py-2">
                        <span
                          class="cancel cursor-pointer"
                          @click="() => (nominee.showEditEmail = false)"
                          >Cancel</span
                        >
                        <span
                          class="update cursor-pointer"
                          @click="updateNomineeEmail(index)"
                          >Update</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="py-3 px-4 relative"
                  style="border: 1px solid #c2c7d6; width: 30%"
                >
                  <div class="w-full flex justify-between">
                    <span>{{ nominee.phone }}</span>
                    <span
                      class="cursor-pointer"
                      @click="togglePhoneDialog(nominee, index)"
                      ><edit-icon
                    /></span>
                  </div>
                  <div
                    id="myModal"
                    class="modal edit-dialog p-4"
                    v-if="nominee.showEditPhone"
                  >
                    <!-- Modal content -->
                    <div class="modal-content">
                      <cornie-input v-model="nominee.newPhone" />
                      <div class="w-11/12 flex justify-between py-2">
                        <span
                          class="cancel cursor-pointer"
                          @click="() => (nominee.showEditPhone = false)"
                          >Cancel</span
                        >
                        <span
                          class="update cursor-pointer"
                          @click="updateNomineePhone(index)"
                          >Update</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="py-3 px-2 flex justify-end"
                  style="border: 1px solid #c2c7d6; width: 10%"
                >
                  <span><delete-icon /></span>
                  <span class="text-sm font-normal mx-2">Delete</span>
                </div>
              </div>
            </template>
          </collapse-section>
        </div>

        <div class="w-full py-10 flex justify-end">
          <cornie-button
            @click.prevent="() => $router.go(-1)"
            class="rounded-full mr-6 px-8 font-semibold cursor-pointer py-1"
            style="border: 1px solid #080056; color: #080056"
          >
            Cancel
          </cornie-button>

          <cornie-button
            @click="onSave"
            :loading="loading"
            class="rounded-full px-8 font-semibold cursor-pointer py-1 text-white"
            style="background: #fe4d3c"
          >
            Save
          </cornie-button>
        </div>

        <!-- </form> -->
      </div>
    </div>

    <modal :visible="nominateRefree">
      <nominate-refree
        @refadded="refNominated"
        @close="() => (nominateRefree = false)"
      />
    </modal>

    <modal :visible="addOwner">
      <beneficial-owner
        @ownerAdded="ownerAdded"
        @close="() => (addOwner = false)"
      />
    </modal>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import CollapseSection from "./components/collapse-section.vue";
import CornieInput from "@/components/cornieinput.vue";
import DatePicker from "@/components/datepicker.vue";
import PhoneInput from "@/components/phone-input.vue";
import CornieSelect from "@/components/autocomplete.vue";
import AutoComplete from "@/components/autocomplete.vue";
import DeleteIcon from "@/components/icons/deleteorange.vue";
import CornieButton from "@/components/CornieBtn.vue";
import Modal from "@/components/modal.vue";
import NominateRefree from "./components/nominate-refrees.vue";
import BeneficialOwner from "./components/beneficial-owner.vue";
import FilePicker from "./components/choose-file.vue";
import CornieRadio from "@/components/cornieradio.vue";
import EditIcon from "@/components/icons/edit-purple.vue";
import { cornieClient } from "@/plugins/http";
import { useHandleImage } from "@/composables/useHandleImage";

export interface IBeneficialOwner {
  name: string;
  percentage: number | string;
}

@Options({
  components: {
    CollapseSection,
    CornieInput,
    DatePicker,
    PhoneInput,
    CornieSelect,
    AutoComplete,
    DeleteIcon,
    CornieButton,
    NominateRefree,
    BeneficialOwner,
    Modal,
    FilePicker,
    CornieRadio,
    EditIcon,
  },
})
export default class KYC extends Vue {
  nominateRefree = false;
  addOwner = false;
  loading = false;
  data: any = { practiceRegister: "Yes" };

  uploadedIdentificationDocument = setup(() => useHandleImage());

  uploadedPracticeLicenseDocument = setup(() => useHandleImage());

  // uploadedPracticeLicenseDocument = setup(() => useHandleImage());

  proofOfAddressUpload = setup(() => useHandleImage());

  director: any = { dialCode: "+234" };

  idFileUploaded(fileUrl: string) {
    this.director.uploadedIdentificationDocument = fileUrl;
  }

  practiceLicenceUploaded(fileUrl: string) {
    this.director.uploadedPracticeLicenseDocument = fileUrl;
  }

  addrssProofUploaded(fileUrl: string) {
    this.data.proofOfAddressUpload = fileUrl;
  }

  nominees = [] as any[];

  owners = [] as IBeneficialOwner[];

  refNominated(data: any) {
    this.nominees?.push(data);
  }

  ownerAdded(data: any) {
    this.owners?.push(data);
  }

  async onSave() {
    this.director.phoneNumber = `${this.director.dialCode}${this.director.phone}`;

    this.data.practiceRegister =
      this.data.practiceRegister === "Yes" ? true : false;

    this.data.particularOfDirectors = [this.director];
    this.data.beneficailOwners = this.owners;
    this.data.nominateReferess = this.nominees.map((nominee: any) => {
      nominee.emailAddress = nominee.email;
      nominee.phonenNumber = nominee.phone;
      return nominee;
    });

    if (!this.data?.id) {
      this.createKYC(this.data);
    } else {
      this.updateKYC(this.data);
    }
  }

  async createKYC(body: any) {
    try {
      const { data } = await cornieClient().post("/api/v1/kyc", body);
      if (data?.id) {
        window.notify({ msg: "KYC updated successfully", status: "success" });
      }
      this.loading = false;
      ;
    } catch (error) {
      ;
      this.loading = false;
      window.notify({ msg: "KYC update failed", status: "error" });
    }
  }

  async updateKYC(body: any) {
    try {
      const { data } = await cornieClient().put(`/api/v1/kyc/${body.id}`, body);
      if (data?.id) {
        window.notify({ msg: "KYC updated successfully", status: "success" });
      }
      this.loading = false;
      ;
    } catch (error) {
      ;
      this.loading = false;
      window.notify({ msg: "KYC update failed", status: "error" });
    }
  }

  async getKYCData() {
    try {
      const { data } = await cornieClient().get("/api/v1/kyc");
      ;

      this.nominees = data.nominateReferess
        ? data.nominateReferess?.map((nominee: any) => {
            nominee.email = nominee.emailAddress;
            nominee.phone = nominee.phonenNumber;
            return nominee;
          })
        : [];

      this.owners = data.beneficailOwners ? data.beneficailOwners : [];

      if (data?.particularOfDirectors?.length > 0) {
        const firstIitem = data?.particularOfDirectors[0];
        this.director = {
          ...firstIitem,
          phone: firstIitem?.phoneNumber,
        };
      }

      this.data = {
        ...data,
        practiceRegister: data.practiceRegister ? "Yes" : "No",
      };
    } catch (error) {
      ;
    }
  }

  toggleEditDialog(nominee: any, index: number) {
    this.nominees[index].newEmail = this.nominees[index].email;
    this.nominees[index].showEditEmail = !this.nominees[index].showEditEmail;
  }

  togglePhoneDialog(nominee: any, index: number) {
    this.nominees[index].newPhone = this.nominees[index].phone;
    this.nominees[index].showEditPhone = !this.nominees[index].showEditPhone;
  }

  updateNomineeEmail(index: number) {
    this.nominees[index].email = this.nominees[index].newEmail;
    this.nominees[index].showEditEmail = false;
  }

  updateNomineePhone(index: number) {
    this.nominees[index].phone = this.nominees[index].newPhone;
    this.nominees[index].showEditPhone = false;
  }

  async created() {
    await this.getKYCData();
  }
}
</script>

<style scoped>
* {
  font-family: Inter;
  font-style: normal;
}

.header {
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  color: #080056;
}

.normal-text {
  font-size: 14px;
  line-height: 21px;
  color: #14171f;
  font-weight: 600;
}

.section-card {
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(46, 41, 78, 0.02),
    0px 4px 8px rgba(46, 41, 78, 0.08);
}

.upload-desc {
  background: #f6f8f9;
  border-radius: 8px;
}

.edit-dialog {
  position: absolute;
  z-index: 1;
  background: #fff;
  width: 100%;
  background: #ffffff;
  /* Buttons & Cards */

  box-shadow: 0px 1px 2px rgba(46, 41, 78, 0.02),
    0px 4px 8px rgba(46, 41, 78, 0.08);
}

.update {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  /* Primary/Razzmataz */

  color: #fe4d3c;
}

.cancel {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  /* Greys/Blue Yonder */

  color: #667499;
}
</style>
