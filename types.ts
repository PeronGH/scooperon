export interface Handler {
  toJSON(): Promise<ScoopAppJSON>;
}

export type ScoopAppJSON =
  & BasicInfo
  & (InstallationInfo | ArchitectureInfo);

export interface ArchitectureInfo {
  architecture: {
    "64bit"?: InstallationInfo;
    "32bit"?: InstallationInfo;
    "arm64"?: InstallationInfo;
  };
}

export interface BasicInfo {
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

export interface InstallationInfo {
  url: string;
  hash?: string;
  extract_dir?: string;
  pre_install?: string | string[];
  installer?: ProgramInvocation;
  post_install?: string | string[];
  uninstaller?: ProgramInvocation;
  shortcuts?: Shortcut[];
}

export interface Shortcut {
  name: string;
  target: string;
  args?: string;
  description?: string;
  working_dir?: string;
  icon?: string;
  run_as?: string;
}

export interface ProgramInvocation {
  script?: string;
  type?: string;
  file?: string;
  args?: string[];
  bin?: string;
  env?: {
    [key: string]: string;
  };
}
