import { supabase } from './supabase';
import { getCustomerData as getLocalCustomerData } from './data/customers';

// Supabase에서 고객 정보 가져오기
export async function fetchCustomer(guid) {
  // 1. demo인 경우 로컬 데이터 사용 (또는 DB에 demo용 UUID 생성 후 매핑)
  if (guid === 'demo' || !guid) {
    return getLocalCustomerData('demo');
  }

  try {
    // 2. Customers 테이블 조회
    const { data: customer, error: custError } = await supabase
      .from('customers')
      .select('*')
      .eq('guid', guid)
      .single();

    if (custError || !customer) {
      console.warn('Customer not found in DB, checking local fallback...', custError);
      return getLocalCustomerData(guid); // DB에 없으면 로컬 파일 확인 (과도기용)
    }

    // 3. Products 테이블 조회
    const { data: products, error: prodError } = await supabase
      .from('products')
      .select('*')
      .eq('customer_guid', guid);

    if (prodError) {
      console.error('Error fetching products:', prodError);
    }

    // 4. 데이터 구조 변환 (DB 컬럼 -> 앱 내부 객체 구조)
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
