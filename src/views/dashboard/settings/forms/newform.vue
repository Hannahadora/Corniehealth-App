<template>
  <div class="bg-white rounded mb-56 p-5 mt-5">
    <input
      contenteditable="false"
      v-model="formTitle"
      placholder="New Practice Forms"
      class="
      mb-12
        flex
        float-left
        border-0
        border-b-2
        w-full
        font-bold
        text-lg text-primary
        py-2
        mx-auto
      "
      type="text"
      @input="display($event)"
    />
    <div class="mt-20 w-full">
      <!-- <div class="flex w-full mt-5 mb-5 items-center">
        <span class="flex justify-end w-full">
          <div class="dropdown inline-block relative">
            <button
              type="button"
              class="
                flex
                outline-primary
                rounded-full
                text-black
                mt-5
                mr-3
                py-2
                pr-5
                pl-5
                px-3
                focus:outline-none
                hover:bg-primary
                hover:text-white
              "
            >
              <plus-icon class="mt-1 mr-2" /> Add Question
            </button>
            <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
              <li class="">
                <Select :items="items" @createdquestions="addQuestion"></Select>
              </li>
            </ul>
          </div>
          <cornie-btn
            :loading="loading"
            type="submit"
            class="
              bg-danger
              rounded-full
              text-white
              mt-5
              py-1
              pr-8
              pl-8
              px-2
              focus:outline-none
              hover:opacity-90
            "
          >
            Save Form
          </cornie-btn>
        </span>
      </div> -->
      <div class="w-full">
          <accordion-component title="Identifier" :opened="true">
              <template v-slot:default>
                  <div class="w-full grid grid-cols-3 gap-4 mt-5">
                      <cornie-input label="Name" class="required w-full" :required="true" placeholder="--Enter--"/>
                      <cornie-select label="Status" :items="['Draft','Active','Retired']" class="required w-full" :required="true" placeholder="--Select"/>
                        <div class="mb-2">
                            <label for="experiments" class="flex capitalize text-black mb-1 text-sm font-bold">
                                Experimental <span class="text-xs text-danger ml-2">*</span>
                            </label>
                            <div class="w-full flex space-x-4 mt-5 mb-3">
                                <cornie-radio
                            v-bind:value="'Yes'"
                            label="Yes"
                            class="text-xs"
                            name="question"
                            id="yes"
                                />
                                <cornie-radio
                                v-bind:value="'No'"
                                label="No"
                                name="request"
                                id="no"
                                />
                            </div>
                        </div>
                  </div>
              </template>
          </accordion-component>
         <accordion-component title="Subject" :opened="true">
              <template v-slot:default>
                  <div class="w-full grid grid-cols-3 gap-4 mt-5">
                      <cornie-select label="Subject Type" :items="['Appointment Booking','Walk-In Patients','Overall episode experience','Physician encounter/clinical impression','Diagnostic Report','Medication Dispense/Administration','Inpatient discharge','Billing & Payment Collection']" class="required w-full" :required="true" placeholder="--Select"/>
                      <cornie-input label="Purpose" class="required w-full" :required="true" placeholder="--Enter--"/>
                       <div class="mb-5">
                       <copyright-picker
                        v-model:text="inputtext"
                          v-model:date="data.dateTime"
                            label="Copyright"
                            width="w-11/12"
                            class="required"
                          />
                      </div>
                       <div class="mb-5">
                       <date-time-picker
                            label="Approval Date"
                            width="w-11/12"
                            class="required"
                          />
                      </div>
                       <div class="mb-5">
                       <date-time-picker
                            label="Effective Period "
                            :required="true"
                            width="w-11/12"
                            class="required"
                          />
                      </div>
                       <cornie-select label="Code" class="required w-full" :items="['Appointment Booking','Walk-In Patients','Overall episode experience','Physician encounter/clinical impression','Diagnostic Report','Medication Dispense/Administration','Inpatient discharge','Billing & Payment Collection']"  placeholder="--Select"/>
                  </div>
              </template>
          </accordion-component>
      </div>
      <div class="bg-gray-100 w-full rounded h-full py-6 px-3 mt-5">
          <div class="flex space-x-2 float-right -mt-3 cursor-pointer" @click="addQuestion">
                <section-icon class="float-right"/> 
                <p class="float-right text-sm">Add Section</p>
          </div>
      </div>
          <draggable
          v-model="questions"
          item-key="id"
          group="people"
          class="my-2 pb-2 border-0 w-full flex-col rounded-md flex"
            >
            <template #item="{ element, index }">
                    <all-forms :opened="true"  :num1="firstnum + index" :num2="4" :title="element.name">
                        <template v-slot:default>
                            <div class="bg-gray-100 w-full h-full py-6 px-3">
                                <p class="text-sm font-semibold float-left -mt-3">Item Types</p>
                                <div class="flex space-x-2 float-right -mt-3 cursor-pointer">
                                        <display-icon class="float-right"/> 
                                        <p class="float-right text-sm">Display</p>
                                </div>
                                <div class="flex space-x-2 float-right -mt-3 cursor-pointer mr-5">
                                        <question-icon class="float-right"/> 
                                        <p class="float-right text-sm">Add question</p>
                                </div>
                                <div class="flex space-x-2 float-right -mt-3 cursor-pointer mr-5">
                                        <group-icon class="float-right"/> 
                                        <p class="float-right text-sm">Add group</p>
                                </div>           
                            </div>
                            <accordion-component class="pb-10" editabetitle="Group" :opened="true" :text="true" :video="true" :move="true" :question="true" :image="true">
                                <template v-slot:default>
                                    <div class="w-full grid grid-cols-2  col-span-full mt-5">
                                        <cornie-input label="Prefix" class="required" :required="true" placeholder="--Enter--"/>
                                        <cornie-input label="Text" class="required ml-3" :required="true" placeholder="--Enter--"/>
                                    </div>
                                    <div class="p-5 justify-center items-center h-full">
                                            <accordion-component class="h-11/12 pb-10" editabetitle="Questions (s)" :opened="true" :text="true" :video="true" :image="true" :move="true">
                                                <template v-slot:default>
                                                  <div class="flex space-x-9 mt-5 w-full">
                                                    <div class="w-full">
                                                      <div class="w-full grid grid-cols-3  col-span-full mt-3">
                                                          <cornie-input label="Prefix" class="required" :required="true" placeholder="--Enter--"/>
                                                              <cornie-input label="Question Text" class="required ml-3" :required="true" placeholder="--Enter--"/>
                                                              <cornie-select label="Answer Option" class="required w-full" :items="['paragraph', 'radio-button', 'checkbox']"  placeholder="--Select"/>
                                                      </div>
                                                      <div class="mt-4">
                                                          <span class="flex item-center mb-2">
                                                            <select-option/>
                                                            <span contenteditable="true"  class="text-sm mt-2 w-full">Option 1</span>
                                                          </span>
                                                          <span class="flex item-center mb-2">
                                                              <select-option/>
                                                                <span contenteditable="true"  class="text-sm mt-2 w-full">Option 2</span>
                                                          </span>
                                                        <span class="flex item-center mb-2">
                                                              <select-option />
                                                              <span contenteditable="true"  class="text-sm mt-2 w-full">Option 3
                                                                <div class="border-b-2 border-gray-200 w-full pt-3">
                                                                  <cancel-icon class="float-right -mt-3 cursor-pointer"/>
                                                              </div>
                                                              </span>
                                                          </span>
                                                          <span class="cursor-pointer text-danger mr-2 text-xs  float-left">Add new option</span>
                                                      </div>
                                                      <div class="mt-20 flex space-x-4 w-full">
                                                          <tooltip text="Answer is optional & not visible to the patients">
                                                          <div class="text-black text-sm font-bold flex space-x-2">
                                                          <span>Answer</span>   
                                                              <tooltip-icon class="cursor-pointer"/>
                                                              <template></template>
                                                      </div>
                                                          </tooltip>
                                                          <div class="text-black w-full flex space-x-2 text-sm cursor-pointer"><question-icon/> <span>Add</span></div>
                                                      </div>
                                                      <div class="flex space-x-4 float-right">
                                                          <copyform-icon class="float-right"/>
                                                          <delete-icon class="float-right"/>
                                                      </div>
                                                    </div>
                                                    <div></div>
                                                  </div>

                                                </template>
                                            </accordion-component>
                                    </div>
                                    <div class="flex space-x-4 float-right">
                                            <copyform-icon class="float-right"/>
                                            <delete-icon class="float-right"/>
                                        </div>
                                </template>
                            </accordion-component>
                                

                        </template>
                    </all-forms>
            </template>
          </draggable>
           <draggable
          v-model="questions"
          item-key="id"
          group="people"
          class="my-2 pb-2 border-0 w-full flex-col rounded-md flex"
            >
            <template #item="{ element, index }">
                    <all-forms :opened="true"  :num1="2" :num2="4" :title="element.name" :num="index">
                        <template v-slot:default>
                            <div class="bg-gray-100 w-full h-full py-6 px-3">
                                <p class="text-sm font-semibold float-left -mt-3">Item Types</p>
                                <div class="flex space-x-2 float-right -mt-3 cursor-pointer">
                                        <display-icon class="float-right"/> 
                                        <p class="float-right text-sm">Display</p>
                                </div>
                                <div class="flex space-x-2 float-right -mt-3 cursor-pointer mr-5">
                                        <question-icon class="float-right"/> 
                                        <p class="float-right text-sm">Add question</p>
                                </div>
                                <div class="flex space-x-2 float-right -mt-3 cursor-pointer mr-5">
                                        <group-icon class="float-right"/> 
                                        <p class="float-right text-sm">Add group</p>
                                </div>           
                            </div>
                                    <div class="p-5 justify-center items-center h-full">
                                            <accordion-component class="h-11/12 pb-10" editabetitle="Question" :opened="true" :text="true" :video="true" :image="true" :move="true">
                                                <template v-slot:default>
                                                    <div class="flex space-x-9 mt-5 w-full">
                                                      <div class="w-full">
                                                        <div class="w-full grid grid-cols-3  col-span-full mt-3">
                                                            <cornie-input label="Prefix" class="required" :required="true" placeholder="--Enter--"/>
                                                                <cornie-input label="Question Text" class="required ml-3" :required="true" placeholder="--Enter--"/>
                                                                <cornie-select label="Answer Option" class="required w-full" :items="['paragraph', 'radio-button', 'checkbox']"  placeholder="--Select"/>
                                                        </div>
                                                        <div class="mt-4">
                                                            <span class="flex item-center mb-6">
                                                                <cornie-radio  name="question"/>
                                                                <span contenteditable="true"  class="text-sm  w-full">I don’t smoke
                                                                </span>
                                                            </span>
                                                            <span class="flex item-center mb-6">
                                                                <cornie-radio  name="question"/>
                                                                <span contenteditable="true"  class="text-sm w-full">Sparingly
                                                                </span>
                                                            </span>
                                                            <span class="flex item-center mb-4">
                                                                <cornie-radio name="question" />
                                                                <span contenteditable="true"  class="text-sm  w-full">I smoke always
                                                                <div class="border-b-2 border-gray-200 w-full pt-3">
                                                                    <cancel-icon class="float-right -mt-3 cursor-pointer"/>
                                                                </div>
                                                                </span>
                                                            </span>
                                                            <span class="cursor-pointer text-danger mr-2 text-xs  float-left">Add new option</span>
                                                      
                                                        </div>
                                                        <div class="mt-20 flex space-x-4 w-full">
                                                            <tooltip text="Answer is optional & not visible to the patients">
                                                            <div class="text-black text-sm font-bold flex space-x-2">
                                                            <span>Answer</span>   
                                                                <tooltip-icon class="cursor-pointer"/>
                                                                <template></template>
                                                        </div>
                                                            </tooltip>
                                                            <div class="text-black w-full flex space-x-2 text-sm cursor-pointer"><question-icon/> <span>Add</span></div>
                                                        </div>
                                                        <div class="grid grid-cols-3 gap-4 ">
                                                            <cornie-select  class="required w-full mt-2" :items="['Draft','Active','Retired']"  placeholder="--Select"/>
                                                        </div>
                                                        <div class="flex space-x-4 float-right">
                                                            <copyform-icon class="float-right"/>
                                                            <delete-icon class="float-right"/>
                                                        </div>
                                                      </div>
                                                      <div></div>
                                                    </div>
                                                </template>
                                            </accordion-component>
                                    </div>
                        </template>
                    </all-forms>
            </template>
          </draggable>
            <draggable
          v-model="questions"
          item-key="id"
          group="people"
          class="my-2 pb-2 border-0 w-full flex-col rounded-md flex"
            >
            <template #item="{ element, index }">
                    <all-forms :opened="true"  :num1="3" :num2="4" :title="element.name" :num="index">
                        <template v-slot:default>
                            <div class="bg-gray-100 w-full h-full py-6 px-3">
                                <p class="text-sm font-semibold float-left -mt-3">Item Types</p>
                                <div class="flex space-x-2 float-right -mt-3 cursor-pointer">
                                        <display-icon class="float-right"/> 
                                        <p class="float-right text-sm">Display</p>
                                </div>
                                <div class="flex space-x-2 float-right -mt-3 cursor-pointer mr-5">
                                        <question-icon class="float-right"/> 
                                        <p class="float-right text-sm">Add question</p>
                                </div>
                                <div class="flex space-x-2 float-right -mt-3 cursor-pointer mr-5">
                                        <group-icon class="float-right"/> 
                                        <p class="float-right text-sm">Add group</p>
                                </div>           
                            </div>
                            <div class="p-5 justify-center items-center h-full">
                                    <accordion-component class="h-11/12 pb-10" editabetitle="Question" :opened="true" :text="true" :video="true" :image="true" :move="true">
                                        <template v-slot:default>
                                           <div class="flex space-x-9 mt-5 w-full">
                                              <div class="w-full">
                                                <div class="w-full grid grid-cols-3  col-span-full mt-3">
                                                    <cornie-input label="Prefix" class="required" :required="true" placeholder="--Enter--"/>
                                                        <cornie-input label="Question Text" class="required ml-3" :required="true" placeholder="--Enter--"/>
                                                        <cornie-select label="Answer Option" class="required w-full" :items="['paragraph', 'radio-button', 'checkbox']"  placeholder="--Select"/>
                                                </div>
                                                <div class="mt-4">
                                                <div class="mt-5">
                                                    <input type="text" class="border-b-2 border-gray-100 w-full mt-5" placeholder="Enter text..."/>
                                                    <input type="text" class="border-b-2 border-gray-100 w-full mt-5"/>
                                                </div>
                                                
                                                </div>
                                                <div class="mt-20 flex space-x-4 w-full">
                                                    <tooltip text="Answer is optional & not visible to the patients">
                                                    <div class="text-black text-sm font-bold flex space-x-2">
                                                    <span>Answer</span>   
                                                        <tooltip-icon class="cursor-pointer"/>
                                                        <template></template>
                                                </div>
                                                    </tooltip>
                                                    <div class="text-black w-full flex space-x-2 text-sm cursor-pointer"><question-icon/> <span>Add</span></div>
                                                </div>
                                                <div class="flex space-x-4 float-right">
                                                    <copyform-icon class="float-right"/>
                                                    <delete-icon class="float-right"/>
                                                </div>
                                              </div>
                                              <div></div>
                                           </div>
                                        </template>
                                    </accordion-component>
                            </div>
                        </template>
                    </all-forms>
            </template>
          </draggable>
          <draggable
          v-model="questions"
          item-key="id"
          group="people"
          class="my-2 pb-20 border-0 w-full flex-col rounded-md flex"
            >
            <template #item="{ element, index }">
                    <all-forms :opened="true"  :num1="4" :num2="4" :title="element.name" :num="index">
                        <template v-slot:default>
                            <div class="bg-gray-100 w-full h-full py-6 px-3">
                                <p class="text-sm font-semibold float-left -mt-3">Item Types</p>
                                <div class="flex space-x-2 float-right -mt-3 cursor-pointer">
                                        <display-icon class="float-right"/> 
                                        <p class="float-right text-sm">Display</p>
                                </div>
                                <div class="flex space-x-2 float-right -mt-3 cursor-pointer mr-5">
                                        <question-icon class="float-right"/> 
                                        <p class="float-right text-sm">Add question</p>
                                </div>
                                <div class="flex space-x-2 float-right -mt-3 cursor-pointer mr-5">
                                        <group-icon class="float-right"/> 
                                        <p class="float-right text-sm">Add group</p>
                                </div>           
                            </div>
                            <div class="p-5 justify-center items-center h-full">
                                    <accordion-component class="h-11/12 pb-10" editabetitle="Display" :opened="true" :text="true" :video="true" :image="true" :move="true">
                                        <template v-slot:default>
                                             <div class="flex space-x-9 mt-5 w-full">
                                              <div class="w-full">
                                                    <div class="mt-5">
                                                        <cornie-input label="text"  class="border-b-2 border-gray-100 w-full mt-5" :required="true" placeholder="Enter text..."/>
                                                    
                                                    </div>
                                              </div>
                                              <div></div>
                                            </div>
                                        </template>
                                    </accordion-component>

                            </div>
                        </template>
                    </all-forms>
            </template>
          </draggable>
            <span class="flex justify-end w-full">
              <button
                @click="$router.push('/dashboard/provider/experience/tasks')"
                type="button"
                class="outline-primary rounded-full text-black mt-5 mr-3 py-2 pr-14 pl-14 px-3 focus:outline-none hover:bg-primary hover:text-white"
              >
                Cancel
              </button>

                <button
               @click="showPreview"
                class="bg-danger rounded-full font-semibold text-white mt-5 pr-5 pl-5 focus:outline-none hover:opacity-90"
              >
                Preview |  Submit
              </button>
            </span>

    </div>
  </div>
    <view-modal  
          v-model="showPreviewModal"/>

