"use client";
import SubscribersIcon from "@/assets/icons/app/subscribers.svg";
import { ExportButton } from "@/components/app/shared/button/ExportButton";
import { Gap } from "@/components/app/shared/Gap";
import { PageBar } from "@/components/app/shared/PageBar";
import { PageWrapper } from "@/components/app/shared/PageWrapper";
import {
  SummaryCard,
  SummaryCardType,
} from "@/components/app/shared/summary/SummaryCard";
import { SummaryCardSkeleton } from "@/components/app/shared/summary/SummaryCardSkeleton";
import { useDict } from "@/hooks/useDict";
import { Button } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { AddButton, AddButtonType } from "../shared/button/AddButton";
import { PackagesFilter } from "./PackagesFilter";
import { useUsers } from "./useAdmins";
import { PackagesList } from "./PackagesList";
import { TimeFilter } from "@/components/app/shared/TimeFilter";
export const Packages = () => {
  const dict = useDict();
  const router = useRouter();
  const pathname = usePathname();
  const { users, pagination, isLoading } = useUsers();

  return (
    <PageWrapper>
      <PageBar title={dict.packages.title}>
        <Button
          startContent={<SubscribersIcon className="size-5" />}
          onPress={() => {
            router.push("/packages/subscribers");
          }}
          className="rounded-lg bg-[#2563EB] text-white"
        >
          {dict.packages.buttons.subscribers_in_package}
        </Button>
        <AddButton
          type={AddButtonType.Package}
          onPress={() => {
            router.push(`${pathname}/add`);
          }}
        />
        <ExportButton model={""} />
      </PageBar>
      <Gap className="h-8" />
      {isLoading ? (
        <SummaryCardSkeleton />
      ) : (
        <SummaryCard
          type={SummaryCardType.PACKAGES}
          value={pagination?.totalItems || 0}
          endContent={<TimeFilter />}
        />
      )}

      <Gap className="h-6" />
      <div className="grid grid-cols-1 gap-4">
        <PackagesFilter />
        <PackagesList />
      </div>
    </PageWrapper>
  );
};
