"use client";
import { ClientsList } from "@/components/app/Clients/ClientsList";
import { Gap } from "@/components/app/shared/Gap";
import { PageBar } from "@/components/app/shared/PageBar";
import { PageWrapper } from "@/components/app/shared/PageWrapper";
import {
  SummaryCard,
  SummaryCardType,
} from "@/components/app/shared/summary/SummaryCard";
import { SummaryCardSkeleton } from "@/components/app/shared/summary/SummaryCardSkeleton";
import { useDict } from "@/hooks/useDict";
import { usePathname, useRouter } from "next/navigation";
import { AddButton, AddButtonType } from "../shared/button/AddButton";
import { ClientsFilter } from "./ClientsFilter";
import { useClients } from "./useClients";
export const Clients = () => {
  const dict = useDict();
  const router = useRouter();
  const pathname = usePathname();
  const { clients, pagination, isLoading } = useClients();

  return (
    <PageWrapper>
      <PageBar title={dict.clients_management.title}>
        <AddButton
          type={AddButtonType.Client}
          onPress={() => {
            router.push(`${pathname}/add`);
          }}
        />
      </PageBar>
      <Gap className="h-8" />
      {isLoading ? (
        <SummaryCardSkeleton />
      ) : (
        <SummaryCard
          type={SummaryCardType.CLIENTS}
          value={pagination?.totalItems || 0}
        />
      )}

      <Gap className="h-6" />
      <div className="grid grid-cols-1 gap-4">
        <ClientsFilter />
        <ClientsList />
      </div>
    </PageWrapper>
  );
};
