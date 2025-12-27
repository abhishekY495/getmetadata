import { SITE_URL } from "../utils/constants";

export const QuickStart = () => {
  const keyArray = [
    {
      key: "Icon",
      url: `${SITE_URL}/github.com/icon`,
    },
    {
      key: "OG",
      url: `${SITE_URL}/github.com/og`,
    },
    {
      key: "Twitter OG",
      url: `${SITE_URL}/github.com/twitterog`,
    },
  ];

  return (
    <section class="space-y-4">
      <h2 class="text-3xl font-bold">🚀 Quick Start</h2>
      <p class="">
        All endpoints follow the pattern -{" "}
        <code class="bg-neutral-700 px-2 py-1 rounded text-sm">
          {`${SITE_URL}/{domain}/{key}`}
        </code>
      </p>
      <ul class="list-disc list-inside space-y-4">
        <li>
          <code class="bg-neutral-700 px-2 py-1 rounded text-sm">
            {"{domain}"}
          </code>{" "}
          - The domain to fetch metadata from.
          <ul class="list-inside list-disc ml-6 mt-2">
            <li>
              <a
                href={`${SITE_URL}/github.com`}
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-400 hover:underline underline-offset-2"
              >
                {`${SITE_URL}/github.com`}
              </a>
            </li>
          </ul>
        </li>
        <li>
          <code class="bg-neutral-700 px-2 py-1 rounded text-sm">
            {"{key}"}
          </code>{" "}
          - The key to fetch Icon, OG and Twitter OG
          <ul class="list-inside list-disc ml-6 mt-2 space-y-1">
            {keyArray.map((item) => (
              <li key={item.key}>
                <span class="font-semibold">{item.key}</span> -{" "}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-400 hover:underline underline-offset-2"
                >
                  {item.url}
                </a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <p class="text-sm font-semibold bg-neutral-950 border-l-4 border-blue-500 p-2">
        All the data is being cached for 28 days and the API is rate limited to
        300 requests per minute per IP.
      </p>
    </section>
  );
};
