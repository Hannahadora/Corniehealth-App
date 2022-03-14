<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <span
          class="text-primary font-extrabold text-lg border-l-2 border-gray-100 pl-2"
        >
          Card
        </span>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form" class="grid grid-cols-12 gap-x-3 gap-y-3">
          <div class="col-span-12">
            <cornie-input
              label="Card Name"
              class="w-full"
              placeholder="--Enter--"
              v-model="cardName"
              :rules="required"
              required
            />
          </div>
          <div class="col-span-12">
            <cornie-num-input
              label="Card Number"
              class="w-full"
              placeholder="--Enter--"
              v-model="cardNumber"
              :rules="cardNumberRules"
              required
            />
            <span
              v-if="wrongCard && cardNumber.length"
              class="text-xs text-red-500 font-bold block"
              >Invalid card number</span
            >
          </div>
          <div class="col-span-6">
            <cornie-expiry-input
              label="Expiry"
              class="w-full"
              placeholder="--Enter--"
              v-model="expiry"
              :rules="required"
              required
            />
          </div>
          <div class="col-span-6">
            <cornie-num-input
              label="CVV"
              class="w-full"
              placeholder="--Enter--"
              v-model="cvv"
              :rules="cvvRules"
              required
            />
          </div>
          <div class="col-span-12">
            <cornie-num-input
              label="Card Pin"
              placeholder="--Enter--"
              v-model="cardPin"
              :rules="required"
              required
            />
          </div>
          <div class="col-span-12">
            <cornie-select
              label="Status"
              class="w-full"
              placeholder="Select One"
              :items="['Active', 'Inactive']"
              v-model="status"
              :rules="required"
              required
            />
          </div>
        </v-form>
        <div class="flex justify-end w-full">
          <button
            type="button"
            class="border border-primary py-2 px-5 rounded-lg w-auto"
            @click="add"
            :disabled="wrongCard"
          >
            {{ currentId ? "Update" : "Add" }}
          </button>
        </div>
        <div>
          <div class="border-b border-gray-400 my-4 w-full"></div>
          <h1 class="uppercase font-bold text-xs mb-2">
            Select default provider
          </h1>
        </div>
        <template v-if="cardList.length">
          <div
            class="flex items-center mb-3"
            v-for="item in cardList"
            :key="item.id"
          >
            <div class="mr-1">
              <cornie-radio
                :name="item"
                @update:modelValue="setDefault"
                :value="item.id"
              ></cornie-radio>
            </div>
            <div class="mr-2">
              <component :is="item.logo"></component>
            </div>
            <div class="flex-1">
              <h1 class="font-semibold text-sm">
                {{ item.cardNumberEncrypt }}
              </h1>
              <div class="text-xs text-gray-400 italic flex">
                <span class="inline-block mr-1">Expires</span>
                <div>{{ item.expiry }}</div>
              </div>
            </div>
            <div class="flex">
              <button @click="editCard(item.id)" type="button" class="mr-8">
                <edit-icon />
              </button>
              <button @click="delCard(item.id)" type="button">
                <delete-icon />
              </button>
            </div>
          </div>
        </template>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="handleCancel"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="save"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieExpiryInput from "@/components/cornie-expiry-input.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieDatePicker from "@/components/datepicker.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { Insurance, IPatient } from "@/types/IPatient";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import MasterCardLogo from "@/components/icons/mastercardlogo.vue";
import VisaCardLogo from "@/components/icons/visacardlogo.vue";
import CornieRadio from "@/components/cornieradio.vue";
import DeleteIcon from "@/components/icons/delete-red.vue";
import EditIcon from "@/components/icons/edit-purple.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import CornieNumInput from "@/components/cornienuminput.vue";
import { string, date, number } from "yup";

const patients = namespace("patients");

