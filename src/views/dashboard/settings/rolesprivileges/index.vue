<template>
  <div class="container mx-auto px-2">
    <div class="w-full border-b-2 curved flex py-2">
      <div class="w-10/12 flex font-semibold text-xl py-2">
        <h2>Roles and Privileges</h2>
      </div>
      <div class="w-2/12 flex items-center justify-end">
        <span @click="toggleModalVissibility" class="cursor-pointer"><Icon :type="2" /></span>
      </div>
    </div>

        <!-- <div class="-full">
      <div class="w-3/12"> -->
        <Overlay :show="show">
            <Modal>
              <template v-slot:header>
                <h3 class="text-xl flex justify-between leading-6 font-medium text-gray-900 mb-5 capitalize modal_titlee cursor-pointer" id="modal-title">
                    <span>Transfer admin rights</span>
                    <span @click="toggleModal" class="lowercase pb-1 cursor-pointer font-normal bg-primary text-white flex items-center justify-center" style="width: 20px;height:20px;border-radius:50%">×</span>
                </h3>
              </template>

              <template v-slot:body>
                <p class="text-base text-gray-500">
                  This action transfers the account ownership and all associated privileges to the selected user. 
                  Are you sure you wish to proceed?
                </p>
              </template>
              <template v-slot:buttons>
                <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <Button>
                      <button style="background: #FE4D3C" @click="comfirmTransfer" type="button" class="w-full inline-flex justify-center rounded-full border-transparent font-bold shadow-sm px-6 py-3 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:none sm:ml-3 sm:w-auto sm:text-sm">
                        Yes
                      </button>
                    </Button>
                    <Button>
                      <button @click="toggleModal" type="button" class="mt-3 w-full inline-flex justify-center px-4 py-2 text-base text-white-700 font-bold hover:bg-gray-50 focus:outline-none focus:none sm:mt-0 sm:ml-3 sm:w-auto">
                        No
                      </button>
                    </Button>
                </div>
              </template>
            </Modal>
        </Overlay>
      <!-- </div>
    </div> -->

    <!-- <div class="-full">
      <div class="w-3/12"> -->
        <Overlay :show="showTransferComfirmModal">
            <Modal>
              <template v-slot:header>
                <h3 class="text-lg flex justify-between leading-6 font-medium capitalize text-gray-900 mb-5 font-bold modal_titlee" id="modal-title">
                  <span>Transfer admin right</span>
                  <span @click="() => showTransferComfirmModal = false" class="lowercase pb-1 cursor-pointer font-normal bg-primary text-white flex items-center justify-center" style="width: 20px;height:20px;border-radius:50%">×</span>

                </h3>
              </template>

              <template v-slot:body>
                <div class="w-full">
                  <div class="container">
                    <custom-dropdown @item-selected="itemSelected" :items="allContacts" :optionLabel="'name'" :label="'Select User/Practicioner'" />
                    <!-- <Dropdown v-model="transferToContact" :label="'Select User/Practicioner'" :items="allContacts" :optionLabel="'name'" :isContact="true" :placeholder="'--Select--'" /> -->
                  </div>
                </div>
              </template>
              <template v-slot:buttons>
                <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <Button :loading="transfering">
                      <button style="background: #FE4D3C" @click="transferAdminRight" type="button" class="w-full inline-flex justify-center rounded-full border-transparent font-bold shadow-sm px-6 py-3 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:none sm:ml-3 sm:w-auto sm:text-sm">
                        Transfer
                      </button>
                    </Button>
                    <Button @click="() => showTransferComfirmModal = false">
                      <button type="button" class="mt-3 w-full inline-flex justify-center px-4 py-2 text-base text-white-700 font-semibold hover:bg-gray-50 focus:outline-none focus:none sm:mt-0 sm:ml-3 sm:w-auto">
                      Cancel
                      </button>
                    </Button>
                </div>
              </template>
            </Modal>
        </Overlay>
      <!-- </div>
    </div> -->

    <UserDetails @toggle-rights-modal="toggleModal" :user="user" />
    
    <SideModal :show="showModal" @close-modal="toggleModalVissibility">
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
    </SideModal>
    <div class="w-8/12 mx-auto border-b-2 my-12"></div>

    <div class="w-full flex mb-12">
      <div class="w-8/12">
      <p>
        Here are roles you have created. These roles can be assigned to users, defining their access level within CornieHealth.
      </p>
      </div>
      <div class="w-4/12 flex justify-end">
        <Button :loading="false">
          <router-link :to="{ name: 'Roles Form' }" style="background: #FE4D3C" class="bg-red-500 hover:bg-blue-700 focus:outline-none text-white font-bold py-3 px-8 rounded-full">
            New Role
          </router-link>
        </Button>
      </div>
    </div>
   
   <div class="w-full">
    <DTable :roles="roles" />
   </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserDetails from './components/user-details.vue'
