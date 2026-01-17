import { useQuery } from '@tanstack/react-query';
import { fetchCustomer } from '../api';

export function useCustomer(guid) {
  return useQuery({
    queryKey: ['customer', guid], // 쿼리 키: 고객별로 캐싱 분리
    queryFn: () => fetchCustomer(guid),
    enabled: !!guid, // guid가 있을 때만 실행
  });
}
