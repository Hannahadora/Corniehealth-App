<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col h-full bg-white">
      <cornie-card-title class="">
        <icon-btn @click="show = false" >
          <arrow-left stroke="#ffffff"/>
        </icon-btn>
        <div class="w-full border-l-2 border-gray-300">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            New Function
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="p-4 flex-grow flex flex-col">
    
          <cornie-input
            class="w-full mb-6"
            label="function name"
            placeholder="--Enter--"
            v-model="functionName"
            :rules="required"
          />
          <div class="mb-6">
            <cornie-select
              class="w-full"
              label="Hierarchy"
              placeholder="--Select--"
              v-model="hierarchy"
              :items="hierarchies"
              :rules="required"
            />
          </div>
          <cornie-select
            class="w-full"
            label="supervisory function"
            placeholder="--Select--"
            v-model="supervisoryFunction"
            :items="supervisoryFunctions"
          />
          <custom-checkbox
            label="Automatically create a group for this function"
          />
      
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
            @click="submit"
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
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import { namespace } from "vuex-class";
import IFunction from "@/types/IFunction";
import { CornieUser } from "@/types/user";
import { string } from "yup";
import { quantumClient } from "@/plugins/http";

const hierarchy = namespace("hierarchy");
const orgFunctions = namespace("OrgFunctions");
const user = namespace("user");

@Options({
  name: "AddFunction",
  components: {
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    AddFunction,
    IconBtn,
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,
  },
})
export default class AddFunction extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;

  required = string().required();

  @Prop({ type: Object, default: {} })
  edit!: IFunction;

  functionName = "";
  hierarchy = "";
  supervisoryFunction = "";
  loading = false;

  @orgFunctions.State
  functions!: IFunction[];

  @orgFunctions.Action
  fetchFunctions!: () => Promise<void>;

  @orgFunctions.Mutation
  setFunctions!: (f: IFunction[]) => Promise<void>;

  @hierarchy.State
  categories!: { id: string; name: string }[];

  @user.Getter
  cornieUser!: CornieUser;

  @Watch("edit")
  editing() {
    if (!this.edit?.id) return;
    const func = this.edit;
    this.functionName = func.name;
    this.hierarchy = func.hierarchy || "";
    this.supervisoryFunction = func.reportingTo || "";
  }

  get hierarchies() {
    return this.categories.map((category) => ({
      code: category.id,
      display: category.name,
    }));
  }

  get orgId() {
    return this.cornieUser.organizationId;
  }

  get payload() {
    const payload: any = {
      orgId: this.orgId,
      name: this.functionName,
      hierarchyId: this.hierarchy,
      createdBy: this.cornieUser.id,
    };
    if (this.supervisoryFunction)
      payload.reportingTo = this.supervisoryFunction;
    if (this.edit?.id) payload.functionId = this.edit.id;
    return payload;
  }

  async submit() {
    this.loading = true;
    if (this.edit?.id) await this.update();
    else await this.create();
    this.loading = false;
  }

  async create() {
    try {
      const { data } = await quantumClient().post(
        "/org/functions",
        this.payload
      );
      const { orgFunction } = data;
      this.setFunctions([orgFunction]);
      window.notify({ msg: "Function created", status: "success" });
    } catch (error) {
      console.error(error);
      window.notify({ msg: "Function not created", status: "error" });
    }
  }

  async update() {
    try {
      const { data } = await quantumClient().patch(
        "/org/functions",
        this.payload
      );
      const { orgFunctions } = data;
      this.setFunctions([orgFunctions]);
    } catch (error) {
      window.notify({ msg: "Function not updated", status: "error" });
    }
  }

  get supervisoryFunctions() {
    return this.functions.map((f) => ({ code: f.id, display: f.name }));
  }

  @hierarchy.Action
  fetchCategories!: () => Promise<void>;

  created() {
    if (!this.categories.length) this.fetchCategories();
    if (!this.functions?.length) this.fetchFunctions();
  }
}
</script>
