import { useQuery } from "@tanstack/react-query";

export interface UseAPIProps {
  data: any;
  isLoading: boolean;
  error: any;
  isError: boolean;
  refetch: () => void;
}

/**
 * use Api Hook which extends React Query for better server side data caching
 * @param {string} key
 * @param {any} fn
 * @returns {UseAPIProps}
 */
export const useApiQuery = ({
  key,
  fn,
}: {
  key: string;
  fn: any;
}): UseAPIProps => {
  const { data, isLoading, error, refetch, isError }: UseAPIProps = useQuery({
    queryKey: [key],
    queryFn: fn,
  });
  return { data, isLoading, error, refetch, isError };
};
