export const getDetailsFromBrowserRendering = async (url: string) => {
  const response = await fetch(`https://${url}`);
  const data = await response.json();
  return data;
};