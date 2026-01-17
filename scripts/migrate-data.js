
import { createClient } from '@supabase/supabase-js';
import { customers } from '../src/data/customers.js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase keys missing.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log('🚀 Migration started...');
  
  for (const [guid, data] of Object.entries(customers)) {
    console.log(`Processing customer: ${guid} (${data.profile.name})...`);

    // 1. Insert Customer
    const profile = data.profile;
    const { error: custError } = await supabase.from('customers').upsert({
      guid: guid,
      company: profile.company,
      name: profile.name,
      position: profile.position,
      phone: profile.phone,
      email: profile.email,
      address: profile.address,
      fax: profile.fax,
      tagline: profile.tagline,
      banner_headline: profile.bannerHeadline,
      description: profile.description,
      profile_image: profile.profileImage,
      banner_image: profile.bannerImage,
      page_title: profile.pageTitle
    });

    if (custError) {
      console.error(`❌ Error inserting customer ${guid}:`, custError);
      continue;
    }

    // 2. Insert Products
    const products = data.products || [];
    for (const prod of products) {
      const { error: prodError } = await supabase.from('products').upsert({
        id: prod.id,
        customer_guid: guid,
        name: prod.name,
        "desc": prod.desc,
        badge: prod.badge,
        badge_color: prod.badgeColor,
        img: prod.img,
        spec_title: prod.spec?.title,
        spec_description: prod.spec?.description,
        spec_efficiency: prod.spec?.efficiency,
        spec_material: prod.spec?.material,
        spec_usage: prod.spec?.usage
      });

      if (prodError) {
        console.error(`  ❌ Error inserting product ${prod.id}:`, prodError);
      } else {
        // console.log(`  ✅ Inserted product: ${prod.id}`);
      }
    }
    console.log(`✅ Inserted customer and ${products.length} products.`);
  }

  console.log('🎉 Migration finished!');
}

migrate();
