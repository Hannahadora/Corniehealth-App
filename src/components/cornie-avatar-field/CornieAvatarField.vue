<template>
  <div class="image-upload flex items-center">
    <avatar class="mr-2 h-20 w-20" v-if="url" :src="url" />
    <avatar class="mr-2 h-20 w-20" v-else :src="placeholder" />
    <br />
    <input
      type="file"
      accept="image/*"
      name="image"
      id="file"
      @change="onChange"
      hidden
    />
    <label
      v-if="!readonly"
      for="file"
      class="text-primary border-primary border px-7 py-1.5 rounded-full font-bold cursor-pointer"
    >
      Upload Image
    </label>
  </div>
</template>

<script src="./CornieAvatarField.ts"></script>
