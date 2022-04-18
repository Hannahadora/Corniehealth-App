<template>
  <div class="container-fluid px-3">
    <div class="w-full">
      <div class="w-full mt-3 mb-5">
        <div class="container">
          <span class="flex items-center">
            <avatar class="mr-2" v-if="img.url" :src="img.url" />
            <avatar class="mr-2 h-20 w-20" v-else :src="img.placeholder" />
            <input
              type="file"
              accept="image/*"
              name="image"
              id="file"
              @change="img.onChange"
              hidden
            />
            <label for="file" class="add-xteristic font-bold cursor-pointer">
              Upload
            </label>
          </span>
        </div>
      </div>

      <div class="w-full my-4">
        <cornie-select
          :label="'Form'"
          v-model="data.form"
          style="width: 100%"
          :items="allForms"
          :placeholder="'Select'"
        />
      </div>

      <div class="w-full my-4">
        <cornie-select
          :label="'Pack'"
          v-model="data.pack"
          style="width: 100%"
          :items="['Option 1']"
          :placeholder="'Select'"
        />
      </div>

      <div class="w-full my-4">
        <cornie-input
          :label="'Pack Quantity'"
          v-model="data.packQuantity"
          style="width: 100%"
          :placeholder="'Enter'"
        />
      </div>

      <div class="w-full my-4">
        <cornie-select
          :label="'Strength'"
          v-model="data.strength"
          style="width: 100%"
          :items="['Option 1']"
          :placeholder="'Select'"
        />
      </div>

      <button class="w-full my-4" @click="add">
        <a class="flex add-xteristic"
          ><span class="mr-2"><add-icon /></span>
          <span>Add New Characteristics</span></a
        >
      </button>
    </div>

    <span class="w-full bg-danger">
      <span class="flex justify-end w-full m4-5">
        <cornie-btn
          class="m-5 font-semibold rounded-lg"
          style="color: #080056; border: 1px solid #080056"
          @click="() => $emit('closesidemodal')"
        >
          Cancel
        </cornie-btn>

        <cornie-btn
          class="bg-danger px-2 text-white my-5 mx-4 font-semibold rounded-lg"
          @click="() => $emit('closesidemodal')"
        >
          Save
        </cornie-btn>
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import Avatar from "@/components/avatar.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";
import AddIcon from "@/components/icons/add-orange.vue";
import { namespace } from "vuex-class";
import IPracticeform from "@/types/IPracticeform";

const practiceform = namespace("practiceform");

@Options({
  components: {
    Avatar,
    CornieSelect,
    CornieInput,
    AddIcon,
  },
})
export default class NewVariant extends Vue {
  img = setup(() => useHandleImage());

   @practiceform.State
  practiceforms!: IPracticeform[];

  @practiceform.Action
  fetchPracticeforms!: () => Promise<void>;

  data = {
    id: Math.random() * 1999 + Math.random() * 2999,
    image: "",
    form: "",
    pack: "",
    packQuantity: "",
    strength: "",
  } as any;

  add() {
    const { form, pack, packQuantity, strength } = this.data;
    if (
      form === "" ||
      packQuantity === "" ||
      pack === "" ||
      strength === "" ||
      this.img.url === ""
    )
      return;

    this.data.image = this.img.url;

    this.$emit("added", this.data);

    this.img.url = "";

    this.reset();
  }
   get allForms() {
    if (!this.practiceforms || this.practiceforms.length === 0) return [];
    return this.practiceforms.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }

  reset() {
    this.data = {
      id: Math.random() * 1999 + Math.random() * 2999,
      image: "",
      form: "",
      pack: "",
      packQuantity: "",
      strength: "",
    } as any;
  }
}
</script>

<style scoped>
.add-xteristic {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #fe4d3c;
}
</style>
