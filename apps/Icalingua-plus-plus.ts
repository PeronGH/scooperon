import { Handler, ScoopAppJSON } from "../types.ts";
import { fetchLatestVersion } from "../helpers/github-releases.ts";

export const handler: Handler = {
  async toJSON() {
    const version = (await fetchLatestVersion("Icalingua-plus-plus", "Icalingua-plus-plus")).slice(1);

    const json: ScoopAppJSON = {
      version,
      architecture: {
        arm64: {
          url:
            `https://github.com/Icalingua-plus-plus/Icalingua-plus-plus/releases/download/v${version}/Icalingua++-${version}_arm64.exe`,
        },
      },
      bin: [`Icalingua++-${version}_arm64.exe`],
    };

    return json;
  },
};
