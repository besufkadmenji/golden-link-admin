import { ViewAdmin } from "@/components/app/Admins/manage/ViewAdmin";
type Params = {
  id: string;
};
const ViewAdminPage = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;
  return <ViewAdmin id={id} />;
};

export default ViewAdminPage;
