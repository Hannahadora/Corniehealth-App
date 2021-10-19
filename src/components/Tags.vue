<template>
  <button class="tags-box">
    <p>{{ value }}</p>
    <span ref="tag" @click="deleteTag">
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 0.5C12.424 0.5 16 4.076 16 8.5C16 12.924 12.424 16.5 8 16.5C3.576 16.5 0 12.924 0 8.5C0 4.076 3.576 0.5 8 0.5ZM10.872 4.5L8 7.372L5.128 4.5L4 5.628L6.872 8.5L4 11.372L5.128 12.5L8 9.628L10.872 12.5L12 11.372L9.128 8.5L12 5.628L10.872 4.5Z"
          fill="#F2F7FF"
        />
      </svg>
    </span>
  </button>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

* {
  font-family: "Inter", sans-serif;
}
.tags-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: #080056;
  border-radius: 124px;
  border: none;
  margin: 0px 8px;
}
.tags-box p {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #f2f7ff;
  margin: 0px 8px;
}
</style>

<script>
export default {
  name: "Tags",
  props: {
    value: {
      type: String || Number,
      default: "",
    },
  },
  methods: {
    deleteTag() {
      this.$refs.tag.parentElement.remove();
      this.$emit("remove");
    },
  },
};
</script>
