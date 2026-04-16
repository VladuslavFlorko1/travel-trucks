
export type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: string[];
  createdAt: string;
  updatedAt: string;
  coverImage: string;
  totalReviews: number;
};

export type GalleryItem = {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
};

export type CamperDetails = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: string[];
  createdAt: string;
  updatedAt: string;
  gallery: GalleryItem[];
  totalReviews: number;
  reviews: Review[];
};

export type CampersResponse = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
};
export type Review = {
  id: string;
  reviewerName: string;
  reviewerRating: number;
  comment: string;
};
