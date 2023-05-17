const DEFAULT_LIMIT = 20
const DEFAULT_SORT = -1
const DEFAULT_PAGE = 1

module.exports = async function (query, total, next, defaultLimit = DEFAULT_LIMIT) {
  const isAll = query?.all ? query.all === 'true' : false
  const sort = query?.sort ? (query.sort === 'asc' ? 1 : -1) : DEFAULT_SORT

  let limit = parseInt(query.limit) || defaultLimit
  let page = parseInt(query.page) || DEFAULT_PAGE

  let skip = (page - 1) * limit

  try {
    if (isAll) {
      page = 1
      limit = total
      skip = 0
    }
    const totalPages = Math.ceil(total / limit)

    return {
      sort,
      page,
      isAll,
      itemsPerPage: limit,
      skip,
      total,
      totalPages
    }
  } catch (error) {
    next(error)
  }
}
