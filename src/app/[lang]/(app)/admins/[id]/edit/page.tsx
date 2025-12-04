import { EditAdmin } from "@/components/app/Admins/manage/EditAdmin";
type Params = {
  id: string;
};
const EditAdminPage = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;
  return <EditAdmin id={id} />;
};

export default EditAdminPage;