</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccordionComponent from "@/components/form-accordion.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import CornieSelect from "@/components/cornieselect.vue";
import IPracticeform, { Question } from "@/types/IPracticeform";
import InfoIcon from "@/components/icons/info.vue";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import Select from "@/components/newautocomplete.vue";
import { Prop, Watch, PropSync } from "vue-property-decorator";
import OrgSelect from "@/components/orgSelect.vue";
import AllQuestions from "@/components/questions.vue";
import AllForms from "@/components/form.vue";
import MoveIcon from "@/components/icons/move.vue";
import DeleteIcon from "@/components/icons/deleteorange.vue";
import CancelIcon from "@/components/icons/formcancel.vue";
import CopyIcon from "@/components/icons/copy.vue";
import PlusIcon from "@/components/icons/plus.vue";
import SectionIcon from "@/components/icons/section.vue";
import GroupIcon from "@/components/icons/groupform.vue";
import QuestionIcon from "@/components/icons/addform.vue";
import DisplayIcon from "@/components/icons/formtext.vue";
import ResponseIcon from "@/components/icons/response.vue";
import Draggable from "vuedraggable";
import TableOptions from "@/components/table-options.vue";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import DateTimePicker from '@/components/date-time-picker.vue';
import CopyrightPicker from '@/components/copyright.vue';
import Templates from "@/components/icons/templates.vue";
import Tooltip from '@/components/tooltip.vue';
import TooltipIcon from '@/components/icons/formtip.vue';
import CopyformIcon from '@/components/icons/formcopy.vue';
import ViewModal from './viewform.vue';
//import TooltipIcon from '@/components/icons/formtip.vue';
import SelectOption from "@/components/custom-checkbox.vue";

