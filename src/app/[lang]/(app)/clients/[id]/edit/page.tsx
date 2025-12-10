import { EditClient } from "@/components/app/Clients/manage/EditClient";
type Params = {
  id: string;
};
const EditClientPage = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;
  return <EditClient id={id} />;
};

export default EditClientPage;
