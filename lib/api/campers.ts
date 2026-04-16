import { api } from "./axios";

type GetCampersParams = {
  pageParam?: number;
  limit?: number;
};

export async function getCampers({
  pageParam = 1,
  limit = 4,
}: GetCampersParams) {
  const response = await api.get("/campers", {
    params: {
      page: pageParam,
      limit,
    },
  });

  return response.data;
}