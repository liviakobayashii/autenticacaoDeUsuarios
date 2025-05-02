"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getData } from "./api";

export function useData() {
  return useQuery({
    queryKey: ["data"],
    queryFn: getData,
  });
}
export default function InvalidateData() {
  const queryClient = useQueryClient();
  return queryClient.invalidateQueries({ queryKey: ["data"] });
}
