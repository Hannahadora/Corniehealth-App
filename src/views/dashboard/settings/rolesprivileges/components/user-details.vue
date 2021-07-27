<template>
  <div class="w-full border py-2 flex mt-12">
    <div class="w-2/12 flex font-semibold text-xl p-2">
    <img src="https://via.placeholder.com/100" alt="Photo" class="rounded-full">
    </div>
    <div class="w-7/12 flex flex-col justify-center">
      <div class="w-full flex items-center mb-4">
        <div class="w-7/12 flex flex-col">
          <span class="uppercase font-bold card_header">Name</span>
          <span class="card_text">User Name</span>
        </div>
        <div class="w-5/12 flex flex-col">
          <span class="uppercase font-bold card_header">Role</span>
          <span class="card_text">Root Administrator</span>
        </div>
      </div>
      <div class="w-full flex flex-col">
        <span class="uppercase font-bold card_header">Domain</span>
        <span class="card_text">https://corniehealth.blahblah.com</span>
      </div>
    </div>
    <div class="-full">
      <div class="w-3/12">
        <Overlay :show="true">
            <Modal>
              <template v-slot:header>
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Transfer admin rights
                </h3>
              </template>

              <template v-slot:body>
                <p class="text-sm text-gray-500">
                    Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.
                </p>
              </template>
              <template v-slot:buttons>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <corniebtn type="button" class="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                      Deactivate
                    </corniebtn>
                    <corniebtn type="button" class="mt-3 w-full inline-flex justify-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Yes
                    </corniebtn>
                </div>
              </template>
            </Modal>
        </Overlay>
      </div>
    </div>
    <div class="w-3/12 flex items-center">
      <div class="w-full">
        <span>A </span>
        <span class="card_text"><a >Transfer Admin Rights</a></span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Overlay from './overlay.vue'
import Modal from './modal.vue'

@Options({
  components: {
    Modal,
    Overlay
  },
})
export default class RolesAndPrivileges extends Vue {
 
}
</script>
<style>

</style>
