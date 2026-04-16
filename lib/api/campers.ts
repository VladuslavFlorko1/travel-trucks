import { api } from "./axios";
import { CampersResponse } from "@/types/camper";
import { Filters } from "@/types/filters";

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