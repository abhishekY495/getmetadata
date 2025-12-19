// Outputs: /builtwith.json
export async function GET({
  params,
  request,
}: {
  params: { domain: string };
  request: Request;
}) {
  const { domain } = params;

  const imageUrl = `https://cdn.prod.website-files.com/66c7823b4706f4a0a95d2d31/67b5064c2f792418120c4351_img-opengraph-missive.jpg`;

  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) {
    return new Response("Not found", { status: 404 });
  }
  const imgData = await imgRes.blob();

  return new Response(imgData, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