import RoleCard from './components/role-card.vue'
import ModalContent from './components/roles-privileges-modal.vue'
import Button from '@/components/globals/corniebtn.vue'
import SideModal from '@/components/modal-right.vue'
import Overlay from './components/overlay.vue'
import Modal from './components/modal.vue'
import Dropdown from '@/components/multiselectsearch.vue'
import { namespace } from 'vuex-class'
import User from '@/types/user'
import IPractitioner from '@/types/IPractitioner'
import { first, getTableKeyValue } from "@/plugins/utils";
import search from "@/plugins/search";
import TableOptions from "@/components/table-options.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import DTable from './components/DTable.vue'
import SupportIcon from '@/components/icons/support.vue'
import Icon from './components/icon.vue'

import CustomDropdown from '@/components/custom-dropdown.vue'

const roles = namespace('roles');
const userStore = namespace('user');
const contacts = namespace('practitioner');

interface ITransferRightTo {
  to: string
}

interface IRole {
  name: string,
  description: string,
  isDefault: boolean,
  isSuperAdmin: boolean,
  id: string,
}

@Options({
  components: {
    CustomDropdown,
    Icon,
    UserDetails,
    Button,
    RoleCard,
    SideModal,
    ModalContent,
    Modal,
    Overlay,
    Dropdown,
    TableOptions,
    ColumnFilter,

    DeleteIcon,
    EyeIcon,
    DTable,
    SupportIcon,
  },
})
export default class RolesAndPrivileges extends Vue {
  query = "";
  x = "";
  getKeyValue = getTableKeyValue;
  showColumnFilter = false;

  transfering = false;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "Name",
      value: "name",
      show: true,
    },
    { title: "Description", value: "description", show: true },
    { title: "Org Id", value: "orgId", show: true },
    {
      title: "Is Admin",
      value: "isSuperAdmin",
      show: true,
    },
    {
      title: "Default",
      value: "isDefault",
      show: true,
    },
    {
      title: "Created At",
      value: "createdAt",
      show: false,
    },
    {
      title: "Updated At",
      value: "updatedAt",
      show: false,
    },
    {
      title: "Created By",
      value: "createdBy",
      show: false,
    },
    {
      title: "Deleted At",
      value: "deletedAt",
      show: false,
    },
    {
      title: "App Slug",
      value: "appSlug",
      show: false,
    },
  ];
  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }

  get items() {
    const roles = this.roles.map((role) => {
      // const opHours = this.stringifyOperationHours(
      //   practitioner.hoursOfOperation
      // );
      
      return {
        ...role,
        action: role.id,
        // hoursOfOperation: opHours,
      };
    });
    if (!this.query) return roles;
    return search.searchObjectArray(roles, this.query);
  }


  @roles.Action
  getPractitioner!: () => Promise<any>

  @roles.Action
  getRoles!: () => Promise<any>

  @userStore.State
  user!: User;

  @roles.State
  roles!: IRole[];

  @roles.State
  practitioners!: IPractitioner[];

  @roles.Action
  fetchPractitioners!: () => Promise<IPractitioner[]>;

  transferData: any = { }
  transferToContact: any = { to: ''}

  @roles.Action
  transferRight!: (body: ITransferRightTo) => any;

  showModal: boolean = false;
  toggleModalVissibility() {
    this.showModal = !this.showModal;
  }

  show = false;
  showTransferComfirmModal = false;
  transferConfirmed = false;

  toggleModal() {
    console.log(this.fetchPractitioners().then(res => console.log(res)
    ), "contacts");
    
      this.show = !this.show;
      
  }

 comfirmTransfer() {
   this.showTransferComfirmModal = true;
   this.show = false;
 }

 rightTransfered() {
   this.transferConfirmed = false;
 }

 cancelTransfer() {
   this.showTransferComfirmModal = false;
 }

 itemSelected(item: any) {
   this.transferToContact = item;
   console.log(item, "item");
   
 }

 get allContacts() {
   if (!this.practitioners) return [];
   return this.practitioners.map((i: any) => {
     return {
       ...i,
       name: `${i.firstName} ${i.lastName}`
     }
   })
 }

 async transferAdminRight() {
   this.transfering = true;
   try {
     await this.transferRight({
     to: this.transferToContact.id,
   })
   this.showTransferComfirmModal = false;
   this.transfering = false;
   } catch (error) {
     this.transfering = false;
     console.log(error);
     
   }
 }

 async created() {
   this.getPractitioner() 
   await this.getRoles();
   await this.fetchPractitioners();
   this.user.role = this.roles.find((i: any) => i.isSuperAdmin);
   console.log(this.user, "user");
   this.fetchPractitioners()
    .then((res: any) => {
      console.log(res, "pres");
      
    })
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
    background: #080056;
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
    border: 1px solid #080056;
  }

  .steps_line-h {
    line-height: 24px;
  }

  .role {
    min-width: 200px;
  }

  #rolesCon {
    overflow-x: scroll;
  }

</style>
