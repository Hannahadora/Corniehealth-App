<template>
  <div>
    <div class="toogle-check -ml-4">
      <span
        class="text-gray font-semibold mr-3"
        :class="{ 'text-danger': modelSync }"
      >
        {{ uncheckedText }}</span
      >
      <label class="switch">
        <input type="checkbox" v-model="modelSync" />
        <span class="slider round"></span>
      </label>
      <span
        class="text-gray font-semibold ml-3"
        :class="{ 'text-success': !modelSync }"
      >
        {{ checkedText }}</span
      >
    </div>
  </div>
</template>

<style scoped>
.switch {
  position: relative;
    display: inline-block;
   width: 60px;
    height: 34px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #35ba83;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.slider:before {
  position: absolute;
    content: "";
    height: 28px;
    width: 28px;
    left: 2px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
}
input:checked + .slider {
  background: #fe4d3c;
}

.checked + * + input:checked {
  color: #fe4d3c !important;
}
span.unchecked input:checked + .slider {
  color: #fe4d3c;
}
input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}
</style>

<script>
export default {
  name: "ToogleCheck",
  data() {
    return {
      checked: false,
    };
  },
  props: {
    label: {
      type: String,
      required: false,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    checkedText: {
      type: String,
      default: false,
    },
    uncheckedText: {
      type: String,
      default: false,
    },
  },
  computed: {
    modelSync: {
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
