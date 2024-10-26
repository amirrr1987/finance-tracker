/* eslint-disable @typescript-eslint/no-namespace */
import type { z } from "zod";
import type { authSchema } from "~/schema/auth.schema";

export namespace AuthDTO {
  export type Content = z.input<typeof authSchema.content>;

  export namespace Login {
    export type Request = z.input<typeof authSchema.login.request>;
  }
}
