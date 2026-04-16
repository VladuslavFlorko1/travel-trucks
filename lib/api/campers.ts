import { api } from "./axios";
import { CampersResponse, CamperDetails } from "@/types/camper";
import { Filters } from "@/types/filters";
import { BookingRequestData, BookingResponse } from "@/types/booking";
import { Review } from "@/types/review";

type GetCampersParams = {
  pageParam?: number;
  limit?: number;
  filters?: Filters;
};

export async function getCampers({
  pageParam = 1,
  limit = 4,
  filters,
}: GetCampersParams): Promise<CampersResponse> {
  const response = await api.get<CampersResponse>("/campers", {
    params: {
      page: pageParam,
      limit,
      ...(filters?.location && { location: filters.location }),
      ...(filters?.form && { form: filters.form }),
      ...(filters?.engine && { engine: filters.engine }),
      ...(filters?.transmission && { transmission: filters.transmission }),
    },
  });

  return response.data;
}

export async function getCamperById(id: string): Promise<CamperDetails> {
  const response = await api.get<CamperDetails>(`/campers/${id}`);
  return response.data;
}

export async function getCamperReviews(camperId: string): Promise<Review[]> {
  const response = await api.get<Review[]>(`/campers/${camperId}/reviews`);
  return response.data;
}

export async function createBookingRequest(
  camperId: string,
  bookingData: BookingRequestData
): Promise<BookingResponse> {
  const response = await api.post<BookingResponse>(
    `/campers/${camperId}/booking-requests`,
    bookingData
  );

  return response.data;
}