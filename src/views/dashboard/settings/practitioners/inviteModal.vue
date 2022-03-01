<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-4/12">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Invite Practitioner
          </h2>
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
            <div class="w-full pb-2 mb-3">
                <span class="text-dark text-sm font-medium">Send an email invite to your practitioners to complete their registration.	</span>
            </div>
            <div  class="border-b-2 border-gray-100 pb-3 border-dashed">
              <div class="grid grid-cols-2 gap-4">
                    <cornie-input
                        label="Full name"
                        placeholder="First Name, Last Name"
                    />
                    <cornie-input
                        label="Email Address"
                        placeholder="Enter email address"
                    />
              </div>
              <span class="text-sm text-danger font-semibold">
                Add <span class="text-lg"> + </span>
              </span>
            </div>
             <div class="w-full flex space-x-7 mt-4 pb-4">
                <div class="w-full dflex space-x-4 mb-3">
                    <div class="w-full">
                        <p class="text-xs text-dark font-medium">
                           Sam John
                        </p>
                        <p class="text-xs text-gray-500 font-meduim">
                       samjohn@reddington.ng
                    </p>
                    </div>
                </div>
                <delete-icon class="fill-current text-danger cursor-pointer"/>
            </div>
        </v-form>
      </cornie-card-text>
      
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-2 mr-3 font-semibold rounded-lg text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="submit"
            class="text-white bg-danger font-semibold  rounded-lg"
           >
            Send Invite
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>

  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CloseIcon from "@/components/icons/whitecancel.vue";
import { namespace } from "vuex-class";
import Multiselect from "@vueform/multiselect";
import CornieSelect from "@/components/cornieselect.vue";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import DeleteIcon from "@/components/icons/delete.vue";
import CornieInput from "@/components/cornieinput.vue";


const practitioner = namespace("practitioner");

@Options({
  name: "spcialModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    Multiselect,
    CancelIcon,
    CornieDialog,
    SearchIcon,
    IconInput,
    CornieBtn,
    CornieSelect,
    CloseIcon,
    DeleteIcon,
    CornieInput
  },
})
export default class SpecialModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;



  loading = false;
  specialarray = [] as any;
  special = "";


   @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  deletePractitioner!: (id: string) => Promise<boolean>;

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  get Mail() {
    return this.practitioners.map((i: any) => {
      return {
        value: i.id,
        display: i.email,
      };
    });
  }


 
 
//   async saveDirector() {
//       try {
//       const response = await cornieClient().post(
//         `/api/v1/kyc/director/${this.id}`,
//         this.payload
//       );
//       if(response.success){
//           this.done();
//         window.notify({ msg: "Director added successfully", status: "success" });
//       }
//     } catch (error) {
//       window.notify({ msg: "Director not added", status: "error" });
//     }
//   }
  

 
  done() {
    this.$emit("director-added");
    this.show = false;
  }


  created() {
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
