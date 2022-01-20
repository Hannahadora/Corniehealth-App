<template>
  <div class="container-fluid h-screen topest">
    <div class="w-full">
      <div class="w-full mb-8">
        <div class="w-full border-b-2 curved flex py-2">
          <div class="container-fluid flex font-semibold text-xl py-2">
            <h2>Signature</h2>
          </div>
        </div>
      </div>

      <div class="w-full">
        <div
          class="container-fluid border-dashed drag-area py-6 flex items-center justify-center"
        >
          <div class="w-3/12 text-center">
            <p class="my-3">Drag and Drop items here</p>
            <p class="my-3">Or</p>

            <label for="x">
              <span
                ><p class="my-3">
                  <a class="font-semibol cursor-pointer font-semibold"
                    >Browse Files</a
                  >
                </p></span
              >
              <input
                type="file"
                name="x"
                id="x"
                @change="image.onChange"
                ref="filePicker"
                class="file-picker"
              />
            </label>
            <span class="flex items-center justify-center mt-3 mb-3">
              <avatar class="mr-2" v-if="image.url" :src="image.url" />
            </span>
          </div>
        </div>
      </div>

      <div class="w-full mt-8">
        <div class="container-fluid">
          <p class="font-semibold link-color primary-text">
            Select documents to append signature
          </p>
        </div>

        <div class="container-fluid flex flex-col">
          <label
            class="inline-flex items-center my-4"
            v-for="(document, index) in documents"
            :key="index"
          >
            <input
              type="checkbox"
              class="form-radio h-6 w-6"
              v-model="document.selected"
              name="schedule"
            />
            <span class="ml-2">{{ document.display }}</span>
          </label>
        </div>
      </div>

      <div class="w-full mt-8">
        <div class="w-full mt-6 mb-2 flex justify-end border-t-2 pt-8">
          <Button
            :loading="loading"
            class="focus:outline-none"
            @click="updateSignature"
          >
            <span
              style="background: #fe4d3c"
              class="text-white-500 curved border cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full"
            >
              Update Now
            </span>
          </Button>
        </div>
      </div>

      <div class="w-full mt-8" style="height: 100px"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import Button from "@/components/globals/corniebtn.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import { namespace } from "vuex-class";
import Avatar from "@/components/avatar.vue";

const userSettingsStore = namespace("usersettings");

@Options({
  components: {
    Button,
    Avatar,
  },
})
export default class UserSignature extends Vue {
  @userSettingsStore.Action
  postSignature!: (body: any) => Promise<boolean>;
  loading = false;

  documents: any = [
    {
      code: "Birth Certificate",
      display: "Birth Certificate",
      selected: false,
    },
    { code: "Prescriptions", display: "Prescriptions", selected: false },
    { code: "Forms", display: "Forms", selected: false },
    {
      code: "Death Certificate",
      display: "Death Certificate",
      selected: false,
    },
  ];

  image = setup(() => useHandleImage());
  file: any = {};

  async updateSignature(e: any) {
    try {
      this.loading = true;
      await this.postSignature({
        url: this.image.url,
        documents: this.documents
          .filter((i: any) => i.selected)
          .map((i: any) => i.code),
      });
      this.loading = false;
      notify({
        msg: "Signature uploaded successfully",
        status: "success",
      });
    } catch (error) {
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.drag-area {
  border: 2px dashed #c5c4d4;
  box-sizing: border-box;
  border-radius: 4px;
}

.link-color {
  color: #fe4d3c;
}

.topest {
  min-height: 100vh;
  overflow-y: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.topest::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.topest {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.file-picker {
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>
