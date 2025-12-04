import { SubscriberDetail } from "@/components/app/Subscribers/Detail/SubscriberDetail";
type Params = {
  id: string;
};
const SubscriberRequestDetailPage = async ({
  params,
}: {
  params: Promise<Params>;
}) => {
  const { id } = await params;
  return <SubscriberDetail id={id} />;
};

export default SubscriberRequestDetailPage;
