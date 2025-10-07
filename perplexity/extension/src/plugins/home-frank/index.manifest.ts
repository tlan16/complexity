import { z } from "zod";

import { definePlugin } from "@/data/registries/plugins/utils";

declare module "@/data/registries/plugins/meta.types" {
  interface PluginsSettingsRegistry {
    "home:frank": z.infer<typeof schema>;
  }
}

const schema = z.object({
  enabled: z.boolean(),
});

export default definePlugin({
  meta: {
    id: "home:frank",
    title: "Frank's Plugin",
    description: "Frank's fun plugin",
    dashboardMeta: {
      tags: ["ui"],
      categories: ["misc"],
      uiRouteSegment: "home-frank",
    },
    dependencies: {
      corePlugins: ["spaRouter", "domObservers:home"],
    },
  },
  settingsSchema: {
    schema,
    fallback: {
      enabled: false,
    } satisfies z.infer<typeof schema>,
  },
});
