<template>
  <chart-card
    title="Recent Messages"
    :subtitle="`${messages.length} Recent Messages`"
    action="View Messages"
    :height="height"
  >
    <div class="h-52 overflow-y-scroll mt-10">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="w-full mb-10"
      >
        <div class="w-full flex items-center justify-between">
          <div class="flex items-center">
            <div v-if="message.img">
              <img :src="message.img" alt="" class="w-8 h-8" />
            </div>
            <div v-else class="no-image">
              {{ message.senderFirstName.charAt(0)
              }}{{ message.senderLastName.charAt(0) }}
            </div>
            <span class="text-base font-bold ml-4" style="color: #14171f"
              >{{ message.senderFirstTitle }} {{ message.senderFirstName }}
              {{ message.senderLastName }}</span
            >
          </div>
          <div class="flex items-center">
            <span class="text-sm" style="color: #667499">{{
              message.time
            }}</span>
            <img class="ml-4" src="@/assets/icon(3).png" alt="" />
          </div>
        </div>
        <div class="mt-3 text-base" style="color: #667499">
          {{ message.text }}
        </div>
      </div>
    </div>

    <div
      v-if="messages.length === 0"
      class="flex flex-col items-center justify-center"
    >
      <div class="mt-8 w-11/12 mx-auto">
        <img src="@/assets/patientanddoctor.png" alt="" />
      </div>
      <div class="mt-6 flex flex-col items-center justify-center text-center">
        <span class="text-lg font-bold">There’s no Messages</span>
        <span style="color: #667499" class="text-sm"
          >Recent messages will be displayed here</span
        >
      </div>
    </div>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";

@Options({
  name: "MessagesChart",
  components: {
    ChartCard,
  },
})
export default class MessagesChart extends Vue {
  messages: Array<any> = [
    {
      img: null,
      text: "I have submitted the results from last week’s test and there are a couple of things that are not adding up. I would like to get permission to forward to Emeka to we can cross check.",
      senderTitle: "Dr.",
      senderFirstName: "Daniel",
      senderLastName: "Johnson",
      time: "Today, 15:25",
    },
    {
      img: require("@/assets/avatar(2).png"),
      text: "You requested for a raise a few days ago. Just wanted to let you know it has been forwarded to the appropriate channels and under review. You would get a response by next week..",
      senderTitle: "",
      senderFirstName: "Dare",
      senderLastName: "Alabi",
      time: "Today, 12:40",
    },
    {
      img: null,
      text: "I have submitted the results from last week’s test and there are a couple of things that are not adding up. I would like to get permission to forward to Emeka to we can cross check.",
      senderTitle: "Dr.",
      senderFirstName: "Grace",
      senderLastName: "Love",
      time: "Today, 15:25",
    },
    {
      img: require("@/assets/avatar(1).png"),
      text: "You requested for a raise a few days ago. Just wanted to let you know it has been forwarded to the appropriate channels and under review. You would get a response by next week..",
      senderTitle: "",
      senderFirstName: "Peter",
      senderLastName: "Pan",
      time: "Today, 12:40",
    },
    {
      img: require("@/assets/avatar(3).png"),
      text: "I have submitted the results from last week’s test and there are a couple of things that are not adding up. I would like to get permission to forward to Emeka to we can cross check.",
      senderTitle: "Dr.",
      senderFirstName: "Daniel",
      senderLastName: "Johnson",
      time: "Today, 15:25",
    },
  ];

  get height() {
    if (this.messages.length > 0) {
      return "370px";
    } else if (this.messages.length === 0) {
      return "401px";
    }
  }
}
</script>

<style scoped>
.no-image {
  background: #114ff5;
  box-shadow: 0px 1px 2px rgba(46, 41, 78, 0.02),
    0px 4px 8px rgba(46, 41, 78, 0.08);
  border-radius: 100px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #fff;
  font-size: 14px;
}
</style>
