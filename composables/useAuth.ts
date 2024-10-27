import type { AsyncDataRequestStatus } from "#app";
import type { AuthDTO } from "~/types/auth.model";

export const useAuth = () => {
  const toast = useToast();
  const email = ref<AuthDTO.Login.Request>("");

  const pending = ref<AsyncDataRequestStatus>("idle");
  // const submit = async () => {
  //   pending.value = "pending";
  //   try {
  //     const { data, error } = await useAsyncData(
  //       `auth-${email.value}`,
  //       async () => {
  //         return await useFetch("/api/v1/auth/login", {
  //           body: {
  //             email: email.value,
  //           },
  //         });
  //       }
  //     );
  //     if (error.value) {
  //       toast.add({
  //         title: "Error authentication",
  //         description: error.value.message,
  //         icon: "i-herioicons-exclamation-circle",
  //         color: "rose",
  //       });
  //       // pending.value = "error";
  //     }
  //     console.log(data.value);

  //     // pending.value = "success";
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const submit = async () => {
    pending.value = "pending";
    try {
      const { error } = await useFetch(`/api/v1/auth/login`, {
        method: "post",
        body: {
          email: email.value,
        },
      });
      if (error.value) {
        pending.value = "error";
        toast.add({
          title: "Error",
          description: error.value.message,
          color: "red",
        });
      } else {
        pending.value = "success";
      }
    } catch (error) {
      console.log(error);
      pending.value = "error";
    }
  };
  return {
    email,
    pending,
    submit,
  };
};
