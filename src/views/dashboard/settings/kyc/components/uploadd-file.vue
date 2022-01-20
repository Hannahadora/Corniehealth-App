<template>
  <div class="container-fluid">
    <div class="w-full" style="width: 94%">
      <label class="file-picker flex flex-col w-full rounded">
        <p class="flex items-center justify-between">
          <span class="flex items-center">
            <span class="mr-"><pdf-icon /></span>
            <span>{{ fileName }}</span>
          </span>
          <span class="flex items-center">
            <span class="mx-2">
              <download-icon />
            </span>
            <span
            @click="$emit('cleartext')"
              class="px-1 cursor-pointer rounded-full border flex items-center justify-center text-white text-xs"
              style="width: 20px; height: 20px; background: #949eb8"
              >x</span
            >
          </span>
        </p>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DownloadIcon from "@/components/icons/download.vue";
import PdfIcon from "@/components/icons/pdf.vue";
import { Prop } from "vue-property-decorator";

@Options({
  components: {
    DownloadIcon,
    PdfIcon,
  },
})
export default class UploadedFile extends Vue {
  @Prop({ type: String, default: "no file" })
  fileName!: string;

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
