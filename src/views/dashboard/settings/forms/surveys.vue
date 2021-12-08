<template>
  <div class="bg-white rounded mb-56 p-5 mt-5">
    <input
      contenteditable="false"
      v-model="name"
      placholder="Questionnaires"
      class="mb-12 flex float-left border-0 border-b-2 w-full font-bold text-lg text-primary py-2 mx-auto"
      type="text"
      @input="display($event)"
    />
    <div class="mt-20 w-full">
      <div class="w-full">
        <accordion-component title="Identifier" :opened="true">
          <template v-slot:default>
            <div class="w-full grid grid-cols-3 gap-4 mt-5">
              <cornie-input
                label="Name"
                class="w-full"
                v-model="name"
                :required="true"
                placeholder="--Enter--"
              />
              <cornie-select
                label="Status"
                v-model="status"
                :items="['Draft', 'Active', 'Retired']"
                class="w-full"
                :required="true"
                placeholder="--Select"
              />
              <div class="mb-2">
                <label
                  for="experiments"
                  class="flex capitalize text-black mb-1 text-sm font-bold"
                >
                  Experimental <span class="text-xs text-danger ml-2">*</span>
                </label>
                <div class="w-full flex space-x-4 mt-5 mb-3">
                  <cornie-radio
                    v-bind:value="true"
                    label="Yes"
                    v-model="experimental"
                    class="text-xs"
                    name="question"
                    id="yes"
                  />
                  <cornie-radio
                    v-bind:value="false"
                    v-model="experimental"
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
              <cornie-select
                label="Subject Type"
                v-model="subjectType"
                :items="[
                  'Appointment Booking',
                  'Walk-In Patients',
                  'Overall episode experience',
                  'Physician encounter/clinical impression',
                  'Diagnostic Report',
                  'Medication Dispense/Administration',
                  'Inpatient discharge',
                  'Billing & Payment Collection',
                ]"
                class="w-full"
                :required="true"
                placeholder="--Select"
              />
              <cornie-input
                label="Purpose"
                v-model="purpose"
                class="w-full"
                :required="true"
                placeholder="--Enter--"
              />
              <div class="mb-5">
                <copyright-picker
                  v-model:text="copyright.name"
                  v-model:date="copyright.year"
                  label="Copyright"
                  width="w-11/12"
                  class="required mt-5"
                  :required="true"
                />
              </div>
              <cornie-input
                disabled
                label="Approval Date"
                placeholder="Autofilled"
                class="w-full mb-4"
              />

              <div class="mb-5">
                <date-range-picker
                  v-model="effectivePeriod"
                  label="Effective Period "
                  :required="true"
                  width="w-11/12"
                  class="required -mt-1.5"
                />
              </div>
              <cornie-select
                label="Code"
                class="required w-full"
                :items="[
                  'Appointment Booking',
                  'Walk-In Patients',
                  'Overall episode experience',
                  'Physician encounter/clinical impression',
                  'Diagnostic Report',
                  'Medication Dispense/Administration',
                  'Inpatient discharge',
                  'Billing & Payment Collection',
                ]"
                placeholder="--Select"
                v-model="code"
              />
            </div>
          </template>
        </accordion-component>
      </div>
      <div class="bg-gray-100 w-full rounded h-full py-6 px-3 mt-5">
        <div
          class="flex space-x-2 float-right -mt-3 cursor-pointer"
          @click="addSection"
        >
          <section-icon class="float-right" />
          <p class="float-right text-sm">Add Section</p>
        </div>
      </div>

      <draggable
        v-model="sections"
        item-key="id"
        group="people"
        class="my-2 pb-2 border-0 w-full flex-col rounded-md flex"
      >
        <template #item="{ element, index }">
          <all-forms
            :opened="true"
            :num1="firstnum + index"
            :num2="index + 1"
            :title="element.name"
          >
            <template v-slot:default>
              <div class="bg-gray-100 w-full h-full py-6 px-3">
                <p class="text-sm font-semibold float-left -mt-3">Item Types</p>
                <div
                  class="flex space-x-2 float-right -mt-3 cursor-pointer"
                  @click="addmaindisplay"
                >
                  <display-icon class="float-right" />
                  <p class="float-right text-sm">Display</p>
                </div>
                <div
                  class="flex space-x-2 float-right -mt-3 cursor-pointer mr-5"
                  @click="addmainQuestion"
                >
                  <question-icon class="float-right" />
                  <p class="float-right text-sm">Add question</p>
                </div>
                <div
                  class="flex space-x-2 float-right -mt-3 cursor-pointer mr-5"
                  @click="addgroup"
                >
                  <group-icon class="float-right" />
                  <p class="float-right text-sm">Add group</p>
                </div>
              </div>
              <draggable
                v-model="groups"
                item-key="id"
                group="people"
                class="my-2 pb-20 border-0 w-full flex-col rounded-md flex"
              >
                <template #item="{ element, index }">
                  <accordion-component
                    class="pb-10"
                    @showdisplay="adddisplay"
                    v-model="groups[index].name"
                    editabetitle="Group"
                    @showonequestion="addQuestion"
                    :opened="true"
                    :text="true"
                    :video="true"
                    :move="true"
                    :question="true"
                    :image="true"
                  >
                    <template v-slot:default>
                      <div
                        class="w-full grid grid-cols-2 col-span-full mt-5"
                        :element="element"
                        :index="index"
                      >
                        <cornie-input
                          v-model="groups[index].prefix"
                          label="Prefix"
                          class="required"
                          :required="true"
                          placeholder="e.g 1."
                        />
                        <cornie-input
                          v-model="groups[index].text"
                          label="Text"
                          class="required ml-3"
                          :required="true"
                          placeholder="--Enter--"
                        />
                      </div>
                      <div class="p-5 justify-center items-center h-full">
                        <draggable
                          v-model="questions"
                          item-key="id"
                          group="people"
                          class="my-2 pb-20 border-0 w-full flex-col rounded-md flex"
                        >
                          <template #item="{ element, index }">
                            <accordion-component
                              class="h-11/12 pb-10"
                              v-model="questions[index].name"
                              :element="element"
                              :index="index"
                              @anotherdisplay="adddisplay"
                              editabetitle="Questions (s)"
                              :opened="true"
                              :text2="true"
                              :video="true"
                              :image="true"
                              :move="true"
                            >
                              <template v-slot:default>
                                <div class="flex space-x-9 mt-5 w-full">
                                  <div class="w-full">
                                    <div
                                      class="w-full grid grid-cols-3 col-span-full mt-3"
                                    >
                                      <cornie-input
                                        label="Prefix"
                                        v-model="questions[index].prefix"
                                        class="required"
                                        :required="true"
                                        placeholder="e.g 1.1"
                                      />
                                      <cornie-input
                                        label="Question Text"
                                        v-model="questions[index].text"
                                        class="required ml-3"
                                        :required="true"
                                        placeholder="--Enter--"
                                      />
                                      <cornie-select
                                        label="Answer Option"
                                        v-model="questions[index].answerType"
                                        class="required w-full"
                                        :items="[
                                          'Boolean',
                                          'Decimal',
                                          'Integer',
                                          'Date',
                                          'Date & Time',
                                          'Time',
                                          'String',
                                          'text',
                                          'Url',
                                          'choice',
                                          'openChoice',
                                          'Attachment',
                                          'Reference',
                                          'Quantity',
                                        ]"
                                        placeholder="--Select"
                                      />
                                    </div>
                                    <div
                                      v-if="
                                        questions[index].answerType ==
                                        'openChoice'
                                      "
                                    >
                                      <div
                                        class="mt-4"
                                        v-for="(
                                          input, id
                                        ) in questionoptionsothers"
                                        :key="`${id}`"
                                      >
                                        <span class="flex item-center mb-2">
                                          <select-option />
                                          <span class="text-sm w-full">
                                            <span
                                              contenteditable="true"
                                              class="text-sm mt-2 w-full"
                                              @keyup.delete="id = -1"
                                              @input="
                                                setInput($event, index, id)
                                              "
                                              >Option
                                            </span>
                                            <div
                                              class="border-b-2 border-gray-200 w-full pt-3"
                                              v-if="id >= 0"
                                            >
                                              <cancel-icon
                                                class="float-right -mt-3 cursor-pointer"
                                                @click="
                                                  questionoptionsothers.splice(
                                                    id,
                                                    1
                                                  )
                                                "
                                              />
                                            </div>
                                          </span>
                                        </span>
                                      </div>
                                      <span
                                        class="cursor-pointer text-danger mr-2 text-xs float-left"
                                        @click="
                                          addOptionothers(
                                            questionoptionsothers,
                                            index
                                          )
                                        "
                                        >Add new option</span
                                      >
                                    </div>
                                    <div
                                      v-if="
                                        questions[index].answerType == 'text'
                                      "
                                    >
                                      <div
                                        class="mt-4"
                                        v-for="(
                                          input, id
                                        ) in questionoptionsothers"
                                        :key="`${id}`"
                                      >
                                        <div class="mt-5">
                                          <input
                                            type="text"
                                            class="border-b-2 border-gray-100 w-full mt-5"
                                            v-model="
                                              questions[index].answerOptions
                                            "
                                            placeholder="Enter text..."
                                          />
                                          <input
                                            type="text"
                                            class="border-b-2 border-gray-100 w-full mt-5"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      v-if="
                                        questions[index].answerType == 'choice'
                                      "
                                    >
                                      <div
                                        class="mt-4"
                                        v-for="(
                                          input, id
                                        ) in questionoptionsothers"
                                        :key="`${id}`"
                                      >
                                        <span class="flex item-center mb-4">
                                          <cornie-radio name="question" />
                                          <span class="text-sm w-full">
                                            <span
                                              contenteditable="true"
                                              class="text-sm w-full"
                                              @input="
                                                setInput($event, index, id)
                                              "
                                              >Option
                                            </span>
                                            <div
                                              class="border-b-2 border-gray-200 w-full pt-3"
                                              v-if="id >= 0"
                                            >
                                              <cancel-icon
                                                class="float-right -mt-3 cursor-pointer"
                                                @click="
                                                  questionoptionsothers.splice(
                                                    id,
                                                    1
                                                  )
                                                "
                                              />
                                            </div>
                                          </span>
                                        </span>
                                      </div>
                                      <span
                                        class="cursor-pointer text-danger mr-2 text-xs float-left"
                                        @click="
                                          addOptionothers(
                                            questionoptionsothers,
                                            index
                                          )
                                        "
                                        >Add new option</span
                                      >
                                    </div>
                                    <div class="mt-32 flex space-x-4 w-full">
                                      <tooltip
                                        text="Answer is optional & not visible to the patients"
                                      >
                                        <div
                                          class="text-black text-sm font-bold flex space-x-2"
                                        >
                                          <span>Answer</span>
                                          <tooltip-icon
                                            class="cursor-pointer"
                                          />
                                          <template></template>
                                        </div>
                                      </tooltip>
                                      <div
                                        v-if="!showanswer"
                                        @click="showanswer = true"
                                        class="text-black w-full flex space-x-2 text-sm cursor-pointer"
                                      >
                                        <question-icon /><span>Add</span>
                                      </div>
                                    </div>
                                    <div v-if="showanswer" class="mt-2">
                                      <div class="grid grid-cols-3 gap-4">
                                        <cornie-select
                                          class="required w-full"
                                          v-model="questions[index].question"
                                          :items="[
                                            'Draft',
                                            'Active',
                                            'Retired',
                                          ]"
                                          placeholder="--Select--"
                                        />
                                      </div>
                                    </div>
                                    <div class="flex space-x-4 float-right">
                                      <copyform-icon class="float-right" />
                                      <delete-icon
                                        class="float-right cursor-pointer"
                                        @click="questions.splice(index, 1)"
                                      />
                                    </div>
                                  </div>
                                  <div></div>
                                </div>
                              </template>
                            </accordion-component>
                          </template>
                        </draggable>
                        <draggable
                          v-model="displays"
                          item-key="id"
                          group="people"
                          class="my-2 pb-20 border-0 w-full flex-col rounded-md flex"
                        >
                          <template #item="{ element, index }">
                            <accordion-component
                              class="h-11/12 pb-10"
                              :element="element"
                              :index="index"
                              @anotherdisplay="adddisplay"
                              editabetitle="Display"
                              :opened="true"
                              :text="true"
                              :video="true"
                              :image="true"
                              :move="true"
                            >
                              <template v-slot:default>
                                <div class="flex space-x-9 mt-5 w-full">
                                  <div class="w-full">
                                    <div class="mt-1">
                                      <cornie-input
                                        label="text"
                                        v-model="displays[index].display"
                                        class="border-b-2 border-gray-100 w-full mt-5"
                                        :required="true"
                                        placeholder="Enter text..."
                                      />
                                    </div>
                                  </div>
                                  <div></div>
                                </div>
                              </template>
                            </accordion-component>
                          </template>
                        </draggable>
                      </div>
                      <div class="flex space-x-4 float-right">
                        <copyform-icon class="float-right" />
                        <delete-icon
                          class="float-right cursor-pointer"
                          @click="groups.splice(index, 1)"
                        />
                      </div>
                    </template>
                  </accordion-component>
                </template>
              </draggable>
              <draggable
                v-model="mainquestions"
                item-key="id"
                group="people"
                class="my-2 pb-20 border-0 w-full flex-col rounded-md flex"
              >
                <template #item="{ element, index }">
                  <accordion-component
                    class="h-11/12 pb-10"
                    :element="element"
                    :index="index"
                    @anotherdisplay="addmaindisplay"
                    editabetitle="Questions (s)"
                    :opened="true"
                    :text2="true"
                    :video="true"
                    :image="true"
                    :move="true"
                  >
                    <template v-slot:default>
                      <div class="flex space-x-9 mt-5 w-full">
                        <div class="w-full">
                          <div
                            class="w-full grid grid-cols-3 col-span-full mt-3"
                          >
                            <cornie-input
                              label="Prefix"
                              class="required"
                              :required="true"
                              v-model="mainquestions[index].prefix"
                              placeholder="--Enter--"
                            />
                            <cornie-input
                              label="Question Text"
                              class="required ml-3"
                              :required="true"
                              v-model="mainquestions[index].text"
                              placeholder="--Enter--"
                            />
                            <cornie-select
                              label="Answer Option"
                              v-model="mainquestions[index].answerType"
                              class="required w-full"
                              :items="[
                                'Boolean',
                                'Decimal',
                                'Integer',
                                'Date',
                                'Date & Time',
                                'Time',
                                'String',
                                'text',
                                'Url',
                                'choice',
                                'openChoice',
                                'Attachment',
                                'Reference',
                                'Quantity',
                              ]"
                              placeholder="--Select"
                            />
                          </div>
                          <div
                            v-if="
                              mainquestions[index].answerType == 'openChoice'
                            "
                          >
                            <div
                              class="mt-4"
                              v-for="(input, id) in questionoptionmainothers"
                              :key="`${id}`"
                            >
                              <span class="flex item-center mb-2">
                                <select-option />
                                <span class="text-sm w-full">
                                  <span
                                    contenteditable="true"
                                    class="text-sm mt-2 w-full"
                                    @keyup.delete="id = -1"
                                    @input="setInputMain($event, index, id)"
                                    >Option
                                  </span>
                                  <div
                                    class="border-b-2 border-gray-200 w-full pt-3"
                                    v-if="id >= 0"
                                  >
                                    <cancel-icon
                                      class="float-right -mt-3 cursor-pointer"
                                      @click="
                                        questionoptionmainothers.splice(id, 1)
                                      "
                                    />
                                  </div>
                                </span>
                              </span>
                            </div>
                            <span
                              class="cursor-pointer text-danger mr-2 text-xs float-left"
                              @click="
                                addMainOptionOthers(
                                  questionoptionmainothers,
                                  index
                                )
                              "
                              >Add new option</span
                            >
                          </div>
                          <div v-if="mainquestions[index].answerType == 'text'">
                            <div
                              class="mt-4"
                              v-for="(input, id) in questionoptionmainothers"
                              :key="`${id}`"
                            >
                              <div class="mt-5">
                                <input
                                  type="text"
                                  class="border-b-2 border-gray-100 w-full mt-5"
                                  v-model="mainquestions[index].answerOptions"
                                  placeholder="Enter text..."
                                />
                                <input
                                  type="text"
                                  class="border-b-2 border-gray-100 w-full mt-5"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            v-if="mainquestions[index].answerType == 'choice'"
                          >
                            <div
                              class="mt-4"
                              v-for="(input, id) in questionoptionmainothers"
                              :key="`${id}`"
                            >
                              <span class="flex item-center mb-4">
                                <cornie-radio name="question" />
                                <span class="text-sm w-full">
                                  <span
                                    contenteditable="true"
                                    class="text-sm w-full"
                                    @keyup.delete="id = -1"
                                    @input="setInputMain($event, index, id)"
                                    >Option
                                  </span>
                                  <div
                                    class="border-b-2 border-gray-200 w-full pt-3"
                                    v-if="id >= 0"
                                  >
                                    <cancel-icon
                                      class="float-right -mt-3 cursor-pointer"
                                      @click="
                                        questionoptionmainothers.splice(id, 1)
                                      "
                                    />
                                  </div>
                                </span>
                              </span>
                            </div>
                            <span
                              class="cursor-pointer text-danger mr-2 text-xs float-left"
                              @click="
                                addMainOptionOthers(
                                  questionoptionmainothers,
                                  index
                                )
                              "
                              >Add new option</span
                            >
                          </div>
                          <div class="mt-32 flex space-x-4 w-full">
                            <tooltip
                              text="Answer is optional & not visible to the patients"
                            >
                              <div
                                class="text-black text-sm font-bold flex space-x-2"
                              >
                                <span>Answer</span>
                                <tooltip-icon class="cursor-pointer" />
                                <template></template>
                              </div>
                            </tooltip>
                            <div
                              v-if="!showmainanswer"
                              @click="showmainanswer = true"
                              class="text-black w-full flex space-x-2 text-sm cursor-pointer"
                            >
                              <question-icon /><span>Add</span>
                            </div>
                          </div>
                          <div v-if="showmainanswer" class="mt-2">
                            <div class="grid grid-cols-3 gap-4">
                              <cornie-select
                                class="required w-full"
                                v-model="mainquestions[index].question"
                                :items="['Draft', 'Active', 'Retired']"
                                placeholder="--Select--"
                              />
                            </div>
                          </div>
                          <div class="flex space-x-4 float-right">
                            <copyform-icon class="float-right" />
                            <delete-icon
                              class="float-right cursor-pointer"
                              @click="mainquestions.splice(index, 1)"
                            />
                          </div>
                        </div>
                        <div></div>
                      </div>
                    </template>
                  </accordion-component>
                </template>
              </draggable>
              <draggable
                v-model="maindisplays"
                item-key="id"
                group="people"
                class="my-2 pb-20 border-0 w-full flex-col rounded-md flex"
              >
                <template #item="{ element, index }">
                  <accordion-component
                    class="h-11/12 pb-10"
                    :element="element"
                    :index="index"
                    @anotherdisplay="addmaindisplay"
                    editabetitle="Display"
                    :opened="true"
                    :text="true"
                    :video="true"
                    :image="true"
                    :move="true"
                  >
                    <template v-slot:default>
                      <div class="flex space-x-9 mt-5 w-full">
                        <div class="w-full">
                          <div class="mt-5">
                            <cornie-input
                              label="text"
                              class="border-b-2 border-gray-100 w-full mt-5"
                              :required="true"
                              v-model="maindisplays[index].display"
                              placeholder="Enter text..."
                            />
                          </div>
                        </div>
                        <div></div>
                      </div>
                    </template>
                  </accordion-component>
                </template>
              </draggable>
            </template>
          </all-forms>
        </template>
      </draggable>

      <span class="flex justify-end w-full">
        <button
          @click="
            $router.push(
              '/dashboard/provider/settings/practise-management/forms-questionnaires'
            )
          "
          type="button"
          class="outline-primary rounded-full text-black mt-5 mr-3 py-1 pr-12 pl-12 px-3 focus:outline-none hover:bg-primary hover:text-white"
        >
          Cancel
        </button>
        <cornie-btn
          v-if="id"
          :loading="loading"
          @click="submit"
          class="bg-danger rounded-full font-semibold text-white mt-5 pr-5 pl-5 focus:outline-none hover:opacity-90"
        >
          Update
        </cornie-btn>
        <cornie-btn
          v-else
          @click="showPreview"
          class="bg-danger rounded-full font-semibold text-white mt-5 mr-3 py-1 pr-2 pl-2 px-1 focus:outline-none hover:opacity-90"
        >
          Preview | Submit
        </cornie-btn>
      </span>
    </div>
  </div>
  <view-modal
    v-model="showPreviewModal"
    :payload="payload"
    :sectionsPayload="sections"
  />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccordionComponent from "@/components/form-accordion.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import CornieSelect from "@/components/cornieselect.vue";
