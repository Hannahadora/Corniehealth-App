<template>
  <cornie-dialog v-model="show" center class="md:w-2/3 h-full w-full p-2">
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <h2 class="font-bold text-lg text-primary ml-3 -mt-0.5">
              New Bill
            </h2>
          </div>
          <delete-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="overflow-y-auto h-full">
        <div class="flex flex-col">
          <div
            class="flex md:flex-row w-full md:justify-between md:items-center"
          >
            <div>
              <span class="text-gray-300 truncate">Patient Name:</span>
              {{ patientName }}
            </div>
            <div>
              <span class="text-gray-300 truncate">Encounter ID:</span>
              {{ encounterId }}
            </div>
          </div>
          <div
            class="flex md:flex-row w-full md:justify-between md:items-center"
          >
            <div>Items</div>
            <div class="text-red-500">
              <plus-icon class="fill-current text-red-500 mr-3" />
              Add item
            </div>
          </div>
          <div class="flex flex-col space-y-7" v-if="items.length > 0">
            <cornie-table :columns="headers" v-model="items"> </cornie-table>
            <div class="flex justify-end">
              <div class="p-3 flex justify-between">
                <div class="flex">Sub Total</div>
                <div>₦70,000</div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="flex items-center w-full justify-center text-center font-bold"
          >
            No item added
          </div>
        </div>
      </cornie-card-text>
      <div class="flex w-full justify-end px-5 mt-auto mb-4 pt-5">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-1 mr-3 rounded-xl text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          @click="continueProcess"
          class="text-white bg-danger px-4 rounded-xl w-28"
        >
          Save
        </cornie-btn>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
  import CornieCard from "@/components/cornie-card";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import DeleteIcon from "@/components/icons/cancel.vue";
  import PlusIcon from "@/components/icons/plus.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync } from "vue-property-decorator";

  @Options({
    name: "ClinicalDialog",
    components: {
      ...CornieCard,
      CornieIconBtn,
      CornieDialog,
      ArrowLeftIcon,
      DeleteIcon,
      CornieSelect,
      PlusIcon,
    },
    emits: ["newBill"],
  })
  export default class AddCondition extends Vue {
    headers = [
      {
        title: "Item description",
        key: "description",
        show: true,
        noOrder: true,
      },
      {
        title: "Quantity",
        key: "quantity",
        show: true,
        noOrder: true,
      },
      {
        title: "Unit price",
        key: "price",
        show: true,
        noOrder: true,
      },
      {
        title: "discount",
        key: "discount",
        show: true,
        noOrder: true,
      },
      {
        title: "amount",
        key: "amount",
        show: true,
        noOrder: true,
      },
    ];

    get items() {
      return [
        {
          description: "Normal Delivery",
          quantity: 1,
          price: "XXXXXX",
          discount: "XXXXXX",
          amount: "XXXXXX",
        },
        {
          description: "Epidural Injection",
          quantity: 2,
          price: "XXXXXX",
          discount: "XXXXXX",
          amount: "XXXXXX",
        },
        {
          description: "Hospital Stay",
          quantity: "3 nights",
          price: "XXXXXX",
          discount: "XXXXXX",
          amount: "XXXXXX",
        },
      ];
    }

    @Prop({ type: Boolean, default: false })
    modelValue!: boolean;

    @PropSync("modelValue")
    show!: boolean;

    @Prop({ type: String, default: "" })
    patientName!: string;

    @Prop({ type: String, default: "" })
    encounterId!: string;

    actionType = "";

    continueProcess() {
      this.$emit("newBill");
      this.show = false;
    }
  }
</script>
