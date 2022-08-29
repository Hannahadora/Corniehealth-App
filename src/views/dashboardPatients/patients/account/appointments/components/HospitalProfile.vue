<template>
	<div>
		<div class="info-container p-6 mb-12">
			<div class="flex items-start mb-8">
				<img
					class="mr-4 hospital-icon"
					src="/images/book-appointment/unsplash_gkZ-k3xf25w.png"
					alt=""
				/>
				<div class="w-3/5">
					<div class="mb-2 flex items-center">
						<span class="sub-titles-1 mr-2">{{
							hospital && hospital.name
						}}</span>
						<img src="/images/book-appointment/ratings.png" alt="" />
					</div>
					<div class="mb-2">
						{{ hospital && hospital.website }} |
						{{ hospital && hospital.phone }}
					</div>
					<div class="">{{ hospital && hospital.address }}</div>
				</div>
				<div class="w-1/5">
					<div class="lg:mb-2 mb-4 flex items-start">
						<img
							class="mr-3"
							src="/images/book-appointment/icon-date-white.png"
							alt=""
						/>
						<span class="">{{ hospital && hospital.activeSince }}</span>
					</div>
					<div class="lg:mb-2 mb-4 flex items-center">
						<img
							class="mr-3"
							src="/images/book-appointment/icon-sethos-grey.png"
							alt=""
						/>
						<span class="">{{ hospital && hospital.practitionerCount }}</span>
					</div>
					<div class="lg:mb-2 mb-4 flex items-center">
						<img
							class="mr-3"
							src="/images/book-appointment/icon-patients-grey.png"
							alt=""
						/>
						<span class="">{{ (hospital && hospital.patientCount) }}</span>
					</div>
				</div>
			</div>

			<div class="mb-8 flex items-start col-span-2">
				<img
					class="mr-3"
					src="/images/book-appointment/icon-doctor-grey.png"
					alt=""
				/>
				<div class="">
					Specialties ({{
						specialties && specialties.length
					}}):
					<span
						v-for="(specialty, index) in specialties && specialties.slice(0,4)"
						:key="index"
					>{{ specialty && specialty.name
					}}<b> ({{ specialty && specialty.practitioners.length }})</b> | </span
					>
					{{
						specialties && specialties.length > 5
							? `+ ${specialties && specialties.length - 4}`
							: ""
					}}
				</div>
			</div>

			<div v-if="!$route.params.id" class="mt-10">
				<c-button
					type="button"
					secondary
					small
					@click="
						$router.push({
							path: `/patients/appointment/hospital/${hospital.id}/info`,
						})
					"
				>View Profile</c-button
				>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator"
@Component({
  components: {},
})
export default class HospitalsProfile extends Vue {
  @Prop({ type: Object })
    hospital!: any

  get specialties() {
    return this.hospital && this.hospital.specialties
  }
}
</script>

<style scoped>
.hospital-icon {
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
</style>
