/** @type {import('tailwindcss').Config} */

export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Lato"],
        },
        extend: {
            colors: {
                surgeOrange: "var(--surgeOrange)",
                surgeOrangeBright: "var(--surgeOrangeBright)",
                surgeBlue: "var(--surgeBlue)",
                surgeBlueBright: "var(--surgeBlueBright)",
            },
        },
    },
    darkMode: "selector",
};
