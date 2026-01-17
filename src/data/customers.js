// 고객 데이터 저장소
// 각 고객은 고유한 GUID로 식별됩니다

const customersDB = {
  // 박장식 - 원성산업기계
  'b3c4d5e6-7f8a-9b0c-1d2e-3f4a5b6c7d8e': {
    guid: 'b3c4d5e6-7f8a-9b0c-1d2e-3f4a5b6c7d8e',
    profile: {
      company: '(주)원성산업기계',
      name: '박장식',
      position: '상무',
      phone: '010-8873-1464',
      email: 'wonsung@example.com',
      address: '경기도 화성시 남양읍 무하로 111번길 20',
      tagline: '산업플랜트 공사 전문',
      description: '산업플랜트 공사 / 화학 식품 탱크 배관 / 기계제작 설치공사',
      bannerHeadline: '산업플랜트의 든든한 파트너',
      profileImage: null,
      bannerImage: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&h=400&fit=crop',
      pageTitle: '(주)원성산업기계 박장식',
    },
    products: [
      {
        id: 'plant',
        name: '산업플랜트 공사',
        desc: '화학, 식품, 제약 등 각종 산업플랜트 설계 및 시공',
        badge: '주력사업',
        badgeColor: 'bg-slate-800',
        img: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop',
        spec: {
          title: '산업플랜트 공사',
          description: '화학, 식품, 제약 산업 등 다양한 분야의 플랜트 설계부터 시공, 유지보수까지 토탈 솔루션을 제공합니다.',
          efficiency: '설계부터 시공까지 원스톱 서비스',
          material: '고품질 스테인리스 스틸 및 특수 합금',
          usage: '화학공장, 식품공장, 제약공장 등',
        },
      },
      {
        id: 'tank',
        name: '화학 식품 탱크 배관',
        desc: '스테인리스 탱크 제작 및 배관 설치',
        badge: '전문분야',
        badgeColor: 'bg-blue-600',
        img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
        spec: {
          title: '화학 식품 탱크 배관',
          description: '화학 및 식품 산업용 스테인리스 탱크 제작과 배관 설치를 전문으로 합니다. 위생적이고 내구성 있는 시공을 보장합니다.',
          efficiency: '위생등급 SUS304, SUS316L 사용',
          material: 'Stainless Steel (SUS304/316L)',
          usage: '저장탱크, 반응탱크, 배관 라인',
        },
      },
      {
        id: 'machinery',
        name: '기계제작 설치공사',
        desc: '산업용 기계 설계, 제작 및 현장 설치',
        badge: '맞춤제작',
        badgeColor: 'bg-green-600',
        img: 'https://images.unsplash.com/photo-1581092918484-8313e1f151c3?w=400&h=300&fit=crop',
        spec: {
          title: '기계제작 설치공사',
          description: '고객 요구사항에 맞춘 맞춤형 산업기계 설계 및 제작, 현장 설치와 시운전까지 책임지고 진행합니다.',
          efficiency: '3D 설계 및 정밀 가공',
          material: '철강재, 스테인리스, 특수금속',
          usage: '컨베이어, 호퍼, 믹서 등 산업기계',
        },
      },
    ],
  },

  demo: {
    guid: 'demo',
    profile: {
      company: '에버그린 필터',
      name: '홍길동',
      position: '대표이사',
      phone: '010-1234-5678',
      email: 'contact@evergreen-filter.com',
      address: '경기도 안산시 단원구 성곡동 123-45',
      tagline: '신뢰할 수 있는 파트너',
      description: '산업용 필터 전문 제조업체로 20년 이상의 경험과 기술력을 바탕으로 최고 품질의 제품을 제공합니다.',
      bannerHeadline: '산업용 필터의 모든 것',
      profileImage: null, // 또는 이미지 URL
      bannerImage: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=400&fit=crop',
      pageTitle: '에버그린 필터 - 홍길동 대표이사',
    },
    products: [
      {
        id: 'hepa-filter',
        name: 'HEPA 필터',
        desc: '99.97% 미세먼지 차단',
        badge: 'BEST',
        badgeColor: 'bg-red-500',
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        spec: {
          title: 'HEPA H13 고효율 필터',
          description: '0.3μm 크기의 미세입자를 99.97% 이상 포집하는 고성능 HEPA 필터입니다.',
          efficiency: '99.97% (0.3μm)',
          material: '유리섬유, 알루미늄 프레임',
          usage: '클린룸, 병원, 반도체 공장',
        },
      },
      {
        id: 'carbon-filter',
        name: '활성탄 필터',
        desc: '악취 제거 및 VOC 흡착',
        badge: 'NEW',
        badgeColor: 'bg-green-500',
        img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
        spec: {
          title: '활성탄 탈취 필터',
          description: '고품질 활성탄을 사용하여 악취와 유해가스를 효과적으로 제거합니다.',
          efficiency: 'VOC 90% 이상 제거',
          material: '야자껍질 활성탄, 부직포',
          usage: '주방, 화학공장, 페인트부스',
        },
      },
      {
        id: 'bag-filter',
        name: '백 필터',
        desc: '대용량 분진 포집',
        badge: 'ECO',
        badgeColor: 'bg-blue-500',
        img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop',
        spec: {
          title: '산업용 백 필터 (Bag Filter)',
          description: '대용량 분진 처리가 가능한 백 필터로 장수명과 경제성을 제공합니다.',
          efficiency: '95% 이상 (5μm)',
          material: '폴리에스터 부직포',
          usage: '시멘트, 철강, 발전소',
        },
      },
    ],
  },
};

/**
 * GUID로 고객 데이터 조회
 * @param {string} guid - 고객 고유 ID
 * @returns {object|null} 고객 데이터 또는 null
 */
export function getCustomerData(guid) {
  return customersDB[guid] || null;
}

/**
 * 모든 고객 목록 조회 (관리자용)
 * @returns {object} 전체 고객 데이터베이스
 */
export function getAllCustomers() {
  return customersDB;
}

/**
 * 새 고객 추가 (관리자용)
 * @param {string} guid - 고객 고유 ID
 * @param {object} data - 고객 데이터
 */
export function addCustomer(guid, data) {
  if (customersDB[guid]) {
    console.warn(`Customer with guid "${guid}" already exists. Use updateCustomer instead.`);
    return false;
  }
  customersDB[guid] = { guid, ...data };
  return true;
}

/**
 * 고객 데이터 업데이트 (관리자용)
 * @param {string} guid - 고객 고유 ID
 * @param {object} updates - 업데이트할 데이터
 */
export function updateCustomer(guid, updates) {
  if (!customersDB[guid]) {
    console.warn(`Customer with guid "${guid}" not found.`);
    return false;
  }
  customersDB[guid] = { ...customersDB[guid], ...updates };
  return true;
}
