// 고객 명함 데이터베이스 (로컬 Fallback용 Demo 데이터만 유지)
// 실제 데이터는 Supabase DB에서 관리됩니다.

export const customers = {
  // 샘플 데이터 (에버그린필터 - 기본 데모용)
  'demo': {
    profile: {
      company: "에버그린필터 (Demo)",
      name: "홍길동",
      position: "대표",
      phone: "010-1234-5678",
      email: "demo@evergreenfilter.com",
      address: "경기도 안산시 단원구 산단로 123",
      fax: "031-1234-5678",
      tagline: "Since 2024",
      bannerHeadline: "산업용 필터의 모든 것",
      description: "이것은 데모 페이지입니다. 실제 데이터는 DB에서 불러옵니다.",
      profileImage: null,
      bannerImage: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=400&fit=crop",
      pageTitle: "에버그린필터 데모"
    },
    products: [
      {
        id: 'nonwoven',
        name: "부직포 롤 필터",
        desc: "공조기 1차 염화비닐/부직포 (Standard)",
        badge: "1차 처리",
        badgeColor: "bg-slate-800",
        img: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&h=300&fit=crop",
        spec: {
          title: "부직포 롤 필터",
          description: "공기조화기(AHU)의 1차 전처리용으로 가장 널리 사용되는 경제적인 필터입니다. 롤 형태로 공급되어 교체가 용이합니다.",
          efficiency: "G2 ~ G4 (ASHRAE 52.1)",
          material: "Polyester / Vinyl Chloride",
          usage: "빌딩 공조기, 도장 부스 1차 필터"
        }
      },
      {
        id: 'hepa',
        name: "헤파 필터 (HEPA)",
        desc: "미세먼지 99.97% 제거 (H13 Grade)",
        badge: "BEST",
        badgeColor: "bg-blue-600",
        img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
        spec: {
          title: "헤파 필터 (HEPA)",
          description: "0.3µm 입자를 99.97% 이상 포집하는 고성능 필터입니다. 클린룸, 병원 수술실 등 청정 공간에 필수적입니다.",
          efficiency: "99.97% @ 0.3µm (H13 Grade)",
          material: "Micro Glass Fiber",
          usage: "반도체 공장, 병원, 제약 회사"
        }
      }
    ]
  }
};

// GUID로 고객 데이터 조회 (로컬)
export const getCustomerData = (guid) => {
  return customers[guid] || customers['demo'];
};

// 모든 고객 목록 조회 (로컬 - 디버깅용)
export const getAllCustomers = () => {
  return Object.keys(customers).map(guid => ({
    guid,
    name: customers[guid].profile.name,
    company: customers[guid].profile.company
  }));
};