const practiceform = namespace("practiceform");
const dropdown = namespace("dropdown");

@Options({
  components: {
    InfoIcon,
    TableOptions,
    AllForms,
    SelectOption,
    DateTimePicker,
    ResponseIcon,
    TooltipIcon,
    Tooltip,
    Select,
    ThreeDotIcon,
    PlusIcon,
    MoveIcon,
    AllQuestions,
    ViewModal,
    CancelIcon,
    GroupIcon,
    QuestionIcon,
    CornieRadio,
    CopyformIcon,
    DisplayIcon,
    CornieCheckbox,
    CopyrightPicker,
    CornieInput,
    CornieSelect,
    SectionIcon,
    AccordionComponent,
    Draggable,
    DeleteIcon,
    CopyIcon,
    Templates,
  },
})
export default class AddPracticeform extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  @practiceform.State
  practiceformsquestions!: IPracticeform[];

  @practiceform.State
  practiceformstemplates!: IPracticeform[];

  @practiceform.Action
  getPracticeformById!: (id: string) => IPracticeform;

showPreviewModal = false;
  loading = false;
  expand = false;
  displayValidation= false;
  displayValidation2 = false;
  displayValidation1 = false;

firstnum = 1;
  isVisible = "";
  questionoptionsothers = [""] as any;
  questionoptionothers = [""];

  //  questionforms = [] as  any;
  //   questionform= [];
 data: any = {
    days: [],
  }

  items = ["Habits", "Diet Template", "Exercise", "Sleep", "Others"];

