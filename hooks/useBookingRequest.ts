"use client";

import { useMutation } from "@tanstack/react-query";
import { createBookingRequest } from "@/lib/api/campers";
import { BookingRequestData } from "@/types/booking";

export function useBookingRequest(camperId: string) {
  return useMutation({
    mutationFn: (bookingData: BookingRequestData) =>
      createBookingRequest(camperId, bookingData),
  });
}