import {createClient} from '@sanity/client';
import {writeFileSync} from 'node:fs';
try {
  const client = createClient({projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,apiVersion:'2026-10-07',token:process.env.SANITY_API_WRITE_TOKEN,useCdn:false});
  const docs = await client.fetch('*[_type == "episode"]', {}, {perspective:'raw'});
  writeFileSync('migration/interviews/before-import.json',JSON.stringify(docs,null,2));
  console.log(JSON.stringify({projectId:client.config().projectId,dataset:client.config().dataset,documents:docs.map(({_id,name,sourceId})=>({_id,name,sourceId}))},null,2));
} catch(error) { console.error(error.message); process.exitCode=1; }
