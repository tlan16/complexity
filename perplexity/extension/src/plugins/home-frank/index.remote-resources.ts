import { z } from "zod";

import { defineVersionedRemoteResource } from "@/services/externals/cplx-api/versioned-remote-resources";
import homeFrankCss from "@/plugins/home-frank/styles.css?inline";

export const homeCustomSloganCssResourceConfig = defineVersionedRemoteResource({
  name: "plugin.homeFrank.css",
  type: "css",
  fallback: homeFrankCss,
  zodSchema: z.string(),
});
