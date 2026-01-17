# 코드 리뷰 보고서: 보안 및 확장성 분석

## 1. 보안 (Security)

### 🚨 Critical: RLS (Row Level Security) 정책 취약점
**현황:**
`supabase_schema.sql` 파일을 보면 `customers`와 `products` 테이블에 대해 모든 사용자의 쓰기(Insert)를 허용하는 정책이 포함되어 있습니다.
```sql
create policy "Allow insert for everyone" on public.customers for insert with check (true);
create policy "Allow insert for everyone" on public.products for insert with check (true);
```
`secure_db.sql`에 해당 정책을 삭제하는 명령어가 있지만, 스키마 초기화 스크립트에 이 내용이 포함되어 있어 실수로 배포될 경우 **누구나 데이터베이스에 임의의 데이터를 삽입할 수 있는 심각한 보안 구멍**이 발생합니다.

**권고:**
- `supabase_schema.sql`에서 `Allow insert for everyone` 정책 생성 구문을 **즉시 삭제**하십시오.
- 오직 인증된 사용자(Service Role 또는 특정 관리자 계정)만 쓰기가 가능하도록 정책을 수정해야 합니다.

### ⚠️ API 키 노출 및 환경 변수
**현황:**
`VITE_SUPABASE_ANON_KEY`가 클라이언트에 노출되는 것은 Supabase의 표준 패턴이지만, 이는 강력한 RLS 정책이 뒷받침될 때만 안전합니다. 현재 RLS 정책 문제와 결합되면 매우 위험합니다.

**권고:**
- RLS 정책을 강화한 후에는 Anon Key 노출이 문제되지 않습니다.

### ℹ️ 데이터 검증 (Input Validation)
**현황:**
`api.js`에서 데이터를 가져온 후 별도의 검증 없이 사용합니다. XSS 공격에 대비해 React가 기본적으로 이스케이핑을 처리하지만, `tel:`, `sms:`, `mailto:` 등의 프로토콜 링크에 악성 페이로드가 포함될 가능성(예: `javascript:` 스키마 주입)을 배제할 수 없습니다.

**권고:**
- `handleCall`, `handleSMS`, `handleEmail` 등에서 데이터가 올바른 형식(전화번호, 이메일 등)인지 정규식 등으로 검증하는 로직을 추가하는 것이 좋습니다.

---

## 2. 확장성 및 성능 (Scalability & Performance)

### 📉 데이터 페칭 최적화 (Waterfall Request)
**현황:**
`src/api.js`의 `fetchCustomer` 함수에서 `customers` 테이블을 조회한 후, 응답을 기다렸다가 `products` 테이블을 조회하는 직렬(Sequential) 구조로 되어 있습니다.
```javascript
// 1. 고객 조회 (await)
const { data: customer } = await supabase...
// 2. 제품 조회 (await) - 1번이 끝날 때까지 대기
const { data: products } = await supabase...
```
이는 네트워크 레이턴시를 2배로 증가시킵니다.

**권고:**
- **Supabase Join Query 사용:** Foreign Key가 설정되어 있으므로 한 번의 쿼리로 가져올 수 있습니다.
  ```javascript
  const { data } = await supabase
    .from('customers')
    .select('*, products(*)')
    .eq('guid', guid)
    .single();
  ```
- 또는 `Promise.all`을 사용하여 병렬로 요청하십시오.

### 🐌 이미지 로딩 최적화
**현황:**
`ProductCatalog.jsx` 등에서 이미지를 렌더링할 때 `loading="lazy"` 속성이 없고, 별도의 이미지 최적화(사이즈 조절, WebP 포맷 등)가 적용되지 않았습니다. 제품 목록이 길어질 경우 초기 로딩 속도에 악영향을 줍니다.

**권고:**
- `<img>` 태그에 `loading="lazy"` 속성을 추가하십시오.
- 가능하다면 Supabase Storage의 Image Transformation 기능을 사용하여 기기에 맞는 적절한 사이즈의 이미지를 요청하십시오.

### 💾 쿼리 효율성 (`SELECT *`)
**현황:**
`select('*')`를 사용하여 모든 컬럼을 조회하고 있습니다. `description`이나 `spec_description` 같은 텍스트 필드의 데이터 양이 커지면 불필요한 네트워크 대역폭을 소모합니다.

**권고:**
- 실제로 화면에 필요한 컬럼만 명시적으로 지정하여 조회하십시오. (`.select('guid, company, name, ...')`)

### 📦 번들 사이즈
**현황:**
`lucide-react`와 같은 아이콘 라이브러리가 사용되고 있습니다. 트리쉐이킹이 제대로 동작하는지 빌드 설정을 점검할 필요가 있습니다. (현재 코드는 잘 작성된 것으로 보입니다.)

---

## 요약

가장 시급한 문제는 **RLS 정책을 통한 무단 쓰기 허용**입니다. 이를 최우선으로 수정해야 합니다. 그 후 데이터 페칭 로직을 개선하면 사용자 경험(속도)이 크게 향상될 것입니다.