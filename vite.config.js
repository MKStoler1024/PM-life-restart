/** @type {import('vite').UserConfig} */
const basePath = process.env.VITE_BASE_PATH || '/';

export default {
  base: basePath,
  build: {
    outDir: 'dist',
  },
  plugins: [
    {
      name: 'update-base-href',
      transformIndexHtml(html) {
        return html.replace(
          /<base href="[^"]*"/,
          `<base href="${basePath}"`
        );
      },
    },
  ],
}
