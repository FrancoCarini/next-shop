import useSWR from 'swr'
const useProducts = (url, config = {}) => {
  const { data, error } = useSWR(`/api/${url}`, config)

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
  }
}

export default useProducts
