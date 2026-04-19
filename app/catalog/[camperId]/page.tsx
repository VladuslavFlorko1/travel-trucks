import CamperDetails from "@/components/CamperDetails/CamperDetails";
import { getCamperById } from "@/lib/api/campers";

type Props = {
  params: Promise<{
    camperId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { camperId } = await params;
  const camper = await getCamperById(camperId);

  return <CamperDetails camper={camper} />;
}