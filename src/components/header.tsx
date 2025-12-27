export const Header = () => {
  return (
    <header class="flex flex-col items-center justify-center gap-1 my-8">
      <img src="/favicon.svg" alt="GetMetadata" class="size-20" />
      <h1 class="text-4xl font-bold">GetMetadata</h1>
      {/* Description */}
      <p class="text-center mt-3">
        An API service that extracts metadata from any website, including title,
        description, icon, and Open Graph images.
        <br />
        Built with{" "}
        <a
          href="https://hono.dev"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-400 hover:underline underline-offset-2 font-semibold"
        >
          Hono.js
        </a>{" "}
        and{" "}
        <a
          href="https://workers.cloudflare.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-400 hover:underline underline-offset-2 font-semibold"
        >
          Cloudflare Workers
        </a>{" "}
        for blazing-fast performance.
      </p>
    </header>
  );
};
