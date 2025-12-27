import { SITE_ICON, SITE_URL } from "../utils/constants";

export const Icon = () => {
  return (
    <section class="space-y-4">
      <h2 class="text-3xl font-bold">✨ Icon</h2>
      <p>
        To get the icon of the website, can use the below endpoint. First it
        will try to get the icon from the website. If not found, it will try to
        get the icon from the Google Favicon Service. If still not found, it
        will return a default placeholder{" "}
        <a
          href={SITE_ICON}
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-400 hover:underline underline-offset-2 font-semibold"
        >
          icon.
        </a>
      </p>
      <li class="list-disc list-inside">
        <a
          href={`${SITE_URL}/github.com/icon`}
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-400 hover:underline underline-offset-2"
        >
          {`${SITE_URL}/github.com/icon`}
        </a>
      </li>
    </section>
  );
};
