import { EditSubscriber } from "@/components/app/Subscribers/manage/EditSubscriber";

type Params = {
  id: string;
};

const EditSubscriberPage = async ({
  params,
}: {
  params: Promise<Params>;
}) => {
  const { id } = await params;
  return <EditSubscriber id={id} />;
};

export default EditSubscriberPage;
