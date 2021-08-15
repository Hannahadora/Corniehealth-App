<template>
<div class="bg-white rounded overflow-auto max-h-96 p-5 mt-5">
  <cornie-input contenteditable="true" v-model="formTitle" :value="'Blank Form'" placholder="Blank Form" class="flex float-left border-none w-full font-semibold text-xl text-primary py-2 mx-auto" type="text" @input="display($event)"/>
   <form class="mt-5 w-full" @submit.prevent="submit" autocomplete="off">
      <div class="flex w-full mt-5 mb-5 items-center">
          <span class="flex justify-end w-full">
            <div class="dropdown inline-block relative">
                <button type="button" class="flex outline-primary rounded-full text-black mt-5 mr-3 py-2 pr-5 pl-5 px-3 focus:outline-none hover:bg-primary hover:text-white">
                  <plus-icon class="mt-1 mr-2" />  Add Question
                </button>
                <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
                  <li class="">
                      <Select :items="items"  @createdquestions="addQuestion"></Select>
                  </li>
                </ul>
              </div>
            <cornie-btn  :loading="loading" type="submit" class="bg-danger rounded-full text-white mt-5 py-1 pr-8 pl-8 px-2 focus:outline-none hover:opacity-90">
                Save Form
            </cornie-btn>
          </span>
      </div>
      <div class="w-full h-screen">
        <div>
        <label class="relative top-9 ml-2 text-black">FORM TITLE: </label>
        <cornie-input contenteditable="true" v-model="formTitle" class="rounded-lg border p-2 pl-28 w-full focus:outline-none mb-6"  @input="formTitleGet($event)"/>
         </div>
         <div>
          <label class="relative top-9 ml-2 text-black">DESCRIPTION:</label>
          <cornie-input class="w-full mb-6 pl-28 text-black" @input="DescriptionGet($event)" v-model="description"/>
        </div>
       <!--- <div  contenteditable="true"  class="rounded-lg border p-2 w-full focus:outline-none mb-8"  >
           DESCRIPTION: Kindly tell us about your medical history!
        </div>-->
        
       <draggable v-model="questions" item-key="id" group="people" class="my-2 pb-32 border-0 w-full flex-col rounded-md flex">
           <template #item="{ element,index }">
              <all-questions  :title="element.name" titledescription="Export to Habits" class="" >
                    <template v-slot:default>
                        <div class="border-2 border-gray-200 pb-14" >
                          <div>
                            <div class="w-full grid grid-cols-2 gap-4 p-5">
                                  <cornie-input  label="Question"  placeholder="--Type question here--" class="mb-6 text-black col-span-2" v-model="questions[index].question" @input="ashowquestions(index,$event)"/>
                                  <cornie-select :rules="required" :items="['paragraph','radio-button','checkbox']"  @change="showOptionType(answerType)" v-model="questions[index].answerType" label="Answer Type" placeholder="Paragraph">
                                  </cornie-select>
                                  <cornie-input  label="Answer" v-model="questions[index].answerOptions"  v-if="questions[index].answerType === 'paragraph'" placeholder="--Placeholder--" class="mb-6 text-black col-span-2" />
                                    <div v-if="questions[index].answerType === 'radio-button'">
                                      <div  v-for="(input, index) in questionoptionsothers" :key="`${index}`">
                                        <span class="flex item-center mb-2">
                                          <cornie-radio class="text-black col-span-2"/>
                                          <span contenteditable="true" class="mt-3">Option</span>
                                        </span>
                                      </div>
                                      <span class="cursor-pointer text-danger mt-5 mr-2 font-bold float-left" @click="addOptionothers(questionoptionsothers,index)">Add option</span>
                                  </div>
                                  <div class="flex flex-col" v-if="questions[index].answerType === 'checkbox'">
                                      <div  v-for="(input, index) in questionoptionsothers" :key="`${index}`">
                                        <span class="flex item-center mb-2">
                                          <label class="inline-flex items-center mt-3">
                                              <input type="checkbox" class="form-checkbox h-5 w-5">
                                          </label>
                                          <span contenteditable="true" class="mt-3 ml-3">Checkbox</span>
                                        </span> 
                                      </div>
                                      <span class="cursor-pointer text-danger mt-5 mr-2 font-bold float-left" @click="addOptionothers(questionoptionsothers)">Add option</span>
                                  </div>
                            </div>
                            <div class="w-full">
                                  <span class="cursor-pointer text-danger mt-5 mr-2 font-bold float-right" @click="removeQuestion(index)">Delete</span>
                            </div>
                          </div>
                        </div>
                    </template>
              </all-questions>
           </template>
       </draggable>
      </div>
    </form>
