<template>
	<div class="flex items-start">
		<div class="w-1/5 border-r border-dashed">
			<p class="font-bold pl-2 border-l-4 border-red-500">Family Medicine</p>

			<div
				v-for="(specialty, index) in hospital.specialties"
				:key="index"
				class="xl:mt-6"
			>
				<p
					class="cursor-pointer hover:text-red-500"
					:class="{ 'text-red-500 font-bold': selectedSpecialty === specialty }"
					@click="selectSpecialty(specialty)"
				>
					{{ specialty.name }}
				</p>
			</div>
		</div>

		<div class="ml-8 w-full">
			<ul class="flex items-center border-b">
				<li
					v-for="(tab, index) in tabs"
					:key="index"
					:class="{ 'active-tab': activeTab === tab }"
					class="pb-2 px-4 text-grey-blue cursor-pointer"
					@click="handleActiveTab(tab)"
				>
					{{ tab }}
				</li>
			</ul>

			<div v-if="activeTab === 'Doctors'">
				<div v-for="(practitioner, index) in practitioners" :key="index">
					<list-of-doctors :practitioner="practitioner" />
				</div>
			</div>
			<div v-if="activeTab === 'Services'">
				<div v-for="(practitioner, index) in selectedSpecialty" :key="index">
					<list-of-services />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator"
import ListOfDoctors from "./ListOfDoctors.vue"
import ListOfServices from "./ListOfServices.vue"
@Component({
  components: { ListOfDoctors, ListOfServices },
})
export default class HospitalSpecialties extends Vue {
  specialties: Array<any> = []
  activeTab: string = "Doctors"
  tabs: Array<any> = ["Doctors", "Services"]
  selectedSpecialty: any = <any>{}

  @Prop({ type: Object })
    hospital!: any

  handleActiveTab(tab: any) {
    this.activeTab = tab
  }

  selectSpecialty(specialty: any) {
    this.selectedSpecialty = specialty
  }

  get practitioners() {
    return this.selectedSpecialty && this.selectedSpecialty.practitioners
  }

  created() {
    this.selectedSpecialty =
      this.hospital && this.hospital.specialties && this.hospital.specialties[0]
  }
}
</script>

<style scoped>
.specialty-box {
  width: 224px;
  height: 88px;
  background: #f0f4fe;
  border-radius: 8px;
  padding: 16px;
}
.active-tab {
  border-bottom: 4px solid #fe4d3c;
  font-weight: 600;
  color: #14171f;
}
</style>
