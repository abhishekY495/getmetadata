import { SITE_URL } from "../utils/constants";
import { JsonResponse } from "./json-response";

export const Metadata = () => {
  return (
    <section class="space-y-4">
      <h2 class="text-3xl font-bold">📑 Metadata</h2>
      <p>
        Metadata is the complete metadata of the website, including title,
        description, icon, and Open Graph images. First it will try to get the
        metadata from the website, if not found it will use{" "}
        <a
          href="https://developers.cloudflare.com/browser-rendering/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-400 hover:underline underline-offset-2 font-semibold"
        >
          Cloudflare Browser Rendering
        </a>{" "}
        to get the metadata. If a value is not found, it will be{" "}
        <code class="bg-neutral-700 px-2 py-1 rounded text-sm">null</code>
      </p>
      <li class="list-disc list-inside">
        <a
          href={`${SITE_URL}/github.com`}
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-400 hover:underline underline-offset-2"
        >
          {`${SITE_URL}/github.com`}
        </a>
      </li>
      <JsonResponse />
    </section>
  );
};
