import { EditPackage } from "@/components/app/Packages/manage/EditPackage";
type Params = {
  id: string;
};
const EditPackagePage = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;
  return <EditPackage id={id} />;
};

export default EditPackagePage;
