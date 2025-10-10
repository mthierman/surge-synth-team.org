import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const pages = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
    schema: z.object({
        title: z.string(),
    }),
});

const projects = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            order: z.number(),
            summary: z.string(),
            cover: image(),
            categories: z.string().array(),
            issue_tracker: z.string(),
            repo: z.string().optional(),
        }),
});

const surge_xt_releases = defineCollection({
    loader: file("./src/content/generated/surge_xt_releases.json"),
    // schema: z.object({
    //     stable: z.object({
    //         windows: z.string(),
    //         mac: z.string(),
    //         linux: z.string(),
    //     }),
    //     nightly: z.object({
    //         windows: z.string(),
    //         mac: z.string(),
    //         linux: z.string(),
    //     }),
    // }),
});

export const collections = {
    pages: pages,
    projects: projects,
    surge_xt_releases: surge_xt_releases,
};
