<template>
	<div>
		<div v-for="hospital in hospitals" :key="hospital.id">
			<hospital-profile :hospital="hospital" />
		</div>
		<div
			v-if="hospitals.length === 0"
			class="my-24 flex items-center justify-center font-bold text-ceneter"
		>
			<div class="text-center flex flex-col items-center justify-center">
				<img class="mb-8" src="/images/doctor-bro.svg" alt="" />
				<h3 class="mb-4">We couldn’t find any hospital matching your search</h3>
				<p class="mb-8">Please modify and search again.</p>
				<div>
					<c-button
						class="w-full"
						type="button"
						:secondary="true"
						small
						@click="$router.go(-1)"
					>
						Go Back
					</c-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";

// import HospitalProfile from "~/components/BookAppointment/HospitalProfile.vue"
@Options({
  components: {  },
})
export default class HospitalsPage extends Vue {
  search: any = ""
  loading: boolean = false

  @Prop({ type: Array })
    hospitals!: any[]

  async created() {}
}
</script>

<style scoped>
.hospital-icon {
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
</style>
