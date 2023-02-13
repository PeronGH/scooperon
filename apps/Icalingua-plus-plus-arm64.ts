import { Handler, ScoopAppJSON } from "../types.ts";
import { fetchLatestVersion } from "../helpers/github-releases.ts";

export const handler: Handler = {
  async toJSON() {
    const version = await fetchLatestVersion("Icalingua-plus-plus", "Icalingua-plus-plus");

    const json: ScoopAppJSON = {
      version,
      url: `https://github.com/Icalingua-plus-plus/Icalingua-plus-plus/releases/download/${version}/Icalingua++-${
        version.slice(1)
      }_arm64.exe`,
      bin: [`Icalingua++-${version.slice(1)}_arm64.exe`],
    };

    return json;
  },
};
