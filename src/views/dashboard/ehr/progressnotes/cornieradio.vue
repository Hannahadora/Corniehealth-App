<template>
  <span class="flex items-center relative">
    <label class="radio-container text-xs">
      <span class="block pt-0 text-black font-medium">
        {{ label }}
      </span>
      <input
        @change="$emit('change', e)"
        v-bind="$attrs"
        type="radio"
        v-model="checked"
      />
      <span class="-mt-1 checkmark"></span>
    </label>
  </span>
</template>
<script>
export default {
  name: "CornieRadio",
  inheritAttrs: false,
  props: {
    label: String,
    modelValue: String,
  },
  computed: {
    checked: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
};
</script>
<style scoped>
/* The container */
.radio-container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 14px;
}

/* Hide the browser's default radio button */
.radio-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #c2c7d6;
  height: 25px;
  width: 25px;
  background-color: #fff;
  border-radius: 50%;
}
.checkmark::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: #fff;
}

/* On mouse-over, add a grey background color */
.radio-container:hover input ~ .checkmark {
  background-color: #fff;
}

/* When the radio button is checked, add a blue background */
.radio-container input:checked ~ .checkmark {
  background-color: white;
  border: 1px solid #c2c7d6;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.radio-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.radio-container .checkmark:after {
  top: 3px;
  left: 3px;
  width: 17.5px;
  height: 17.5px;
  border-radius: 50%;
  background: #fe4d3c;
}
</style>
