import { api } from "./axios";
import { CampersResponse, CamperDetails } from "@/types/camper";
import { Filters } from "@/types/filters";
import { BookingRequestData, BookingResponse } from "@/types/booking";
import { Review, ReviewApi } from "@/types/review";
import { CamperFiltersResponse } from "@/types/camperFilters";

type GetCampersParams = {
  pageParam?: number;
  perPage?: number;
  filters?: Filters;
};

export async function getCampersFilters(): Promise<CamperFiltersResponse> {
  const response = await api.get<CamperFiltersResponse>("/campers/filters");
  return response.data;
}

export async function getCampers({
  pageParam = 1,
  perPage = 4,
  filters,
}: GetCampersParams): Promise<CampersResponse> {
  const response = await api.get<CampersResponse>("/campers", {
    params: {
      page: pageParam,
      perPage,
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
  const response = await api.get<ReviewApi[]>(`/campers/${camperId}/reviews`);

  return response.data.map((review) => ({
    id: review.id,
    camperId: review.camperId,
    reviewerName: review.reviewer_name,
    reviewerRating: review.reviewer_rating,
    comment: review.comment,
    createdAt: review.createdAt,
  }));
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