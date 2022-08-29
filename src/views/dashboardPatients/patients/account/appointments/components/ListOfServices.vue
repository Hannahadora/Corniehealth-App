<template>
	<div>
		<div
			v-for="(service, index) in serviceList"
			:key="index"
			class="grid grid-cols-2 mt-6"
		>
			<div class="sub-titles-1">
				{{ service && service.name }}
			</div>
			<div class="flex">
				<img src="/images/fee.svg" alt="">
				<p class="ml-2 text-grey-blue">{{ service && service.price }}</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
@Component({
  components: {},
})
export default class ListOfServices extends Vue {
  serviceList: Array<any> = []

  getServiceList() {
    return (this.serviceList = [
      {
        id: "ereagetg",
        name: "Service 1",
        price: "₦ 12,000",
      },
      {
        id: "wrgratrat",
        name: "Service 2",
        price: "₦ 12,000",
      },
      {
        id: "gtetee5rw",
        name: "Service 3",
        price: "₦ 12,000",
      },
      {
        id: "wwregyrewerq",
        name: "Service 4",
        price: "₦ 12,000",
      },
      {
        id: "wrtyrewer",
        name: "Service 5",
        price: "₦ 12,000",
      },
      {
        id: "ergtyrjterwe",
        name: "Service 6",
        price: "₦ 12,000",
      },
      {
        id: "rui894rngkaogij",
        name: "Service 7",
        price: "₦ 12,000",
      },
    ])
  }

  created() {
    this.getServiceList()
  }
}
</script>

<style></style>
