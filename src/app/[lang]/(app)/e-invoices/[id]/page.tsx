import { EInvoiceDetail } from "@/components/app/EInvoices/Detail/EInvoiceDetail";

type Params = {
  id: string;
};

const EInvoiceDetailPage = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;
  return <EInvoiceDetail id={id} />;
};

export default EInvoiceDetailPage;
