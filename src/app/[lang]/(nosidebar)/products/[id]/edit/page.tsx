import { EditProduct } from "@/components/app/SubscribersRequests/manage/Edit/EditProduct";
type Params = {
  id: string;
};
const EditProductPage = async ({ params }: { params: Promise<Params> }) => {
  const id = (await params).id;
  return <EditProduct productId={id} />;
};

export default EditProductPage;
