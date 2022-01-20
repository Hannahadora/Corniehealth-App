<template>
  <div class="w-full flex flex-col items-center justify-center">
    <div class="container">
      <div
        class="w-11/12 mx-auto flex flex-col items-center faint-border card_shadow role_card py-5 my-3"
      >
        <span class="uppercase font-bold mt-2 text">{{ role.name }}</span>
        <span class="my-2">
          <div class="flex rounded-full card_image">
            <img
              src="https://via.placeholder.com/100"
              class="rounded-full card_round_image"
              alt="User Image"
            />
          </div>
        </span>
        <div class="w-full flex flex-col items-center">
          <span class="edit_btn">
            <Button
              :loading="false"
              class="dark_background text-white font-bold py-3 px-12 rounded-full"
            >
              <!-- <button class=""> -->
              Edit
              <!-- </button> -->
            </Button>
          </span>
          <span
            class="my-2 deactivate_btn cursor-pointer"
            @click="deleteRole(role.id)"
            ><a>Delete</a></span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";

const roles = namespace("roles");

@Options({
  components: {},
})
export default class RolesAndPrivileges extends Vue {
  @Prop()
  role!: any;

  @roles.Action
  deleteRole!: (id: string) => any;

  removeRole(id: string) {
    this.deleteRole(id);
  }
}
</script>
<style></style>
