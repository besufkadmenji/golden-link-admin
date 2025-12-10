import { MessageDetail } from "@/components/app/ContactUs/Detail/MessageDetail";
type Params = {
  id: string;
};
const MessageDetailPage = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;
  return <MessageDetail id={id} />;
};

export default MessageDetailPage;
