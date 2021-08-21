<template>
  <div class="h-full w-full">
    <h1 class="text-primary text-lg capitalize font-extrabold"> New Patient </h1>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Card from "@/components/card.vue";
import CardText from "@/components/card-text.vue";
import CardTitle from "@/components/card-title.vue";

@Options({
  name: "new-patient",
  components: {
    Card,
    CardText,
    CardTitle
  }
})
export default class NewPatient extends Vue {

}
</script>

<style>

</style>