export default async function copyTextToClipboard(
  text: string,
): Promise<boolean> {
  return navigator.clipboard.writeText(text).then(
    () => true,
    (err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      return false;
    },
  );
}
