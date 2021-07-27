<template>
  <div class="container mx-auto">
    <div class="w-full border-b-2 curved flex py-2">
      <div class="w-10/12 flex font-semibold text-xl py-2">
        <h2>Roles and Privileges</h2>
      </div>
      <div class="w-2/12 flex items-center justify-end">
        <span @click="toggleModalVissibility" class="cursor-pointer"><i class="pi pi-exclamation-circle p-2"></i></span>
      </div>
    </div>

    <UserDetails />
    <Modal :show="showModal" @close-modal="toggleModalVissibility">
      <ModalContent />
      <template v-slot:cancel>
        <Button :loading="false" >
          <button @click="toggleModalVissibility" class="close_btn_border mr-3 text-gray-500 focus:outline-none text-white font-bold py-3 px-8 rounded-full">
            Close
          </button>
        </Button>
      </template>
      <!-- <template v-slot:accept>
        <Button :loading="false">
          <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full">
            New Role
          </button>
        </Button>
      </template> -->
    </Modal>
    <div class="w-8/12 mx-auto border-b-2 my-12"></div>

    <div class="w-full flex mb-12">
      <div class="w-8/12">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore aliquam fuga nemo animi et magnam ad unde doloremque dolores veritatis.</p>
      </div>
      <div class="w-4/12 flex justify-end">
        <Button :loading="false">
          <button class="bg-red-500 hover:bg-blue-700 focus:outline-none text-white font-bold py-3 px-8 rounded-full">
            New Role
          </button>
        </Button>
      </div>
    </div>

    <div class="w-full border flex py-2">
      <RoleCard />
      <RoleCard />
      <RoleCard />
      <RoleCard />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserDetails from './components/user-details.vue'
import RoleCard from './components/role-card.vue'
import ModalContent from './components/roles-privileges-modal.vue'
import Button from '@/components/globals/corniebtn.vue'
import Modal from '@/components/modal-right.vue'
import X from '@/components/daterangepicker.vue'

@Options({
  components: {
    UserDetails,
    Button,
    RoleCard,
    Modal,
    ModalContent
  },
})
export default class RolesAndPrivileges extends Vue {
  showModal: boolean = false;

  toggleModalVissibility() {
    this.showModal = !this.showModal;
  }
}
</script>
<style>
  .faint-border {
    border: 1px solid #F5F4FA;
  }

  .border {
    border-radius: 8px;
  }

  .card_header {
    color: #6F6C93;
    font-size: 12px;
  }

  .card_text {
    font-size: 14px;
  }

  .dark_background {
    background: #211F45;
  }

  .card_shadow {
    box-shadow: 0px 1px 4px rgba(46, 41, 78, 0.02), 0px 8px 12px rgba(46, 41, 78, 0.08);
  }

  .card_image {
    height: 72px;
    width: 72px;
    transition: all .5s ease-in-out
  }

  .edit_btn {
    height: 1px;
    overflow: hidden;
    transition: all .8s ease-in-out
  }

  .deactivate_btn {
    display: none;
  }

  .role_card {
    height: 217px;
  }

  .role_card:hover .edit_btn {
    height: 48px;
    transition: all .8s ease-in-out
  }

  .role_card:hover .deactivate_btn {
    display: block;
  }

  .role_card:hover .card_image, .role_card:hover .card_round_image {
    border-radius: 12px;
    width: 44px;
    height: 44px;
    transition: all .5s ease-in-out
  }

  .close_btn_border {
    border: 1px solid #211F45;
  }

  .steps_line-h {
    line-height: 24px;
  }

</style>
