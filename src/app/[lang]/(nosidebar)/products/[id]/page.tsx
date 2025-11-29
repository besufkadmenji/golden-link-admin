import { ViewProduct } from "@/components/app/SubscribersRequests/manage/View/ViewProduct";
type Params = {
  id: string;
};
const ProductDetailPage = async ({ params }: { params: Promise<Params> }) => {
  const id = (await params).id;
  return <ViewProduct productId={id} />;
};

export default ProductDetailPage;
