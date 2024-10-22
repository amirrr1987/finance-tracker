/* eslint-disable @typescript-eslint/no-namespace */
import type { z } from "zod";
import type { transactionSchema } from "~/schema/transaction.schema";

export namespace TransactionDTO {
  export type Content = z.input<typeof transactionSchema.content>;

  export namespace CreateOne {
    export type Request = z.input<typeof transactionSchema.createOne.request>;
  }
  export namespace GetAll {
    export type Response = z.output<typeof transactionSchema.getAll.response>;
  }
  export namespace GetOneById {
    export type Request = z.input<typeof transactionSchema.getOneById.request>;
    export type Response = z.output<
      typeof transactionSchema.getOneById.response
    >;
  }
  export namespace UpdateOneById {
    export type Request = z.input<
      typeof transactionSchema.updateOneById.request
    >;
    export type Response = z.output<
      typeof transactionSchema.updateOneById.response
    >;
  }
  export namespace DeleteOneById {
    export type Request = z.input<
      typeof transactionSchema.deleteOneById.request
    >;
  }
}
