import { Handler, ScoopAppJSON } from "../types.ts";

export const handler: Handler = {
  async toJSON() {
    const json: ScoopAppJSON = await fetch(
      "https://raw.githubusercontent.com/batkiz/backit/master/bucket/Icalingua-plus-plus.json",
    )
      .then((res) => res.json());

    if ("architecture" in json) {
      Object.values(json.architecture).forEach((info) => {
        if (info.pre_install instanceof Array) {
          info.pre_install[0] = info.pre_install[0].replace("app-64.7z", "dl.7z");
        }
      });
    }

    return json;
  },
};
