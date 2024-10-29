import type { AsyncDataRequestStatus } from "#app";

export const useStatusState = () => {
  const status = useState<Record<string, AsyncDataRequestStatus>>(
    "StatusState",
    () => ({})
  );

  const handler = (key: string, newStatus: AsyncDataRequestStatus) => {
    status.value[key] = newStatus;
  };

  return { status, handler };
};
