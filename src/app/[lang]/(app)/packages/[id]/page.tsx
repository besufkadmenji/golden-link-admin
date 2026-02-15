import { ViewPackage } from "@/components/app/Packages/manage/ViewPackage";

type Params = {
  id: string;
};
const PackagePage = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;
  return <ViewPackage id={id} />;
};

export default PackagePage;
