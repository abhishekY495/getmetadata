import { Header } from "../components/header";
import { Icon } from "../components/icon";
import { Metadata } from "../components/metadata";
import { OpenGraph } from "../components/open-graph";
import { QuickStart } from "../components/quick-start";

export const Home = () => {
  return (
    <div class="max-w-4xl mx-auto space-y-16">
      <hr class="my-8 mb-12 border-neutral-700" />
      <QuickStart />
      <hr class="my-8 mb-12 border-neutral-700" />
      <Metadata />
      <hr class="my-8 mb-12 border-neutral-700" />
      <Icon />
      <hr class="my-8 mb-12 border-neutral-700" />
      <OpenGraph />
      <hr class="my-8 mb-12 border-neutral-700" />
    </div>
  );
};