import IPracticeform, {
  Question,
  Section,
  QuestionGroup,
  Display,
  AnswerType,
  Questionmain,
  Displaymain,
} from "@/types/IPracticeform";
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
import DateTimePicker from "@/components/date-time-picker.vue";
import DateRangePicker from "@/components/daterangepicker.vue";
import CopyrightPicker from "@/components/copyright.vue";
import Templates from "@/components/icons/templates.vue";
import Tooltip from "@/components/tooltip.vue";
import TooltipIcon from "@/components/icons/formtip.vue";
import CopyformIcon from "@/components/icons/formcopy.vue";
import ViewModal from "./viewform.vue";
import IPractitioner from "@/types/IPractitioner";
import SelectOption from "@/components/custom-checkbox.vue";
import Period from "@/types/IPeriod";
import DatePicker from "@/components/datepicker.vue";

const practiceform = namespace("practiceform");
const dropdown = namespace("dropdown");
const userStore = namespace("user");

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
    DatePicker,
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
    DateRangePicker,
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

  @practiceform.Action
  getPracticeformQuestionnairesById!: (id: string) => IPracticeform;

  @userStore.Getter
  authPractitioner!: IPractitioner;

  showPreviewModal = false;
  loading = false;
  expand = false;

  firstnum = 1;
  answerOption = "openChoice";
  isVisible = "";
  questionoptionsothers = [""] as any;
  questionoptionmainothers = [""] as any;
  showcancel = false;
  data: any = {
    days: [],
  };

  showoption = false;
  showquestion = false;
  answerType = "paragraph";
  answerOptions = [] as any;

  questionOptions = [] as any;
  questionOption = [];
  checkoption = false;
  checkinput = false;
  onedisplay = false;
  //  groups: []  = [];
  // group: []  = [] as any;

  name = "Questionnaires";
  status = "";
  type = "questionnaire";
  experimental = false;
  subjectType = "";
  purpose = "";
  copyright = { name: "", year: 0 };
  approvalDate = "";
  effectivePeriod = {} as Period;
  code = "";
  display = "";
  archivedAt = "";
  AnswerType: AnswerType = [] as any;
  cancel = false;

  maindisplays: any[] = [];
  getEmptyMainDisplay(): Displaymain {
    return this.display;
  }
  displays: any[] = [];
  getEmptyDisplay(): Display {
    return this.display;
  }

  sections: Section[] = [];
  getEmptySection(): Section {
    return {
      items: [
        // this.questions as any,
        // this.groups as any,
        // this.display,
        this.mainquestions as any,
        this.groups as any,
        this.maindisplays as any,
      ],
    };
  }

  groups: QuestionGroup[] = [];
  getEmptyQuestionGroup(): QuestionGroup {
    return {
      name: "Group",
      prefix: "",
      text: "",
      items: [this.questions as any, this.displays as any],
    };
  }

  mainquestions: Questionmain[] = [];
  getEmptyMainQuestion(): Questionmain {
    return {
      question: "Type question here",
      name: "Question",
      answerType: "choice",
      answerOptions: [],
      prefix: "",
    };
  }
  questions: Question[] = [];
  getEmptyQuestion(): Question {
    return {
      question: "Type question here",
      name: "Question",
      answerType: "choice",
      answerOptions: [],
      prefix: "",
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
    const practiceform = await this.getPracticeformQuestionnairesById(this.id);
    if (!practiceform) return;
    this.name = practiceform.name;
    this.status = practiceform.status;
    this.type = practiceform.type;
    this.experimental = practiceform.experimental;
    this.subjectType = practiceform.subjectType;
    this.purpose = practiceform.purpose;
    this.copyright = practiceform.copyright;
    this.approvalDate = practiceform.approvalDate;
    this.effectivePeriod = practiceform.effectivePeriod;
    this.code = practiceform.code;
    this.sections = practiceform.sections;
    (this.groups as any) = [
      JSON.parse(JSON.stringify(practiceform.sections[0].items[1])),
    ];
    (this.mainquestions as any) = [
      JSON.parse(JSON.stringify(practiceform.sections[0].items[0])),
    ];
    (this.maindisplays as any) = [
      JSON.parse(JSON.stringify(practiceform.sections[0].items[2])),
    ];
  }
  get payload() {
    const sections = JSON.parse(JSON.stringify(this.sections));
    return {
      name: this.name,
      status: this.status,
      type: this.type,
      experimental: this.experimental,
      subjectType: this.subjectType,
      purpose: this.purpose,
      copyright: this.copyright,
      effectivePeriod: this.effectivePeriod,
      code: this.code,
      sections: sections.map(this.processSection),
    };
  }

  processQuestionGroup(questionGroup: any) {
    if (!questionGroup.items) return questionGroup;
    const items = questionGroup.items || [];
    let sanitize: any = [];
    console.log(items);
    items.forEach((item: any) => {
      if (!Array.isArray(item)) {
        sanitize.push(item);
      } else {
        if (item.length) {
          sanitize = [...sanitize, ...item];
        }
      }
    });

    questionGroup.items = JSON.parse(JSON.stringify(sanitize));
    return questionGroup;
  }
  processSection(section: any) {
    const items = section.items || [];
    let sanitize: any = [];
    console.log(items);
    items.forEach((item: any) => {
      if (!Array.isArray(item)) {
        sanitize.push(item);
      } else {
        if (item.length) {
          sanitize = [...sanitize, ...item];
          sanitize = sanitize.map(this.processQuestionGroup);
        }
      }
    });

    section.items = JSON.parse(JSON.stringify(sanitize));
    return section;
  }
  get allaction() {
    return this.id ? "Edit" : "Add a";
  }
  async showPreview() {
    this.showPreviewModal = true;
  }

  addOptionothers(question: any, index: number) {
    // this.showoption = true;
    this.questionoptionsothers.push(question);
    //this.questions[index].answerOptions?.push(this.newanswer);
  }

  addMainOptionOthers(question: any, index: number) {
    this.questionoptionmainothers.push(question);
  }

  addMainRadioOptionOthers(question: any) {
    this.questionoptionmainothers.push(question);
  }

  addOptionRadioothers(question: any, index: number) {
    this.questionoptionsothers.push(question);
  }
  async ashowquestions(index: string, e: any) {
    let value = e.target.value;
    // Vue.set<Question>(this.questions,index,value)
    // this.set(this.questions,"question", value )
  }
  async addgroup() {
    const group = this.getEmptyQuestionGroup()
      ? this.getEmptyQuestionGroup()
      : this.getTemplateGroup();
    this.groups.push(group);
  }
  async adddisplay() {
    const display = this.getEmptyDisplay()
      ? this.getEmptyDisplay()
      : this.getTemplateDisplay();
    this.displays.push(display);
  }
  async addSection(value: string) {
    const section = this.getEmptySection()
      ? this.getEmptySection()
      : this.getTemplateSection();
    this.sections.push(section);
  }
  async addmaindisplay() {
    const display = this.getEmptyMainDisplay()
      ? this.getEmptyMainDisplay()
      : this.getTemplateMainDisplay();
    this.maindisplays.push(display);
  }
  async addmainQuestion(value: string) {
    const question =
      value == "Question"
        ? this.getEmptyQuestion()
        : this.getTemplateQuestion(value);
    this.mainquestions.push(question);
  }
  async addQuestion(value: string) {
    const question =
      value == "Question"
        ? this.getEmptyQuestion()
        : this.getTemplateQuestion(value);
    this.questions.push(question);
  }

  getTemplateMainDisplay() {
    return {
      display: this.display,
    };
  }
  getTemplateDisplay() {
    return {
      display: this.display,
    };
  }
  getTemplateMainQuestion(name: string) {
    return {
      question: "Type question here",
      name: "Question",
      answerType: this.AnswerType,
      answerOptions: [],
      prefix: "",
    };
  }
  getTemplateQuestion(name: string) {
    return {
      question: "Type question here",
      name: "Question",
      answerType: this.AnswerType,
      answerOptions: [],
      prefix: "",
    };
  }
  getTemplateSection() {
    return {
      items: [
        this.getEmptyQuestion(),
        this.getEmptyQuestionGroup(),
        this.getEmptyDisplay(),
      ],
    };
  }
  getTemplateGroup() {
    return {
      name: "Group",
      prefix: "",
      text: "",
      items: [this.getEmptyQuestion(), this.getEmptyDisplay()],
    };
  }
  async removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }
  optionText = "";

  async setInput(e: any, index: number, id: number) {
    const newanswer = e.target.innerText;
    const options = this.questions[index].answerOptions || [];
    options[id] = newanswer;
    this.questions[index].answerOptions = options;
  }
  async setInputMain(e: any, index: number, id: number) {
    const newanswer = e.target.innerText;
    const options = this.mainquestions[index].answerOptions || [];
    options[id] = newanswer;
    this.mainquestions[index].answerOptions = options;
    // this.questions[index].answerOptions?.push(this.newanswer)
    // questions[index].answerOptions.push($event.target.innerText)
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updatePracticeform();
    this.loading = false;
  }

  async updatePracticeform() {
    const url = `/api/v1/practice-form/${this.id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Practice form updated", status: "success" });
        this.$router.push(
          "/dashboard/provider/settings/practise-management/forms-questionnaires"
        );
      }
    } catch (error) {
      window.notify({ msg: "Practice form not updated", status: "error" });
      // this.$router.push("/dashboard/provider/settings/practice-templates");
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
