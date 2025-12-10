import { ViewClient } from "@/components/app/Clients/manage/ViewClient";
type Params = {
  id: string;
};
const ViewClientPage = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;
  return <ViewClient id={id} />;
};

export default ViewClientPage;
