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
          :items="['Option 1']"
        />
      </div>

      <div class="w-full my-4">
        <cornie-select
          :label="'Pack'"
          v-model="data.pack"
          style="width: 100%"
          :items="['Option 1']"
        />
      </div>

      <div class="w-full my-4">
        <cornie-input
          :label="'Pack Quantity'"
          v-model="data.packQuantity"
          style="width: 100%"
        />
      </div>

      <div class="w-full my-4">
        <cornie-select
          :label="'Strength'"
          v-model="data.strength"
          style="width: 100%"
          :items="['Option 1']"
        />
      </div>

      <div class="w-full my-4">
        <a class="flex add-xteristic"
          ><span class="mr-2"><add-icon /></span>
          <span>Add New Characteristics</span></a
        >
      </div>
    </div>

    <span class="w-full bg-danger">
      <span class="flex justify-end w-full m4-5">
        <cornie-btn
          class="m-5 font-semibold rounded-full"
          style="color: #080056; border: 1px solid #080056"
          @click="() => $emit('closesidemodal')"
        >
          Cancel
        </cornie-btn>

        <cornie-btn
          class="bg-danger px-2 text-white my-5 mx-4 font-semibold rounded-full"
          @click="onSave"
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

  data = {} as any;

  onSave() {
    this.$emit("added", this.data);
    this.$emit("closesidemodal");
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