@Options({
  name: "card-dialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieDatePicker,
    CornieBtn,
    MasterCardLogo,
    VisaCardLogo,
    CornieRadio,
    DeleteIcon,
    EditIcon,
    PasswordInput,
    CornieNumInput,
    CornieExpiryInput,
  },
  emits: ["canceled"],
})
export default class EmergencyDontactDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  required = string().required();
  cardNumberRules = string().required().min(15).max(16);
  cvvRules = string().required().max(3);
  wrongCard = false;

  cardName = "";
  cardNumber = "";
  expiry = "" as number | any;
  cvv = "";
  cardPin = "";
  status = "";

  cardList = [] as Array<any>;

  currentId = null;

  async save() {}

  handleCancel() {
    this.$emit("canceled");
    this.show = false;
  }

  @Watch("cardNumber")
  handleWrongCard() {
    let cardType = +this.cardNumber.toString().substring(0, 1);
    switch (cardType) {
      case 4:
      case 5:
        this.wrongCard = false;
        break;
      default:
        this.wrongCard = true;
    }
  }

  actualExpiry = "";

  @Watch("actualExpiry")
  updateExp() {
    // if (this.expiry.length === 5) return;
    document.addEventListener("keyup", this.updateExpiryDate);
  }

  @Watch("expiry")
  handleExpiryDate() {
    let matched = this.expiry ? this.expiry.match(/.{1,2}/g)?.join(" ") : "";
    if (matched !== "") {
      var str = matched?.replace(/ /g, "/") as string;

      this.actualExpiry = str;
    }
  }

  unmounted() {
    document.removeEventListener("keyup", this.updateExpiryDate);
  }

  updateExpiryDate(e: any) {
    if (
      !this.expiry.match(/^\d+$/) &&
      e.key !== "Backspace" &&
      this.expiry.length < 5
    ) {
      this.expiry = "";
    }

    if (e.key !== "Backspace" && this.actualExpiry.length === 4) {
      this.expiry = this.actualExpiry;
    }
  }
  // get expiryDate() {
  //   return this.expiry ? this.expiry.match(/.{1,2}/g)?.join(" ") : "";
  // }

  // updateExpiry(e: any) {
  //   this.expiry = e.target.value.replace(/ /g, "/");
  //   console.log(this.expiry);
  // }

  reset() {
    this.cardName = "";
    this.cardNumber = "";
    this.expiry = "";
    this.cvv = "";
    this.cardPin = "";
    this.status = "";
    this.currentId = null;
  }

  setDefault(val: string) {
    let item = this.cardList.find((item: any) => item.id === val);
    if (item) item.default = true;
    this.cardList.forEach((i: any) => {
      if (i.id !== val) {
        i.default = false;
      }
    });
  }

  editCard(id: any) {
    let item = this.cardList.find((item: any) => item.id === id);

    this.currentId = item.id;
    this.cardName = item.cardName;
    this.cardNumber = item.cardNumber;
    this.expiry = item.expiry;
    this.cvv = item.cvv;
    this.cardPin = item.cardPin;
    this.status = item.status;
  }

  delCard(id: any) {
    this.cardList = this.cardList.filter((item: any) => item.id !== id);
  }

  async add() {
    if (
      this.cardName === "" ||
      this.cardNumber === "" ||
      this.expiry === "" ||
      this.cvv === "" ||
      this.cardPin === "" ||
      this.status === ""
    )
      return;

    let cardType = +this.cardNumber.toString().substring(0, 1);
    let logo = "";
    switch (cardType) {
      case 4:
        logo = "visa-card-logo";
        break;
      default:
        logo = "master-card-logo";
    }

    let cardNumberLastFour = this.cardNumber.substring(-1, 4);
    let cardNumberEncrypt = "";

    for (
      let i = 0;
      i <= this.cardNumber.length - cardNumberLastFour.length;
      i++
    ) {
      cardNumberEncrypt += "*";
    }

    if (this.currentId) {
      let item = this.cardList.find((item: any) => item.id === this.currentId);
      let index = this.cardList.findIndex(
        (item: any) => item.id === this.currentId
      );

      this.cardList.splice(index, 1, {
        id: item.id,
        logo: logo,
        cardName: this.cardName,
        cardNumber: this.cardNumber,
        cardPin: this.cardPin,
        expiry: this.expiry,
        cardNumberEncrypt: `${cardNumberEncrypt} ${cardNumberLastFour}`,
        cvv: this.cvv,
        status: this.status,
        default: item.default,
      });
    } else {
      this.cardList.push({
        id: `${Math.random() * 1999}${Math.random() * 2999}`,
        logo: logo,
        cardName: this.cardName,
        cardNumber: this.cardNumber,
        cardNumberEncrypt: `${cardNumberEncrypt} ${cardNumberLastFour}`,
        cardPin: this.cardPin,
        expiry: this.expiry,
        cvv: this.cvv,
        status: this.status,
        default: false,
      });
    }

    this.reset();
  }

  async submit() {
    try {
      // if (this.currentId) result = await this.update();
      // else result = await this.createNew();
      window.notify({
        msg: `Insurance successfully`,
        status: "success",
      });
    } catch (error) {
      window.notify({ msg: `Insurance not`, status: "error" });
    }
  }
}
</script>