inputtext="";
  othersType = "";
  habitType = "";
  formType = "";
  formTitle = "New Practice Forms";
  displayTitle = "Blank Form";
  description = "Kindly tell us about your medical history!";
  question = "Type question here";

  answerType = "paragraph";
  answerOptions = [] as any;

  questionOptions = [] as any;
  questionOption = [];

  questions: Question[] = [
    {
      name: "Others",
      answerOptions: [""],
      question: "Type questions",
      answerType: "paragraph",
      validation:{},
    },
  ];
  getEmptyQuestion(): Question {
    return {
      question: "Type question here",
      name: "Others",
      answerType: "paragraph",
      answerOptions: [""],
      validation:{},
    };
  }

  required = string().required();

  dropdowns = {} as IIndexableObject;
  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  @Watch("id")
  idChanged() {
    this.setPracticeform();
  }
  async setPracticeform() {
    const practiceform = await this.getPracticeformById(this.id);
    if (!practiceform) return;
    this.formType = practiceform.formType;
    this.formTitle = practiceform.formTitle;
    this.displayTitle = practiceform.displayTitle;
    this.description = practiceform.description;
    this.questions = practiceform.questions;
  }
  get payload() {
    return {
      formType: this.formType,
      formTitle: this.formTitle,
      displayTitle: this.displayTitle,
      description: this.description,
      questions: this.questions,
    };
  }

  get allaction() {
    return this.id ? "Edit" : "Add a";
  }
 async showPreview(){
    this.showPreviewModal = true;
  }

  // async reset(){
  //   this.question = {...emptyQuestion};
  // }

