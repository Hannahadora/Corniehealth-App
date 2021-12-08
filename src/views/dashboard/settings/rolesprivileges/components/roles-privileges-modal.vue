<template>
  <div class="w-full flex flex-col items-center justify-center">
    <div class="container">
      <div class="w-11/12 mx-auto flex flex-col items-center role_card">
        <div class="w-full">
          <h1 class="modal_header mt-3 primary-text font-bold">
            Roles and Privileges
          </h1>
        </div>

        <div class="w-full py-5 dashed_border">
          <p>
            CornieHealth is divided into modules and each have privileges which
            represent actions that can be carried out within. with this model,
            you can easily manage what each users can access within the apps as
            well as what actions are available to them within these accessed
            modules.
          </p>
        </div>

        <div class="w-full">
          <h2 class="py-3 modal_subheader mt-3">How to create a role</h2>
          <p class="py-3">These are the simple steps to creating roles.</p>
          <p class="py-3">1. Click on “New Role”.</p>
          <p class="py-3">
            2. Give your role a name and description (optional).
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class RolesAndPrivileges extends Vue {}
</script>
<style>
.dashed_border {
  border-bottom: 1px dashed #c5c4d4;
}

.modal_header {
  font-size: 24px;
}

.modal_subheader {
  font-size: 18px;
  font-weight: 700;
  color: #1f1514;
}
</style>
