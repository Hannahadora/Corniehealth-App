<template>
	<div>
		<div>
			<span class="sub-titles-1 mb-2">Bio</span>
			<p class="text-grey-blue">
				{{ practitioner && practitioner.bio || "No bio" }}
			</p>
		</div>

		<div class="mt-8">
			<span class="sub-titles-1 mb-2">Treatments/Services</span>
			<!-- <p class="text-grey-blue">
				Specializes in diagnosing and treating most common dental infections or
				conditions
			</p> -->

			<div v-for="(service, idx) in practitioner && practitioner.services" :key="idx">
				<div class="mt-4 flex items-center">
					<img src="/images/book-appointment/arrow-right.png" alt="" />
					<span class="ml-2 small-text">{{ service }}</span>
				</div>

				<div class="mt-2 flex items-center">
					<img src="/images/book-appointment/arrow-right.png" alt="" />
					<span class="ml-2 small-text">{{ service }}</span>
				</div>

				<div class="mt-2 flex items-center">
					<img src="/images/book-appointment/arrow-right.png" alt="" />
					<span class="ml-2 small-text">{{ service }}</span>
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


@Options({
	name: "BasicInfo",
  components: {},
})
export default class BasicInfo extends Vue {
  @Prop({ type: Object, default: {} })
    practitioner!: any
}
</script>
