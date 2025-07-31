import { createFileRoute } from "@tanstack/react-router";
import { checkAuth } from "@/lib/auth";

export const Route = createFileRoute("/account/")({
  beforeLoad: () => checkAuth(["EXPERT"]),
  component: AccountPage,
});

import { useQuery } from "@tanstack/react-query";
import { AccountForm } from "@/components/User/AccountForm";
import axios from "@/app/config/axios";
import { getErrorResponse } from "@/lib/utils";
import { ErrorState } from "@/components";
import { queryClient } from "@/app/query/client";

async function getAccountDetails() {
  const { data } = await axios
    .get("/api/v1/account/expert")
    .then((res) => res.data)
    .catch((err) => getErrorResponse(err));

  return data;
}

function AccountPage() {
  const { data, isFetching, isPending, error } = useQuery({
    queryKey: ["account"],
    queryFn: getAccountDetails,
  });

  if (isFetching || isPending) {
    return <div>Fetching...</div>;
  }

  if (error) {
    return <ErrorState title={error.name} description={error.message} />;
  }

  if (!data) {
    return (
      <ErrorState
        title={"Try to refresh the page"}
        description={""}
        onRefresh={async () => await queryClient.invalidateQueries()}
      />
    );
  }
  return (
    <div className="w-full flex justify-center mx-auto px-2">
      <div className="w-full max-w-2xl space-y-6 py-2">
        <h1 className="text-2xl font-semibold">Account Details</h1>
        <AccountForm user={data} />
      </div>
    </div>
  );
}
