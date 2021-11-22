<template>
    <div class="container-fluid">
        <div class="w-full">
            <label class="flex capitalize mb-1 text-black text-sm font-semibold">
                <span> {{ label }} </span>
            </label>
        </div>
        <div class="w-full flex">
            <div class="w-6/12">
                <div class="w-11/12">
                    <label class="file-picker flex flex-col w-full rounded-full">
                        <input type="file"/>
                        <p class="flex items-center justify-between">
                            <span><i class="fa fa-cloud-upload"></i> Choose file</span>
                            <span class="mr-3"><upload-icon /></span>
                        </p>
                    </label>
                </div>
            </div>
            <div class="w-6/12">
                <div class="w-11/12">
                    <uploaded-file />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UploadIcon from "@/components/icons/upload.vue"
import UploadedFile from "./uploadd-file.vue"
import { Prop } from "vue-property-decorator";

@Options({
    components: {
        UploadIcon,
        UploadedFile,
    }
})
export default class FilePicker extends Vue {
    @Prop({ type: String, default: '' })
    label!: string;
}
</script>


<style scoped>
    input[type="file"] {
        display: none;
    }
    .file-picker {
        border: 1px solid #ccc;
        display: inline-block;
        padding: 6px 12px;
        cursor: pointer;
    }
</style>