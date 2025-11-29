import { SubscriberRequestDetail } from "@/components/app/SubscribersRequests/Detail/SubscriberRequestDetail";
type Params = {
  id: string;
};
const SubscriberRequestDetailPage = async ({
  params,
}: {
  params: Promise<Params>;
}) => {
  const { id } = await params;
  return <SubscriberRequestDetail id={id} />;
};

export default SubscriberRequestDetailPage;
