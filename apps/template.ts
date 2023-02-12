import { Handler, ScoopAppJSON } from "../types.ts";

export const handler: Handler = {
  async toJSON(): Promise<ScoopAppJSON> {
    return {
      version: "1.0.0",
      description: "Template for creating new apps",
      url: "https://example.com/template.zip",
      hash: "sha256",
    };
  },
};
