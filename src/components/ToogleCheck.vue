<template>
  <div>
    <div class="toogle-check flex items-center">
      <label class="text-xs" :class="{ 'text-gray-400': modelSync }">
        {{ uncheckedText }}
      </label>
      <label class="switch mx-0">
        <input type="checkbox" v-model="modelSync" />
        <span class="slider round"></span>
      </label>
      <label class="text-xs" :class="{ 'text-gray-400': !modelSync }">
        {{ checkedText }}
      </label>
    </div>
  </div>
</template>

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
      default: '',
    },
    uncheckedText: {
      type: String,
      default: '',
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

<style scoped>
.switch {
  position: relative;
  display: inline-flex;
  width: 75px;
  height: 40px;
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
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 29px;
  width: 29px;
  bottom: 6px;

  background-color: white;
  transition: 0.4s;
}

input:checked + .slider:before {
  left: 13px;
  top: 5px;
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
.slider.round:before,
.slider.round:after {
  border-radius: 50%;
}
</style>
