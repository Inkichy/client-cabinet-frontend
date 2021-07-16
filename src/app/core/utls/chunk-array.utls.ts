/**
 *
 * @param arr
 * @param chunk
 */
export function chunkArray(arr, chunk) {
  const tmp = [];
  for (let i = 0; i < arr.length - 1; i += chunk) {
    tmp.push(arr.slice(i, i + chunk));
  }
  return tmp;
}
