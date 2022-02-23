<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           New Specialty
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
            <div class="border-b-2 w-full border-dashed pb-2 mb-5 border-gray-300">
                <span class="text-dark text-sm font-medium">Enter director’s details</span>
            </div>
                 <div>
                <span class="text-sm font-semibold mb-1">Specialty</span>
                <Multiselect
                   v-model="name"
                 mode="multiple"
                  name="object_true" :native="false" :object="true"
                  :searchable = true
                  :options="[
                    { name : 'Adult mental illness', status:'active'},
                    {name : 'Anesthetics', status:'active'},
                    {name : 'Audiological medicine', status:'active'},
                    {name : 'Blood banking and transfusion medicine', status:'active'},
                    {name : 'Burns care', status:'active'},
                    {name : 'Cardiology', status:'active'},
                    {name : 'Clinical cytogenetics and molecular genetics', status:'active'},
                    {name : 'Clinical genetics', status:'active'},
                    {name : 'Clinical hematology', status:'active'},
                    {name : 'Clinical immunology', status:'active'},
                    {name : 'Clinical microbiology', status:'active'},
                    {name : 'Clinical neuro-physiology', status:'active'},
                    {name : 'Clinical oncology', status:'active'},
                    {name : 'Clinical pharmacology', status:'active'},
                    {name : 'Clinical physiology', status:'active'},
                    {name : 'Community medicine', status:'active'},
                    {name : 'Critical care medicine', status:'active'},
                    {name : 'Dental medicine specialties', status:'active'},
                    {name : 'Dental-General dental practice', status:'active'},
                    {name : 'Dermatology', status:'active'},
                    {name : 'Diabetic medicine', status:'active'},
                    {name : 'Dive medicine', status:'active'},
                    {name : 'Endocrinology', status:'active'},
                    {name : 'Family practice', status:'active'},
                    {name : 'Gastroenterology', status:'active'},
                    {name : 'General medical practice', status:'active'},

                  
                  ]"
                  :clear-on-select="false"
                  label-prop="name"
                  value-prop="name"
                  trackBy="name"
                  label="name"
                  placeholder="--Select--"
                  class="w-full"
                >
                  <template v-slot:tag="{ option, handleTagRemove, disabled }">
                    <div class="multiselect-tag is-user">
                      {{ option.name }}
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
                        <select-option  :value="option.name" :label="option.name" />
                    <!-- <span class="w-full text-sm">{{ option.display }}</span> -->
                  </template>
                </Multiselect>
            </div>
            <div class="border-b-2 pb-5 border-dashed border-gray-200">

                <div class="grid grid-cols-2 gap-4 mt-3">
                <div
                class="flex space-x-4 w-auto bg-primary rounded-full text-white py-2 px-4"
                v-for="(item, index) in name"
                :key="index"
                >
                <span class="text-xs w-full justify-between">{{ item.name }}</span>
                <close-icon
                        class="cursor-pointer"
                        @click="removearray(index)"
                    />
                </div>
                </div>
            </div>
            <!-- <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/c80-practice-codes"
                    class="w-full"
                    v-model="name"
                    @onchange="addArray"
                    label="Specialty"
                    placeholder="--Select--"
                /> -->
              
                    <!-- <div
                    class="inline space-x-4 bg-primary rounded-full text-white "
                    v-for="(item, index) in specialarray"
                    :key="index"
                    >
                    <span class="text-xs w-full text-center">{{ item }}</span>
                    <close-icon
                        class="mt-1 cursor-pointer"
                        @click="removearray(index)"
                    />
                    </div> -->
              
      
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
import ISpecial from "@/types/ISpecial";
import FhirInput from "@/components/fhir-input.vue";
import SelectOption from "@/components/custom-checkbox.vue";

const special = namespace("special");
const dropdown = namespace("dropdown");

@Options({
  name: "specialModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    Multiselect,
    FhirInput,
    CornieDialog,
    SearchIcon,
    IconInput,
    CornieBtn,
    CancelIcon,
    SelectOption,
    CornieSelect,
    CloseIcon
  },
})
export default class SpecialModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  directorId!: string;


  loading = false;
  specialarray = [] as any;
  name = [];

 @dropdown.Action
  getDropdowns!: (key: string) => Promise<IIndexableObject>;

  @special.State
  specialsNames!: ISpecial[];

  @special.Action
  fetchSpecialNames!: () => Promise<void>;

dropdownData = {} as IIndexableObject;


   async apply() {
    this.loading = true;
     await this.save();
    this.loading = false;
  }
   get spaciallItems() {
    return {
      text: this.name,
    };
  }
   addArray() {
       console.log("hello")
      this.specialarray.push(this.name);
    }

   removearray(index: number) {
    this.name.splice(index, 1);
  }


  get payload() {
    return this.name;
  }

  get newaction() {
    return this.id ? "Update" : "Add";
  }

 
 
  async save() {
      try {
      const response = await cornieClient().post(
        '/api/v1/specialty/',
        this.payload
      );
      if(response.success){
          this.done();
        window.notify({ msg: "Speciality saved successfully", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Speciality not saved", status: "error" });
    }
  }
  

 
  done() {
    this.$emit("special-added");
    this.show = false;
  }


  async created() {
    await this.fetchSpecialNames();
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
