import {createClient} from '@sanity/client';
import {readFileSync, writeFileSync} from 'node:fs';
import {isDeepStrictEqual} from 'node:util';

const root=new URL('./',import.meta.url);
try {
  const client=createClient({projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,apiVersion:'2026-10-07',token:process.env.SANITY_API_WRITE_TOKEN,useCdn:false});
  const docs=await client.fetch('*[_type == "episode" && sourceId == "28"]',{}, {perspective:'raw'});
  const published=docs.filter(doc=>!doc._id.startsWith('drafts.'));
  if(published.length!==1) throw new Error('Expected one published interview with sourceId 28');
  const targets=docs.filter(doc=>doc._id===published[0]._id || doc._id===`drafts.${published[0]._id}`);
  writeFileSync(new URL(`before-hero-${Date.now()}.json`,root),JSON.stringify(targets,null,2));
  const image=await client.assets.upload('image',readFileSync(new URL('images/hero-28.png',root)),{filename:'hero-28.png'});
  const heroImage={_type:'image',asset:{_type:'reference',_ref:image._id}};
  let transaction=client.transaction();
  for(const doc of targets) transaction=transaction.patch(doc._id,p=>p.ifRevisionId(doc._rev).set({heroImage,featured:true}));
  await transaction.commit();
  const after=await client.fetch('*[_id in $ids]',{ids:targets.map(doc=>doc._id)}, {perspective:'raw'});
  const clean=({_rev,_updatedAt,...rest})=>rest;
  for(const before of targets) {
    const actual=after.find(doc=>doc._id===before._id);
    if(!actual || !isDeepStrictEqual(clean(actual),clean({...before,heroImage,featured:true}))) throw new Error('Hero update verification failed');
  }
  const report={sourceId:'28',name:published[0].name,heroAsset:image._id,featured:true,verifiedDocuments:after.length,verifiedAt:new Date().toISOString()};
  writeFileSync(new URL('hero-report.json',root),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
} catch(error) {console.error(error.message);process.exitCode=1;}
