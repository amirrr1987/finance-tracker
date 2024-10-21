/* eslint-disable @typescript-eslint/no-namespace */
import type { z } from "zod";
import type { schema } from "~/schema/transaction.schema";

export namespace TransactionDTO {
  export type Content = z.input<typeof schema>;

  export namespace CreateOne {
    export type Request = Omit<Content, "id">;
    export type Response = Content;
  }

  export namespace GetAll {
    export type Response = Content[];
  }
  export namespace GetOne {
    export type Request = Content["id"];
    export type Response = Content;
  }
  export namespace UpdateOne {
    export type Request = Content;
    export type Response = Content;
  }
  export namespace DeleteOne {
    export type Request = Content["id"];
    export type Response = Content;
  }
}
