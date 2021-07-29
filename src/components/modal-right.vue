<template>
  <div class="w-full border py-2 flex mt-12" v-if="show">
      <!-- This example requires Tailwind CSS v2.0+ -->
      
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full" style="position:absolute;right:0;height:100vh">
            <div class="bg-primary px-4">
                <span class="py-4 flex items-center cursor-pointer" @click="toggleModal">
                    <i class="pi pi-arrow-left mr-3 text-white font-bold" style="font-size:1.2rem"></i> <span class="text-gray-500"> |</span>
                </span>
            </div>
            <div class="bg-white px-4 pb-4 sm:pb-4">
                <slot></slot>
            </div>
            <div class=" px-4 py-8 sm:px-6 sm:flex sm:flex-row-reverse" id="buttonArea">
                <slot name="accept"></slot>
                <slot name="cancel"></slot>
            </div>
            
        </div>
        
    </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
// import Dialog from 'primevue/dialog';

@Options({
  components: {
    // Dialog
  },
})
export default class RolesAndPrivileges extends Vue {
    @Prop({ type: Boolean, default: false })
    show!: boolean;

    toggleModal() {
        this.$emit('close-modal')
    }
}
</script>
<style>
    #buttonArea {
        position: absolute !important;
        bottom: 0 !important;
        width: 100% !important;
    }
</style>