</div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccordionComponent from "@/components/accordion-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import CornieSelect from "@/components/cornieselect.vue";
import IPracticeform, {  Question } from "@/types/IPracticeform";
import InfoIcon from "@/components/icons/info.vue";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import Select from "@/components/newautocomplete.vue";
import { Prop, Watch , PropSync} from "vue-property-decorator";
import OrgSelect from "@/components/orgSelect.vue";
import AllQuestions from "@/components/questions.vue";
import MoveIcon from "@/components/icons/move.vue";
import PlusIcon from "@/components/icons/plus.vue";
import Draggable from "vuedraggable";

const practiceform = namespace("practiceform");
const dropdown = namespace("dropdown");

@Options({
  components: {
    InfoIcon,
    Select,
    PlusIcon,
    MoveIcon,
    AllQuestions,
    CornieRadio,
    CornieCheckbox,
    CornieInput,
    CornieSelect,
    AccordionComponent,
    Draggable
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

  loading = false;
  expand = false;

  isVisible = '';
  questionoptionsothers = [""] as  any;
  questionoptionothers= [""];

//  questionforms = [] as  any;
//   questionform= [];
  
  items = ['Habits','Diet Template','Exercise','Sleep','Others'];
 
  othersType ="";
  habitType ="";
  formType = "";
  formTitle = "Blank Form";
  displayTitle = "Blank Form";
  description = "Kindly tell us about your medical history!";
  question = "Type question here";
  name = "Others";
  answerType ="paragraph";
  answerOptions = [] as any;

   questionOptions = [] as any;
   questionOption = [];

  questions: Question[] = [{name:'Others',answerOptions:[""],question:"Type questions", answerType:"paragraph"}];
  getEmptyQuestion(): Question {
    return{
      question: "Type question here",
      name: "Others",
      answerType: "paragraph",
      answerOptions:  [""], 
    }
  };
  

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
        formType:  this.formType,
        formTitle:  this.formTitle,
        displayTitle:  this.displayTitle,
        description:  this.description,
        questions:  this.questions,
    }
   }

  get allaction() {
    return this.id ? "Edit" : "Add a";
  }
 

  // async reset(){
  //   this.question = {...emptyQuestion};
  // }

    async showOptionType(value:string){
        this.answerType = value;
    }
    async display(e:any){
      this.displayTitle = e.target.innerText;
      this.formType = e.target.innerText;
    }
    async changequestion(){
      this.getEmptyQuestion();
    }
    async formTitleGet(e:any){
      this.formTitle = e.target.innerText;
    }
    async DescriptionGet(e:any){
      this.description = e.target.innerText;
    }
    
    async addOptionothers(question:any,index:number) {
    this.questionoptionsothers.push(question);
       this.questions[index].answerOptions.push(question);
    }
  
    async ashowquestions(index:string,e:any){
      let value = e.target.value;
     // Vue.set<Question>(this.questions,index,value)
     // this.set(this.questions,"question", value )
    }
    async addQuestion(value:string) {
      const question = 
      value == "Others"
      ? this.getEmptyQuestion()
      : this.getTemplateQuestion(value);
      this.questions.push(question);
    }

    getTemplateQuestion(name:string){
      return{
        question: "Type question here",
        name: name,
        answerType:"paragraph",
        answerOptions: [""],
      }
    }
    
    async removeQuestion(index:number) {
          this.questions.splice(index, 1);
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
          this.$router.push('/dashboard/provider/settings/practice-templates')
      }else{
         window.notify({ msg: response.message, status: "error" });
          this.$router.push('/dashboard/provider/settings/practice-templates')
      }
    } catch (error) {
      window.notify({ msg: error, status: "error" });
      this.$router.push('/dashboard/provider/settings/practice-templates')
    }
  }
 

  async updatePracticeform() {
    const url = `/api/v1/practice-form/${this.id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Practice form updated", status: "success" });
        this.$router.push('/dashboard/provider/settings/practice-templates')
      }
    } catch (error) {
       window.notify({ msg: "Practice form not updated", status: "error" });
       this.$router.push('/dashboard/provider/settings/practice-templates')
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
.outline-primary{
    border: 2px solid #211F45;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
:focus-visible {
    outline: none;
}
::placeholder{
  color:#000;

}
</style>