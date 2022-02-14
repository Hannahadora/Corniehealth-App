<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-4/12">
    <cornie-card height="100%" class="flex flex-col h-full bg-white">
        <cornie-card-title class="">
        <icon-btn @click="show = false" >
          <arrow-left stroke="#ffffff"/>
        </icon-btn>
        <div class="w-full border-l-2 border-gray-300">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Beneficial Owners
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
          :type="number"
          placeholder="--Enter--"
        />
      </div>

      <div class="my-4">
          <cornie-input
            :label="'Percentage'"
            v-model="percentage"
            placeholder="--Enter--"
            class="w-full"
          >
            <template v-slot:append-inner>
               <span class="border-l-2 border-gray-300 px-4 py-2 divide-x-8">%</span>
            </template>
          </cornie-input>
          
     
    
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
import { IBeneficialOwner } from "../index.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import IconBtn from "@/components/CornieIconBtn.vue";
import { namespace } from "vuex-class";
import IKyc from "@/types/IKyc";
import IOwner from "@/types/IOwner"
import { cornieClient } from "@/plugins/http";

const kyc = namespace("kyc");

@Options({
  components: {
    ArrowLeft,
    CornieInput,
     ...CornieCard,
    CornieDialog,
    IconBtn
  },
})
export default class benficialOwner extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

 @Prop({ type: String, default: "" })
  ownerId!: string;

  owner = {} as IBeneficialOwner;
  loading =  false;
  percentage = 0;
  name = "";

    @kyc.Action
  fetchKycs!: () => Promise<void>;

   @kyc.State
   orgKyc!: IKyc;

  @kyc.Action
  getOwnerById!: (id: string) => IOwner;

  @Watch("ownerId")
  idChanged() {
    this.setDirector();
  }


 async setDirector() {
    const owner = await this.getOwnerById(this.ownerId);
    if (!owner) return;
    this.name = owner.name;
    this.percentage = owner.percentage
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.apply();
    else await this.updateDirectorData();
    this.loading = false;
  }
   async apply() {
    this.loading = true;
    if (this.ownerId) await this.updateDirector();
    else await this.saveDirector();
    this.loading = false;
  }


  get payload() {
    return {
      name: this.name,
      percentage: this.percentage,
      
    };
  }

  get newaction() {
    return this.id ? "Update" : "Add";
  }

  async saveDirector() {
      try {
      const response = await cornieClient().post(
        `/api/v1/kyc/beneficial-owner/${this.id}`,
        this.payload
      );
      if(response.success){
        window.notify({ msg: "Beneficial owner added successfully", status: "success" });
          this.done();
      }
    } catch (error) {
      window.notify({ msg: "Beneficial owner not added", status: "error" });
    }
  }
  
  async updateDirector() {
    const url = `/api/v1/kyc/beneficial-owner/${this.ownerId}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        this.done();
        window.notify({ msg: "Beneficial owner updated succesffuly", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Beneficial owner not updated", status: "error" });
    }
  }

  async updateDirectorData() {
   this.$emit('ownerAdded',this.payload);
  }
 
  done() {
    this.$emit("setOwner");
    this.show = false;
  }



  // onSave() {
  //   if (!this.owner.name) return false;
  //   this.$emit("ownerAdded", this.owner);
  //   this.closeModal();
  //   this.owner = { name: "", percentage: 0 } as IBeneficialOwner;
  // }

  closeModal() {
   this.show = false;
  }
}
</script>
<style scoped>
.spanclass{
    display: flex;
    justify-content: center;
    margin-left: 40px;
    height: 2.65rem;
    padding: 10px;
}
</style>
