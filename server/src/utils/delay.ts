export default async function delay(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
