import { ViewFeature } from "@/components/app/Features/manage/ViewFeature";
type Params = {
  id: string;
};
const ViewFeaturePage = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;
  return <ViewFeature id={id} />;
};

export default ViewFeaturePage;
