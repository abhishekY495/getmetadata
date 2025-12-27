export const Footer = () => {
  return (
    <footer class="flex flex-col items-center gap-[2px] text-neutral-300/50 mb-8 text-sm">
      <div>
        Made by{" "}
        <a
          href="https://x.com/abhisheky495"
          class="underline underline-offset-4 decoration-1 decoration-neutral-700 hover:text-neutral-300/70 transition-all"
          target="_blank"
        >
          Abhishek
        </a>
      </div>
      <div class="underline underline-offset-4 decoration-1 decoration-neutral-700 hover:text-neutral-300/70 transition-all">
        <a
          href="https://github.com/abhishekY495/getmetadata"
          class="flex items-center gap-2"
          target="_blank"
        >
          <img src="/github.png" alt="github" class="w-3.5 opacity-70" />
          Source code
        </a>
      </div>
    </footer>
  );
};
