import { supabase } from './supabase';
import { getCustomerData as getLocalCustomerData } from './data/customers';

// Supabase에서 고객 정보 가져오기
export async function fetchCustomer(guid) {
  // 1. demo인 경우 로컬 데이터 사용 (또는 DB에 demo용 UUID 생성 후 매핑)
  if (guid === 'demo' || !guid) {
    return getLocalCustomerData('demo');
  }

  try {
    // 2. Customers 및 Products 테이블 동시 조회 (Join Query)
    // 외래키 관계를 이용하여 한 번의 요청으로 모든 데이터를 가져옵니다.
    const { data: customer, error } = await supabase
      .from('customers')
      .select(`
        *,
        products (*)
      `)
      .eq('guid', guid)
      .single();

    if (error || !customer) {
      console.warn('Customer not found in DB, checking local fallback...', error);
      return getLocalCustomerData(guid); // DB에 없으면 로컬 파일 확인 (과도기용)
    }

    // 3. 데이터 구조 변환 (DB 컬럼 -> 앱 내부 객체 구조)
    // products는 이제 customer 객체 내부의 배열로 존재합니다.
    const products = customer.products || [];

    return {
      guid: customer.guid,
      profile: {
        company: customer.company,
        name: customer.name,
        position: customer.position,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
        fax: customer.fax,
        tagline: customer.tagline,
        bannerHeadline: customer.banner_headline,
        description: customer.description,
        profileImage: customer.profile_image,
        bannerImage: customer.banner_image,
        pageTitle: customer.page_title
      },
      products: products.map(p => ({
        id: p.id,
        name: p.name,
        desc: p.desc,
        badge: p.badge,
        badgeColor: p.badge_color,
        img: p.img,
        spec: {
          title: p.spec_title,
          description: p.spec_description,
          efficiency: p.spec_efficiency,
          material: p.spec_material,
          usage: p.spec_usage
        }
      }))
    };
  } catch (error) {
    console.error('Unexpected error fetching customer:', error);
    return getLocalCustomerData(guid);
  }
}