<template>
  <div class="flex justify-center mb-32 p-3 mt-2 rounded w-full">
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center font-bold mb-10 text-lg text-primary py-2"
      >
        Your bio gives patients the opportunity to know you and would be
        displayed on your public profile.
      </span>
      <text-area
        v-model="bio"
        placeholder="Write a brief experience summary."
        :rows="5"
        class="w-full"
      >
      </text-area>

      <span class="flex justify-end mt-2 w-full">
        <cornie-btn
          type="submit"
          @click="saveBio"
          :loading="loading"
          class="px-5 py-0 flex justify-center items.-cnter text-white appearance-none border-none bg-danger rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 focus-within text-center"
        >
          Save
        </cornie-btn>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Watch } from "vue-property-decorator";
import { Vue, Options, setup } from "vue-class-component";
import TextArea from "@/components/textarea.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { ErrorResponse } from "@/lib/http";

@Options({
  name: "BioProfile",
  components: {
    TextArea,
    CornieBtn,
  },
})
export default class Bio extends Vue {
  bio = "";
  loading = false as Boolean;

  created() {
    this.fetchBio();
  }

  setBio(bio: any) {
    this.bio = bio;
  }

  async fetchBio() {
    try {
      let bio = await cornieClient().get("/api/v1/user/practitioner/bio");
      this.setBio(bio.data.text);
    } catch (err) {
      if (!(err instanceof ErrorResponse))
        return window.notify({
          msg: "An error occured while fetching your bio.",
          status: "error",
        });
      const response = err.response;
      if (response.status == 403) return;
      window.notify({ msg: response.message, status: "error" });
    }
  }

  async saveBio() {
    if (this.bio === "") return;

    this.loading = true;
    try {
      await cornieClient().post("/api/v1/user/practitioner/bio", {
        text: this.bio,
      });
      this.loading = false;
      window.notify({
        msg: "Bio was updated successfully",
        status: "success",
      });
    } catch (error) {
      this.loading = false;
      window.notify({
        msg: "An error occured while updating your bio.",
        status: "error",
      });
    }
  }
}
</script>

<style></style>
