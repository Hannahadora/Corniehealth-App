import { cornieClient } from "@/plugins/http";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { splitDate } from "@/plugins/utils";

interface DailyCalendar {
  [hourRange: string]: "available" | "unavailble";
}

interface Slot {
  startTime: string;
  endTime: string;
}

async function fetchPersonalCalendar(
  locationId: string,
  practitionerId: string,
  date: string
): Promise<DailyCalendar> {
  try {
    const { data } = await cornieClient().get(
      `/api/v1/calendar/personal/day-view/${locationId}/practitioner/${practitionerId}`,
      { date }
    );
    return data;
  } catch (error) {
    return {};
  }
}

function padTime(num: number) {
  return num < 10 ? `0${num}:00` : `${num}:00`;
}

function buildSlot(hour: string) {
  const startTime = padTime(Number(hour));
  const endTime = padTime(Number(hour) + 1);
  return { startTime, endTime };
}

function generateSlots(calendar: DailyCalendar) {
  const available = Object.entries(calendar).filter(
    ([key, value]) => value == "available"
  );
  const slots = available.map(([hour, value]) => buildSlot(hour));
  return slots;
}

async function getSlots(
  practitionerId: string,
  locationId: string,
  date: string
) {
  const calendar = await fetchPersonalCalendar(
    locationId,
    practitionerId,
    date
  );
  const slots = generateSlots(calendar);
  return slots;
}

export function usePractitionerSlots() {
  const store = useStore();

  const authLocationId = computed(
    () => store.getters["user/authCurrentLocation"]
  );

  const slots = ref<Slot[]>([]);
  const practitionerId = ref("");

  watch(practitionerId, async (value, oldValue) => {
    if (value == oldValue || !value) return;
    const date = splitDate(new Date());
    const _slots = await getSlots(value, authLocationId.value, date);
    slots.value = _slots;
  });

  return {
    practitionerId,
    slots,
  };
}
