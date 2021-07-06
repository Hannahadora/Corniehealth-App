<template>
  <div class="list-box">
    <label>
      <input :type="types" :v-model="modelName" />
      {{ value }}
    </label>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

* {
  font-family: "Inter", sans-serif;
}
label {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #2b2b2b;
}
.list-box > input[type="checkbox"] {
  height: 25px;
  width: 25px;
  vertical-align: middle;
  border: 1px solid #34495e;
  border-radius: 4px;
  cursor: pointer;
}
</style>

<script>
export default {
  name: "ListBoxes",
  props: {
    types: {
      type: String,
      required: false,
    },
    value: {
      type: String || Number,
      default: "",
    },
    modelName: {
      type: String,
      required: false,
    },
  },
};
</script>
