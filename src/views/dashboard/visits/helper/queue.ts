import { cornieClient } from "@/plugins/http";
import { splitDate } from "@/plugins/utils";
import store from "@/store";

export interface QueuedPatient {
  image: string;
  queueNo: number;
  patient: string;
}

const Dummy: QueuedPatient[] = [
  {
    image: "https://picsum.photos/id/237/200/300",
    queueNo: 1,
    patient: "Anyim Pius",
  },
  {
    image: "https://picsum.photos/id/237/200/300",
    queueNo: 2,
    patient: "Seyi Pius",
  },
  {
    image: "https://picsum.photos/id/237/200/300",
    queueNo: 3,
    patient: "Makinde Pius",
  },
];

export async function getPractitionerQueue(practitionerId: string) {
  const locationId = store.getters["user/authCurrentLocation"];
  const date = splitDate(new Date());
  try {
    const { data } = await cornieClient().get(
      `/api/v1/appointment/practitioner/queue/${practitionerId}/location/${locationId}`,
      { date }
    );

    return data as QueuedPatient[];
  } catch (error) {
    window.notify({ msg: "Unable to fetch visit queue", status: "error" });
  }
  return [];
}
