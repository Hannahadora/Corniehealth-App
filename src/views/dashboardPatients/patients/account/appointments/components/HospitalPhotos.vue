<template>
	<div>
		<div class="xl:flex hidden items-center gap-6">
			<div v-for="(photo, idx) in photos" :key="idx">
				<img class="hospital-gallery-frame" :src="photo" alt="" />
			</div>
		</div>

		<div class="xl:hidden block">
			<hooper
				v-for="(photo, idx) in photos"
				:key="idx"
				:settings="hooperSettings"
			>
				<slide>
					<img class="hospital-gallery-frame" :src="photo" alt="" />
				</slide>

				<hooper-navigation slot="hooper-addons"></hooper-navigation>
			</hooper>
		</div>

		<div v-if="noPhoto" class="h-40">None</div>
	</div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper"
import "hooper/dist/hooper.css"

export default {
  name: "Hospitalphoto",
  components: {
    Hooper,
    Slide,
    HooperNavigation,
  },

  props: {
    hospital: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      hooperSettings: {
        itemsToShow: 1,
        centerMode: true,
        breakpoints: {
          1280: {
            itemsToShow: 3,
          },

          1024: {
            itemsToShow: 2,
          },

          768: {
            itemsToShow: 1,
          },
        },
      },
    }
  },

  computed: {
    photos() {
      return this.hospital && this.hospital?.photos
    },
    nophoto() {
      return (
        this.hospital && this.hospital?.photos && this.hospital?.photos?.length < 1
      )
    },
  },
}
</script>

<style scoped>
.hooper-list {
  overflow-x: auto;
  overflow-y: auto;
  width: 100%;
  max-height: 350px;
  margin: auto;
}

.hospital-gallery-frame {
  width: 200px;
  height: 200px;
  border-radius: 8px;
}
</style>
