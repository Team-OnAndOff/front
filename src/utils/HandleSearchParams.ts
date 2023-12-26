export default function HandleSearchParams(
  searchParams: URLSearchParams,
  key: string,
  value: string | undefined,
) {
  if (value) {
    searchParams.set(key, value)
  } else {
    searchParams.delete(key)
  }
}
