<template>
  <div class="flex items-center inline-block" v-bind="$attrs" @click="checked = value">
    <radio-on v-if="checked == value"/>
    <radio-off v-else />
    <label class="ml-2">
      {{ label }}
    </label>
  </div>
</template>
<script>
import RadioOff from "@/components/icons/RadioOff.vue"
import RadioOn from "@/components/icons/RadioOn.vue"

export default {
  name: "CornieRadio",
  inheritAttrs: false,
  components: {
    RadioOff,
    RadioOn
  },
  props: {
    label: String,
    value: [String, Number],
    modelValue: [String, Number],
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
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.radio-container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.radio-container input:checked ~ .checkmark {
  background-color: #0a4269;
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
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}
</style>
