<template>
  <span class="flex items-center justify-center relative">
    <label class="radio-container text-xs">
      <input
        @change="$emit('change', e)"
        v-bind="$attrs"
        type="radio"
        v-model="checked"
      />
      <span class="checkmark"></span>
      <span class="image">
        <div class="icon">
          <slot name="image"></slot>
        </div>
      </span>
      <span class="block pt-0 text-primary text-sm label">
        {{ label }}
      </span>
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
.label {
  position: absolute;
  text-align: center;
  top: 43px;
  right: 0;
  left: 0;
}
/* The container */
.radio-container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  margin-right: 30px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 14px;
  background: chocolate;
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
  height: 40px;
  width: 40px;
  background-color: #fff;
  border-radius: 50%;
}

.image {
  position: absolute;
  display: block;
  z-index: 20;
  font-size: 10px;
  top: 0;
  left: 0;
  bottom: 0;
  width: 39px;
  height: 39px;
  border-radius: 50%;
  overflow: hidden;
}

.image .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.checkmark::before {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 39px;
  height: 39px;
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
  /* border: 1px solid #c2c7d6; */
  color: #c2c7d6 !important;
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
  top: -0.4px;
  bottom: 0;
  left: -0.5px;
  bottom: 0;
  right: 0;
  bottom: 0;
  width: 39px;
  height: 39px;
  border-radius: 50%;
  background: #fe4d3c;
}
</style>
