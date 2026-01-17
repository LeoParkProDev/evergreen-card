
import { createClient } from '@supabase/supabase-js';
import { customers } from '../src/data/customers.js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ 환경변수가 설정되지 않았습니다.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔄 Supabase 연결 테스트 중...');
  console.log('URL:', supabaseUrl);
  
  // 간단한 쿼리 시도 (테이블이 없어도 인증 에러 여부 확인 가능)
  const { data, error } = await supabase.from('customers').select('*').limit(1);

  if (error) {
    console.error('❌ 연결 실패:', error.message);
    if (error.message.includes('JWT') || error.code === 'PGRST301') {
        console.error('💡 힌트: 제공해주신 Key 형식이 올바르지 않은 것 같습니다. (eyJ...로 시작하는 anon 키가 필요합니다)');
    }
  } else {
    console.log('✅ 연결 성공! (테이블이 없으므로 빈 배열이 반환될 수 있음)');
  }
}

testConnection();
