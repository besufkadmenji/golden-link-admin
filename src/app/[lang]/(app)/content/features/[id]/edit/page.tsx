import { EditFeature } from "@/components/app/Features/manage/EditFeature";
type Params = {
  id: string;
};
const EditFeaturePage = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;
  return <EditFeature id={id} />;
};

export default EditFeaturePage;
