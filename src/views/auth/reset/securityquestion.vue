<template>
   <div class="w-80 lg:w-full xl:w-full md:w-full h-full block p-4 relative right-32 lg:right-0 xl:right-0 md:right-0 border-2 border-gray-300 rounded-lg">
    <form class="m-8" @submit.prevent="submit">
        <h2 class="font-bold text-gray-900 mb-12 text-3xl">
        Reset Security Question
        </h2>
        <div class="mb-5 mt-5">
            <cornie-select
                class="w-full"
                :items="['Patient', 'Provider', 'Payer']"
                label="DOMAIN"
                />
        <p class="text-blue-900 text-sm mt-2">
            <a href="#">Forgot Domain?</a>
        </p>
        </div>
        <div class="mb-5">
             <cornie-input
            v-model="email"
            required
            class="w-full"
            label="Email"
            />
        </div>
        <div class="mb-8">
         <cornie-input
            v-model="email"
            required
            class="w-full"
            label="ENTER PERSONAL ACCOUND ID"
            />
        </div>

        <div class="mb-8">
        <label
            class="
            block
            uppercase
            tracking-wide
            text-dark-700 text-xs
            font-bold
            mb-2
            "
            for="grid-state"
        >
            2FA CODE
        </label>
        <multi-input :length="6" class="w-full" />
        </div>
        <div class="flex items-center justify-between">
        <cornie-btn class="font-semibold rounded-full  bg-danger mt-3 w-full text-white p-2" type="submit">
            Submit
        </cornie-btn>
        </div>
    </form>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import MultiInput from "@/components/multi-input.vue";

type CreatedUser = { id: string; email: string };

@Options({
  components: {
    MultiInput,
  },
})
export default class SignUp extends Vue {
  user = {} as CreatedUser;
  code = "";

  userCreated = false;
  emailVerified = false;

  @Watch("user", { deep: true })
  userChanged(user: CreatedUser) {
    if (user.id) this.userCreated = true;
  }

}
</script>
