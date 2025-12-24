export type Metadata = {
  title: string | null;
  description: string | null;
  icon: string | null;
  og: {
    title: string | null;
    description: string | null;
    image: string | null;
    twitterTitle: string | null;
    twitterDescription: string | null;
    twitterImage: string | null;
  };
};

export type Env = {
  CLOUDFLARE_ACCOUNT_ID: string;
  CLOUDFLARE_API_TOKEN: string;
};
