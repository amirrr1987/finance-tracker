import type { AsyncData, UseFetchOptions } from "#app";

export const useFetcher = async <DataT, ErrorT>(
  url: string | Request | Ref<string | Request> | (() => string) | Request,
  options?: UseFetchOptions<DataT>
): Promise<AsyncData<DataT, ErrorT>> => {
  const execute = ref();
  const refresh = ref();
  const clear = ref();
  const data = ref();
  const error = ref();
  const status = ref();
  const pending = ref();
  try {
    const res = await useFetch(url, options);
    console.log(res.data.value);
    
    data.value = res.data;
    error.value = res.error;
    status.value = res.status;
    pending.value = res.pending;
    execute.value = res.execute;
    refresh.value = res.refresh;
    clear.value = res.clear;
  } catch (error) {
    console.log(error);
  }

  return {
    data: data.value,
    error,
    execute: async () => await execute.value(),
    refresh: async () => await refresh.value(),
    clear: () => clear.value(),
    pending,
    status,
  };
};