// async showQuestion(){
//      this.questions.push(question);
// }
  async showOptionType(value: string) {
    this.answerType = value;
  }
  async display(e: any) {
    this.displayTitle = e.target.innerText;
    this.formType = e.target.innerText;
  }
  async changequestion() {
    this.getEmptyQuestion();
  }
  async formTitleGet(e: any) {
    this.formTitle = e.target.innerText;
  }
  async DescriptionGet(e: any) {
    this.description = e.target.innerText;
  }

  async addOptionothers(question: any, index: number) {
    this.questionoptionsothers.push(question);
    this.questions[index].answerOptions.push(question);
  }

  async ashowquestions(index: string, e: any) {
    let value = e.target.value;
    // Vue.set<Question>(this.questions,index,value)
    // this.set(this.questions,"question", value )
  }
  async addQuestion(value: string) {
    const question = value == "Others" ? this.getEmptyQuestion(): this.getTemplateQuestion(value);
    this.questions.push(question);
  }

  getTemplateQuestion(name: string) {
    return {
      question: "Type question here",
      name: name,
      answerType: "paragraph",
      answerOptions: [""],
      validation:{},
    };
  }

  async removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }
  async removeValidation1(index:number){
      this.displayValidation1 = false;
  }
  async removeValidation2(){
      this.displayValidation2 = false;
  }
  showValidation(){
    this.displayValidation = true;
    this.displayValidation1 = true;
    this.displayValidation2 = true;
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updatePracticeform();
    else await this.createPracticeform();
    this.loading = false;
  }

  async createPracticeform() {
    this.displayTitle = this.formTitle;
    this.formType = this.displayTitle;
    try {
      const response = await cornieClient().post(
        "/api/v1/practice-form",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Practice form created", status: "success" });
        this.$router.push("/dashboard/provider/settings/practice-templates");
      } else {
        window.notify({ msg: response.errors!.summary, status: "error" });
        this.$router.push("/dashboard/provider/settings/practice-templates");
      }
    } catch (error) {
      window.notify({ msg: "Practice form not created", status: "error" });
      this.$router.push("/dashboard/provider/settings/practice-templates");
    }
  }

  async updatePracticeform() {
    const url = `/api/v1/practice-form/${this.id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Practice form updated", status: "success" });
        this.$router.push("/dashboard/provider/settings/practice-templates");
      }
    } catch (error) {
      window.notify({ msg: "Practice form not updated", status: "error" });
      this.$router.push("/dashboard/provider/settings/practice-templates");
    }
  }

  async created() {
    this.setPracticeform();
    const data = await this.getDropdowns("practiceforms");
    this.dropdowns = data;
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
:focus-visible {
  outline: none;
}
::placeholder {
  color: #000;
}
.tooltip {
    color: #ffffff;
    text-align: center;
    padding: 9px;
    border-radius: 4px;
    width: 150px;
    bottom: 100%;
    opacity: 0;
    transition: opacity 1s;
    position: absolute;
    z-index: 1;
    background-color: #080056;
}
</style>