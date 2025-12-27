import { jsxRenderer } from "hono/jsx-renderer";
import { Link, ViteClient } from "vite-ssr-components/hono";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_URL,
} from "./utils/constants";

export const layout = jsxRenderer(({ children }) => {
  return (
    <html lang="en" class="dark">
      <head>
        <ViteClient />
        <Link href="/src/style.css" rel="stylesheet" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>{SITE_NAME}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={SITE_URL} />
        {/* open graph */}
        <meta property="og:title" content={SITE_NAME} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={SITE_OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_NAME} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={SITE_OG_IMAGE} />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
        <meta name="twitter:image:type" content="image/png" />
      </head>
      <body class="bg-neutral-900 text-neutral-300 overflow-y-scroll min-h-screen flex flex-col p-4 mb-30">
        <div class="flex-1">{children}</div>
      </body>
    </html>
  );
});
