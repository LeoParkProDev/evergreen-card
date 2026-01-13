// 고객 명함 데이터베이스
export const customers = {
  // 박대현 - 한국크린필터
  'c7f8e9a1-2b3c-4d5e-9f8a-7b6c5d4e3f2a': {
    profile: {
      company: "한국크린필터",
      name: "박대현",
      position: "이사",
      phone: "010-2055-3958",
      email: "cfk0112@naver.com",
      address: "경기도 안산시 단원구 정왕천동로10번길 33 (시화공단4바 767호)",
      fax: "(031) 434-0965",
      tagline: "산업용 에어필터 제조 전문 기업",
      bannerHeadline: "산업용 필터의 모든 것",
      description: "깨끗한 공기가 경쟁력입니다. 최고의 품질로 고객사의 환경을 책임지겠습니다.",
      profileImage: "/assets/logo_cfk.png",
      bannerImage: "/assets/banner_cfk.png",
      pageTitle: "한국크린필터 박대현"
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
        id: 'pre',
        name: "프리 필터 (Pre-Filter)",
        desc: "큰 먼지 제거용, 세척 가능 금속/합성 소재",
        badge: "전처리",
        badgeColor: "bg-slate-800",
        img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
        spec: {
          title: "프리 필터 (Pre-Filter)",
          description: "큰 먼지와 이물질을 1차적으로 걸러주어 메인 필터의 수명을 연장시킵니다. 세척하여 재사용이 가능한 타입입니다.",
          efficiency: "60~85% (Gravimetric Method)",
          material: "Non-woven Fabric + Aluminum Mesh",
          usage: "공조기 전처리, 일반 산업 현장"
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
      },
      {
        id: 'ulpa',
        name: "울파 필터 (ULPA)",
        desc: "초미세먼지 99.999% 제거 (반도체/병원용)",
        badge: "High-End",
        badgeColor: "bg-purple-600",
        img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop",
        spec: {
          title: "울파 필터 (ULPA)",
          description: "HEPA보다 더 미세한 0.1µm 입자까지 99.999% 제거하는 초고성능 필터입니다. 극도의 청정도가 요구되는 공정에 사용됩니다.",
          efficiency: "99.999% @ 0.1µm (U15 Grade)",
          material: "Ultra Fine Glass Fiber",
          usage: "반도체 포토 공정, 초정밀 연구소"
        }
      },
      {
        id: 'carbon',
        name: "카본 필터 (Carbon)",
        desc: "활성탄을 이용한 유해가스 및 악취 제거",
        badge: "탈취",
        badgeColor: "bg-gray-800",
        img: "https://images.unsplash.com/photo-1581092918484-8313e1f151c3?w=400&h=300&fit=crop",
        spec: {
          title: "카본 필터 (Carbon)",
          description: "활성탄(Activated Carbon)을 사용하여 공기 중의 유해가스, 악취, VOCs를 효과적으로 흡착 제거합니다.",
          efficiency: "Iodine No. 1000mg/g min",
          material: "Activated Carbon Granules",
          usage: "화학 공장, 도장 공정, 악취 발생 시설"
        }
      }
    ]
  },

  // 박현수 - 에버그린필터
  'a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d': {
    profile: {
      company: "에버그린 솔루션즈",
      name: "박현수",
      position: "대표",
      phone: "010-4382-5877",
      email: "egfilter153@gmail.com",
      address: "경기도 고양시 덕양구 충장로 103번길 23",
      fax: "010-4382-5877",
      tagline: "Since 2022",
      bannerHeadline: "제조업의 든든한 파트너",
      description: "제조업 사장님들의 모든 불편함을 해결해 드립니다.",
      profileImage: "/assets/image_2.jpg",
      bannerImage: "/assets/eglink.png",
      pageTitle: "에버그린필터 박현수"
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
        id: 'pre',
        name: "프리 필터 (Pre-Filter)",
        desc: "큰 먼지 제거용, 세척 가능 금속/합성 소재",
        badge: "전처리",
        badgeColor: "bg-slate-800",
        img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
        spec: {
          title: "프리 필터 (Pre-Filter)",
          description: "큰 먼지와 이물질을 1차적으로 걸러주어 메인 필터의 수명을 연장시킵니다. 세척하여 재사용이 가능한 타입입니다.",
          efficiency: "60~85% (Gravimetric Method)",
          material: "Non-woven Fabric + Aluminum Mesh",
          usage: "공조기 전처리, 일반 산업 현장"
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
      },
      {
        id: 'ulpa',
        name: "울파 필터 (ULPA)",
        desc: "초미세먼지 99.999% 제거 (반도체/병원용)",
        badge: "High-End",
        badgeColor: "bg-purple-600",
        img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop",
        spec: {
          title: "울파 필터 (ULPA)",
          description: "HEPA보다 더 미세한 0.1µm 입자까지 99.999% 제거하는 초고성능 필터입니다. 극도의 청정도가 요구되는 공정에 사용됩니다.",
          efficiency: "99.999% @ 0.1µm (U15 Grade)",
          material: "Ultra Fine Glass Fiber",
          usage: "반도체 포토 공정, 초정밀 연구소"
        }
      },
      {
        id: 'carbon',
        name: "카본 필터 (Carbon)",
        desc: "활성탄을 이용한 유해가스 및 악취 제거",
        badge: "탈취",
        badgeColor: "bg-gray-800",
        img: "https://images.unsplash.com/photo-1581092918484-8313e1f151c3?w=400&h=300&fit=crop",
        spec: {
          title: "카본 필터 (Carbon)",
          description: "활성탄(Activated Carbon)을 사용하여 공기 중의 유해가스, 악취, VOCs를 효과적으로 흡착 제거합니다.",
          efficiency: "Iodine No. 1000mg/g min",
          material: "Activated Carbon Granules",
          usage: "화학 공장, 도장 공정, 악취 발생 시설"
        }
      }
    ]
  },

  // 박장식 - 원성산업기계
  'b3c4d5e6-7f8a-9b0c-1d2e-3f4a5b6c7d8e': {
    profile: {
      company: "(주)원성산업기계",
      name: "박장식",
      position: "상무",
      phone: "010-8873-1464",
      email: "wonsung@example.com",
      address: "경기도 화성시 남양읍 무하로 111번길 20",
      fax: "",
      tagline: "Since 2015",
      bannerHeadline: "산업플랜트 공사 / 화학 식품 탱크 배관 / 기계제작 설치공사",
      description: "산업플랜트 공사 / 화학 식품 탱크 배관 / 기계제작 설치공사",
      profileImage: "",
      bannerImage: "/assets/wsim.png",
      pageTitle: "(주)원성산업기계 박장식"
    },
    products: [
      {
        id: 'plant',
        name: "산업플랜트 공사",
        desc: "화학, 식품, 제약 등 각종 산업플랜트 설계 및 시공",
        badge: "주력사업",
        badgeColor: "bg-slate-800",
        img: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop",
        spec: {
          title: "산업플랜트 공사",
          description: "화학, 식품, 제약 산업 등 다양한 분야의 플랜트 설계부터 시공, 유지보수까지 토탈 솔루션을 제공합니다.",
          efficiency: "설계부터 시공까지 원스톱 서비스",
          material: "고품질 스테인리스 스틸 및 특수 합금",
          usage: "화학공장, 식품공장, 제약공장 등"
        }
      },
      {
        id: 'tank',
        name: "화학 식품 탱크 배관",
        desc: "스테인리스 탱크 제작 및 배관 설치",
        badge: "전문분야",
        badgeColor: "bg-blue-600",
        img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
        spec: {
          title: "화학 식품 탱크 배관",
          description: "화학 및 식품 산업용 스테인리스 탱크 제작과 배관 설치를 전문으로 합니다. 위생적이고 내구성 있는 시공을 보장합니다.",
          efficiency: "위생등급 SUS304, SUS316L 사용",
          material: "Stainless Steel (SUS304/316L)",
          usage: "저장탱크, 반응탱크, 배관 라인"
        }
      },
      {
        id: 'machinery',
        name: "기계제작 설치공사",
        desc: "산업용 기계 설계, 제작 및 현장 설치",
        badge: "맞춤제작",
        badgeColor: "bg-green-600",
        img: "https://images.unsplash.com/photo-1581092918484-8313e1f151c3?w=400&h=300&fit=crop",
        spec: {
          title: "기계제작 설치공사",
          description: "고객 요구사항에 맞춘 맞춤형 산업기계 설계 및 제작, 현장 설치와 시운전까지 책임지고 진행합니다.",
          efficiency: "3D 설계 및 정밀 가공",
          material: "철강재, 스테인리스, 특수금속",
          usage: "컨베이어, 호퍼, 믹서 등 산업기계"
        }
      }
    ]
  },

  // 샘플 데이터 (에버그린필터 - 기본 데모용)
  'demo': {
    profile: {
      company: "에버그린필터",
      name: "박현수",
      position: "대표",
      phone: "010-4382-5877",
      email: "info@evergreenfilter.com",
      address: "경기도 안산시 단원구 산단로 123",
      fax: "031-1234-5678",
      tagline: "Since 1995",
      bannerHeadline: "산업용 필터의 모든 것",
      description: "깨끗한 공기가 경쟁력입니다. 최고의 품질로 고객사의 환경을 책임지겠습니다."
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
        id: 'pre',
        name: "프리 필터 (Pre-Filter)",
        desc: "큰 먼지 제거용, 세척 가능 금속/합성 소재",
        badge: "전처리",
        badgeColor: "bg-slate-800",
        img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
        spec: {
          title: "프리 필터 (Pre-Filter)",
          description: "큰 먼지와 이물질을 1차적으로 걸러주어 메인 필터의 수명을 연장시킵니다. 세척하여 재사용이 가능한 타입입니다.",
          efficiency: "60~85% (Gravimetric Method)",
          material: "Non-woven Fabric + Aluminum Mesh",
          usage: "공조기 전처리, 일반 산업 현장"
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
      },
      {
        id: 'ulpa',
        name: "울파 필터 (ULPA)",
        desc: "초미세먼지 99.999% 제거 (반도체/병원용)",
        badge: "High-End",
        badgeColor: "bg-purple-600",
        img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop",
        spec: {
          title: "울파 필터 (ULPA)",
          description: "HEPA보다 더 미세한 0.1µm 입자까지 99.999% 제거하는 초고성능 필터입니다. 극도의 청정도가 요구되는 공정에 사용됩니다.",
          efficiency: "99.999% @ 0.1µm (U15 Grade)",
          material: "Ultra Fine Glass Fiber",
          usage: "반도체 포토 공정, 초정밀 연구소"
        }
      },
      {
        id: 'carbon',
        name: "카본 필터 (Carbon)",
        desc: "활성탄을 이용한 유해가스 및 악취 제거",
        badge: "탈취",
        badgeColor: "bg-gray-800",
        img: "https://images.unsplash.com/photo-1581092918484-8313e1f151c3?w=400&h=300&fit=crop",
        spec: {
          title: "카본 필터 (Carbon)",
          description: "활성탄(Activated Carbon)을 사용하여 공기 중의 유해가스, 악취, VOCs를 효과적으로 흡착 제거합니다.",
          efficiency: "Iodine No. 1000mg/g min",
          material: "Activated Carbon Granules",
          usage: "화학 공장, 도장 공정, 악취 발생 시설"
        }
      }
    ]
  }
};

// GUID로 고객 데이터 조회
export const getCustomerData = (guid) => {
  return customers[guid] || null;
};

// 모든 고객 목록 조회
export const getAllCustomers = () => {
  return Object.keys(customers).map(guid => ({
    guid,
    name: customers[guid].profile.name,
    company: customers[guid].profile.company
  }));
};
