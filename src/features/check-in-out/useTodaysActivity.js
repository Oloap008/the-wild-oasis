import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodaysActivity() {
  const { isPending, data: activities } = useQuery({
    queryKey: ["todays-activities"],
    queryFn: getStaysTodayActivity,
  });

  return { isPending, activities };
}
