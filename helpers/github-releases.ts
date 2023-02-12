export async function fetchLatestReleaseData(
  owner: string,
  repo: string,
  regex?: RegExp,
): Promise<{ url: string; hash: string }[]> {
  const latestReleaseUrl = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;

  // Make a GET request to fetch the latest release data
  const response = await fetch(latestReleaseUrl);
  const releaseData = await response.json();

  // Extract the download URLs for each release asset
  const downloadUrls = releaseData.assets.flatMap((asset: { browser_download_url: string; name: string }) => {
    const { browser_download_url, name } = asset;
    if (regex && !regex.test(name)) {
      return [];
    }
    return [{ url: browser_download_url, name }];
  });

  // Calculate the SHA256 hash for each file that matches the regex pattern
  const fileHashes = await Promise.all(downloadUrls.map(async ({ url, _name }: { url: string; _name: string }) => {
    const fileResponse = await fetch(url);
    const fileData = await fileResponse.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", fileData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return { url, hash: hashHex };
  }));

  return fileHashes;
}

export async function fetchLatestVersion(
  owner: string,
  repo: string,
): Promise<string> {
  const latestReleaseUrl = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;

  // Make a GET request to fetch the latest release data
  const response = await fetch(latestReleaseUrl);
  const releaseData = await response.json();

  return releaseData.tag_name;
}
