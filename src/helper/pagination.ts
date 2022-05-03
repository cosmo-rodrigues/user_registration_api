export function paginationFormat(currentPage, requestSize) {
  const pageAsNumber = Number.parseInt(currentPage);
  const sizeAsNumber = Number.parseInt(requestSize);

  let page = 1;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 10;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 1) {
    size = sizeAsNumber;
  }

  return { page, size };
}
