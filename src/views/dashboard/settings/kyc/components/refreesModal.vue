<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-4/12">
    <cornie-card height="100%" class="flex flex-col h-full bg-white">
      <cornie-card-title class="">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full border-l-2 border-gray-300">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Nominate Referees
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <div class="w-full my-4">
          <cornie-input
            :label="'Name'"
            v-model="name"
            style="width: 100%"
            placeholder="--Enter--"
          />
        </div>
        <div class="w-full my-4">
          <cornie-input
            :label="'Email Address'"
            v-model="email"
             :rules="emailRule"
            style="width: 100%"
            placeholder="--Enter--"
            
          />
        </div>
        <div class="w-full my-4">
          <cornie-phone
            :label="'Phone Number'"
            v-model="phone.number"
            v-model:code="phone.dialCode"
            placeholder="--Enter--"
          />
        </div>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-6 rounded"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CornieInput from "@/components/cornieinput.vue";
import CorniePhone from "@/components/phone-input.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import IconBtn from "@/components/CornieIconBtn.vue";
import IPhone from "@/types/IPhone";
import { cornieClient } from "@/plugins/http";
import { string, date } from "yup";
import { namespace } from "vuex-class";
import IKycref from "@/types/IKycref";
import { number } from "yup";

const kyc = namespace("kyc");
@Options({
  components: {
    ...CornieCard,
    ArrowLeft,
    CorniePhone,
    CornieInput,
    CornieDialog,
    IconBtn,
  },
})
export default class NominateRefree extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  refreeId!: string;

  @kyc.Action
  getRefreeById!: (id: string) => IKycref;

  loading = false;

  emailRule = string().email("A valid email is required").required();
  name="";
  email="";
  phone = {
    dialCode: "+234",
    number: "",
  };
  notified = true

  
  @Prop({ type: Number, default: 0, required: true })
  totalLength!: number;

  invalid = false;


    get lengthValidator() {
    const difference = 4 - this.totalLength;
    return number()
      .typeError("Please input a number between 1 and 4")
      .min(1)
      .max(difference, "Refree cannot be more than 4");
  }


 @Watch("refreeId")
  idChanged() {
    this.setRefree();
  }

  async setRefree() {
    const refree = await this.getRefreeById(this.refreeId);
    if (!refree) return;
     this.name  = refree.name;
     this.email  = refree.email;
     this.phone  = refree.phone;

    }
  get payload() {
    return {
      name: this.name,
      email: this.email,
      phone: this.phone,
      notified: false
    };
  }


 reset(){
     this.name = '',
      this.email = '',
     this.phone = {
    dialCode: "+234",
    number: "",
  },
      this.notified = false
 }

  async submit() {

    this.loading = true;
    if (this.id) await this.apply();
    else await this.newRefree();
    this.loading = false;
  }

   async apply() {
    this.loading = true;
    if (this.refreeId) await this.updateReffree();
    else await this.onSave();
    this.loading = false;
  }

 async newRefree() {
    this.$emit('refree', [this.payload]);
      this.done();
  }
  async onSave() {
    try {
      const response = await cornieClient().post(
        `/api/v1/kyc/referee/${this.id}`,
        this.payload
      );
      if(response.success){
        window.notify({ msg: "Refree added successfully,kindly check email", status: "success" });
          this.done();
          this.reset();
      }
    } catch (error) {
      window.notify({ msg: "Referee not added", status: "error" });
    }
  }
  async updateReffree(){
    const url = `/api/v1/kyc/referee/${this.refreeId}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Refree updated successfully", status: "success" });
        this.done();
      }
    } catch (error) {
      window.notify({ msg: "Refree not updated", status: "error" });
    }
  }
  done() {
    this.$emit("refree-added");
    this.show = false;
    this.reset();
  }
}
</script>
