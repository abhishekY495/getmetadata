import { SITE_OG_IMAGE, SITE_URL } from "../utils/constants";

export const OpenGraph = () => {
  return (
    <section class="space-y-4">
      <h2 class="text-3xl font-bold">🖼️ Open Graph</h2>
      <p>
        Open Graph or OG is an image that is used to represent the website on
        social media. First it will try to get the Open Graph image from the
        website. If not found, it will return a default placeholder{" "}
        <a
          href={SITE_OG_IMAGE}
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-400 hover:underline underline-offset-2"
        >
          image.
        </a>
      </p>
      <ul class="list-disc list-inside space-y-2">
        <li>
          Open Graph -{" "}
          <a
            href={`${SITE_URL}/github.com/og`}
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-400 hover:underline underline-offset-2"
          >
            {`${SITE_URL}/github.com/og`}
          </a>
        </li>
        <li>
          Twitter Open Graph -{" "}
          <a
            href={`${SITE_URL}/github.com/twitterog`}
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-400 hover:underline underline-offset-2"
          >
            {`${SITE_URL}/github.com/twitterog`}
          </a>
        </li>
      </ul>
      <div class="space-y-4">
        <h3 class="text-2xl font-semibold">❓ Query parameters</h3>
        <ul class="list-disc list-inside space-y-2">
          <li>
            <code class="bg-neutral-700 px-2 py-1 rounded text-sm">
              fallback
            </code>{" "}
            - The fallback image is used if the Open Graph image is not found.
            This must be a valid image URL or it will return an error.
            <ul class="list-inside list-disc ml-6 mt-2">
              <li>
                <a
                  href={`${SITE_URL}/microsoft.com/og?fallback=https://avatar.vercel.sh/123?size=400`}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-400 hover:underline underline-offset-2"
                >
                  {`${SITE_URL}/microsoft.com/og?fallback=https://avatar.vercel.sh/123?size=400`}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
};
