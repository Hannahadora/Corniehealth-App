<template>
  <div>
    <div
      v-if="practitioner && practitioner.reviews && practitioner.reviews.length"
    >
      {{ practitioner.reviews }}
    </div>
    <div v-else>No reviews</div>
    <!-- <div class="mb-8">
			<div class="flex items-center">
				<img class="mr-4" src="/images/book-appointment/Avatar.png" alt="" />
				<div>
					<span class="sub-titles-1 text-black-xiketic mb-2"
					>Toyosi Adeola</span
					>
					<div class="flex items-center">
						<img
							class="xl:h-auto h-6 xl:w-auto w-28"
							src="/images/book-appointment/ratings.png"
							alt=""
						/>
						<p class="small-text text-grey-blue whitespace-nowrap">5 days ago</p>
					</div>
				</div>
			</div>
			<p class="text-grey-blue mt-6">
				Dr Sarah have really been quite helpful in my teeth cleaning procedure.
				I was quite skeptical about going through with but she made me see
				reasons why i should. The best feeling ever.
			</p>
		</div>

		<div>
			<div class="flex items-center">
				<img class="mr-4" src="/images/book-appointment/Avatar.png" alt="" />
				<div>
					<span class="sub-titles-1 text-black-xiketic mb-2">John Adegoke</span>
					<div class="flex items-center">
						<img
							class="xl:h-auto h-6 xl:w-auto w-28"
							src="/images/book-appointment/ratings.png"
							alt=""
						/>
						<p class="small-text text-grey-blue whitespace-nowrap">7 days ago</p>
					</div>
				</div>
			</div>
			<p class="text-grey-blue mt-6">
				Dr Sarah have really been quite helpful in my teeth cleaning procedure.
				I was quite skeptical about going through with but she made me see
				reasons why i should. The best feeling ever.
			</p>
		</div> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

@Options({
name: "Reviews",
  components: {},
})
export default class Reviews extends Vue {
  @Prop({ type: Object, default: {} })
  practitioner!: any;
}
</script>
