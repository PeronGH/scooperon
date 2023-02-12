export interface Handler {
  toJSON(): Promise<ScoopAppJSON>;
}

export type ScoopAppJSON =
  & {
    version: string;
    description?: string;
    homepage?: string;
    license?: string | {
      identifier: string;
      url: string;
    };
    notes?: string;
    bin?: string[];
    env_add_path?: string;
    persist?: string[];
  }
  & (InstallationInfo | {
    architecture: {
      "64bit"?: InstallationInfo;
      "32bit"?: InstallationInfo;
      "arm64"?: InstallationInfo;
    };
  });

interface InstallationInfo {
  url: string;
  hash?: string;
  extract_dir?: string;
  pre_install?: string;
  installer?: ProgramInvocation;
  post_install?: string;
  uninstaller?: ProgramInvocation;
  shortcuts?: Shortcut[];
}

interface Shortcut {
  name: string;
  target: string;
  args?: string;
  description?: string;
  working_dir?: string;
  icon?: string;
  run_as?: string;
}

interface ProgramInvocation {
  script?: string;
  type?: string;
  file?: string;
  args?: string[];
  bin?: string;
  env?: {
    [key: string]: string;
  };
}
