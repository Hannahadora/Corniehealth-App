<template>
  <div>
    <div>
      <form class="mt-5 w-full" @submit.prevent="submit">
        <div class="w-full grid grid-cols-12 mb-10">
          <div class="col-span-12 mb-4">
            <cornie-input
              label="Organization Name"
              placeholder="--Enter--"
              v-model="orgName"
              :rules="required"
            />
          </div>
          <div class="col-span-12 mb-4">
            <cornie-input
              label="Email Address"
              placeholder="--Enter--"
              v-model="email"
              :rules="required"
            />
          </div>
          <div class="col-span-12 mb-4">
            <d-text
              label="Message"
              placeholder="Enter Message"
              v-model="message"
              :rules="required"
            />
          </div>
        </div>
        <span class="flex justify-end w-full">
          <button
            @click="$emit('close-add-invite')"
            type="button"
            class="outline-primary rounded-md text-black mt-5 mr-3 py-2 pr-8 pl-8 px-3 focus:outline-none hover:bg-primary hover:text-white"
          >
            Cancel
          </button>

          <cornie-btn
            :loading="loading"
            type="submit"
            class="bg-danger rounded-md text-white mt-5 pr-10 pl-10 focus:outline-none hover:opacity-90"
          >
            Save
          </cornie-btn>
        </span>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import DomainInput from "@/components/domain-input.vue";
import MultiInput from "@/components/multi-input.vue";
import DText from "./dtext.vue";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";

@Options({
  components: {
    CornieInput,
    CornieSelect,
    DomainInput,
    MultiInput,
    DText,
  },
})
export default class SendInvite extends Vue {
  loading = false;

  orgName = "";
  email = "";
  message = "";
  required = true;

  get payload() {
    return {
      orgName: this.orgName,
      email: this.email,
      message: this.message,
    };
  }

  async submit() {
    this.loading = true;
    try {
      const response = await cornieClient().get(
        "/api/v1/domain/sendInvite",
        this.payload
      );
      if (response.success) {
        this.loading = false;
        //alert("Invitation sent successfully");
        window.notify({
          msg: "Invitation sent successfully",
          status: "success",
        });
      }
    } catch (error) {
      this.loading = false;
      // alert("Invitation not sent");
      window.notify({ msg: "Invitation not sent", status: "error" });
    }
  }
}
</script>
