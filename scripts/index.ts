import { execSync } from "child_process";

let downloadUrl: string | null = null;

export function get_release(repo: string, platform?: "windows" | "mac" | "linux") {
    try {
        const result = execSync(`gh release -R ${repo} view --json tagName,url,assets`, {
            encoding: "utf-8",
        });
        const release = JSON.parse(result);

        const matchingAssets = release.assets.filter((asset: any) => {
            if (!platform) return true;
            const name = asset.name.toLowerCase();
            if (platform === "windows") return name.includes("windows") || name.endsWith(".exe");
            if (platform === "mac") return name.includes("macos") || name.endsWith(".dmg");
            if (platform === "linux")
                return (
                    name.includes("linux") || name.endsWith(".AppImage") || name.endsWith(".tar.gz")
                );
            return false;
        });

        if (matchingAssets.length > 0) {
            downloadUrl = matchingAssets[0].url; // the GH CLI JSON url
        } else {
            downloadUrl = release.url; // fallback to release page
        }
    } catch (err) {
        console.error("GH CLI failed:", err);
        downloadUrl = null;
    }

    return downloadUrl;
}

// console.log(get_release("surge-synthesizer/surge", "windows"));
