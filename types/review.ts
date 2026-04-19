export type ReviewApi = {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
};

export type Review = {
  id: string;
  camperId: string;
  reviewerName: string;
  reviewerRating: number;
  comment: string;
  createdAt: string;
};