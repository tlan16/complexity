import { AsyncLoaderRegistry } from "@/plugins/__async-deps__/async-loaders";
import { homeDomObserverStore } from "@/plugins/__core__/dom-observers/home/store";
import { DomSelectorsService } from "@/plugins/__core__/dom-selectors/service-init.loader";
import { homeCustomSloganCssResourceConfig } from "@/plugins/home-frank/index.remote-resources";
import { getVersionedRemoteResource } from "@/services/externals/cplx-api/versioned-remote-resources/utils";
import { ExtensionSettingsService } from "@/services/infra/extension-api-wrappers/extension-settings";
import { insertCss } from "@/utils/dom-utils/generics";
import { whereAmI } from "@/utils/misc/utils";

let removeCss: (() => void) | null = null;

declare module "@/plugins/__async-deps__/async-loaders" {
  interface AsyncLoadersRegistry {
    "plugin:home:frank": void;
  }
}

export default function loader() {
  AsyncLoaderRegistry.register({
    id: "plugin:home:frank",
    dependencies: ["cache:pluginsEnableStates"],
    loader: async ({ "cache:pluginsEnableStates": pluginsEnableStates }) => {
      if (!pluginsEnableStates["home:frank"]) return;
      if (!["comet_ntp", "home"].includes(whereAmI())) return;
      const button = document.querySelector(
        `[data-testid="search-mode-research"]`,
      )?.parentElement;
      if (!button) return;
      while (button.ariaChecked?.toString() === "false") {
        button.click();
        await new Promise((resolve) => setTimeout(resolve, 10));
        if (button.ariaChecked?.toString() === "true") break;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      document.getElementById("ask-input")?.click();
    },
  });
}
