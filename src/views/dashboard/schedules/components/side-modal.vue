<template>
    <Modal :visible="visible">
        <div class="modal-con p-2">
            <div class="container-fluid">
                <div class="w-full px-3">
                    <h5 class="flex items-center py-3">
                        <span class="font-bold flex items-center cursor-pointer" @click="close"><ArrowLeft class="mr-3" /> <span class="text-gray-500">|</span></span>
                        <span class="mx-3 font-semibold text-lg">{{ header ? header : 'Edit Slot' }}</span>
                    </h5>
                </div>
                <div class="w-full">
                    <slot />
                </div>
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Modal from '@/components/modal.vue'
import ArrowLeft from '@/components/icons/arrowleft.vue'

export default defineComponent({
    components: { Modal, ArrowLeft },

    props: [ 'visible', 'header' ],

    setup (props, { emit }) {
        
        const close = () => {
            emit('closesidemodal')
        }

        return {
            close,
        }
    }
})
</script>

<style scoped>
    .modal-con {
        width: 430px;
        height: 100vh;
        overflow: scroll;
        background: #fff;
        position: absolute;
        right: 0;
        top: 0;
    }
</style>