import IAppointmentRoom from "@/types/IAppointmentRoom";
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

// @appointmentRoom.State
//   appointmentrooms!: IAppointmentRoom[];

//   @appointmentRoom.Action
//   deleteAppointmentroom!: (id: string) => Promise<boolean>;

//   @appointmentRoom.Action
//   fetchAppointmentrooms!: () => Promise<void>;

//   @appointmentRoom.Getter
//   locationRooms!: IAppointmentRoom[];
export function useAppointmentRooms() {
  const store = useStore();

  const appointmentRooms = computed<IAppointmentRoom[]>(
    () => store.state.appointmentRoom.appointmentrooms
  );

  const locationRooms = computed<IAppointmentRoom[]>(
    () => store.getters["appointmentRoom/locationRooms"]
  );

  const fetchRooms = () =>
    store.dispatch("appointmentRoom/fetchAppointmentrooms");

  onBeforeMount(() => {
    if (appointmentRooms.value.length < 1) {
      fetchRooms();
    }
  });

  return {
    locationRooms,
    appointmentRooms,
  };
}
