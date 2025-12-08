import { ViewNotification } from "@/components/app/Notifications/manage/ViewNotification";
type Params = {
  id: string;
};
const ViewNotificationPage = async ({
  params,
}: {
  params: Promise<Params>;
}) => {
  const { id } = await params;
  return <ViewNotification id={id} />;
};

export default ViewNotificationPage;
