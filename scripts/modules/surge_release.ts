import { execSync } from "child_process";

type Platform = "windows" | "mac" | "linux";
type ReleaseType = "nightly" | "stable";

export default function (platform?: Platform, type: ReleaseType = "nightly") {
    const repo = type === "stable" ? "surge-synthesizer/releases-xt" : "surge-synthesizer/surge";

    try {
        // 1️⃣ Get the latest release tag
        const listJson = execSync(`gh release list -R ${repo} --limit 1 --json tagName`, {
            encoding: "utf-8",
        });
        const [{ tagName: latestTag }] = JSON.parse(listJson);

        if (!latestTag) throw new Error("No release tag found");

        // 2️⃣ Fetch assets for that release
        const viewJson = execSync(`gh release view ${latestTag} -R ${repo} --json assets`, {
            encoding: "utf-8",
        });
        const { assets } = JSON.parse(viewJson);

        if (!assets?.length) throw new Error("No assets found for release");

        // 3️⃣ Match asset by platform
        const match = assets.find((asset: any) => {
            const name = asset.name.toLowerCase();

            switch (platform) {
                case "windows":
                    return name.includes("windows") || name.endsWith(".exe");
                case "mac":
                    return name.includes("macos") || name.endsWith(".dmg");
                case "linux":
                    return (
                        name.includes("linux") ||
                        name.endsWith(".appimage") ||
                        name.endsWith(".tar.gz")
                    );
                default:
                    return true; // if no platform filter specified
            }
        });

        if (!match) throw new Error(`No matching asset found for ${platform ?? "any"} platform`);

        return { downloadUrl: match.url };
    } catch (err) {
        console.error("❌ GitHub CLI failed:", err);
        return { downloadUrl: null };
    }
}
