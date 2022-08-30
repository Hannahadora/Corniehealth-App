<template>
	<div>
		<div class="flex items-center justify-between mt-6">
			<div class="flex items-center">
				<img
					class="mr-4 w-14 h-14 rounded-full"
					:src="practitioner.image"
					alt=""
				/>
				<div class="">
					<div class="mb-2 sub-titles-1">
						{{ practitioner && practitioner.name }}
					</div>
					<img :src="`/images/ratings/${practitioner.rating}star.svg`" alt="" />
				</div>
			</div>
			<div>
				<c-button
					type="button"
					class="xl:mr-2 xl:mb-0 mb-6 xl:w-auto w-full"
					:primary="true"
					small
					@click="
						$router.push({
							path: `/patients/appointment//doctor/${practitioner.id}/profile`,
						})
					"
				>
					View Availablity
				</c-button>
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
@Options({
	name: 'ListOfDoctors',
  components: {},
})
export default class ListOfDoctors extends Vue {

  @Prop({ type: Object })
    practitioner!: any
}
</script>

<style></style>
