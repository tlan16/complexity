import debounce from "lodash/debounce";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { PluginId } from "@/data/registries/plugins/meta.types";
import useExtensionSettings from "@/services/infra/extension-api-wrappers/extension-settings/useExtensionSettings";

export const pluginId: PluginId = "home:customSlogan";

export default function CustomHomeSloganPluginSettingsUi() {
  const { settings, mutation } = useExtensionSettings();

  const debouncedMutate = useMemo(
    () =>
      debounce(() => {
        mutation.mutate(() => {});
      }, 300),
    [mutation],
  );

  if (!settings) return null;

  return (
    <div className="x:flex x:flex-col x:gap-4">
      <Switch
        textLabel="Enable"
        checked={settings?.plugins["home:customSlogan"].enabled}
        onCheckedChange={({ checked }) =>
          mutation.mutate((draft) => {
            draft.plugins["home:frank"].enabled = checked;
          })
        }
      />
    </div>
  );
}
