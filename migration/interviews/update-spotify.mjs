import {createClient} from '@sanity/client';
import {readFileSync, writeFileSync} from 'node:fs';
import {isDeepStrictEqual} from 'node:util';

const root = new URL('./', import.meta.url);
try {
  const updates=JSON.parse(readFileSync(new URL('spotify-updates.json',root),'utf8'));
  const client=createClient({projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,apiVersion:'2026-10-07',token:process.env.SANITY_API_WRITE_TOKEN,useCdn:false});
  const before=await client.fetch('*[_type == "episode"]',{}, {perspective:'raw'});
  const save=(name,data)=>writeFileSync(new URL(name,root),JSON.stringify(data,null,2));
  save(`before-spotify-${Date.now()}.json`,before);
  let tx=client.transaction();
  let changed=0;
  for(const update of updates) {
    const matches=before.filter(doc=>doc.sourceId===update.sourceId && !doc._id.startsWith('drafts.'));
    if(matches.length!==1) throw new Error(`Expected one published document for ${update.sourceId}, got ${matches.length}`);
    // Keep any existing draft in sync to prevent later publication reverting the link.
    const targets=before.filter(doc=>doc._id===matches[0]._id || doc._id===`drafts.${matches[0]._id}`);
    for(const doc of targets) {
      if(doc.spotifyLink===update.spotifyLink) continue;
      tx=tx.patch(doc._id,patch=>patch.ifRevisionId(doc._rev).set({spotifyLink:update.spotifyLink}));
      changed++;
    }
  }
  if(changed) await tx.commit();
  const after=await client.fetch('*[_type == "episode"]',{}, {perspective:'raw'});
  if(before.length!==after.length) throw new Error('Unexpected document count change');
  for(const doc of before) {
    const actual=after.find(item=>item._id===doc._id);
    const update=updates.find(item=>item.sourceId===doc.sourceId);
    const expected={...doc,...(update?{spotifyLink:update.spotifyLink}:{})};
    const clean=({_rev,_updatedAt,...rest})=>rest;
    if(!actual || !isDeepStrictEqual(clean(expected),clean(actual))) throw new Error(`Verification failed: ${doc._id}`);
  }
  const report={updatedDocuments:changed,verifiedLinks:updates.length,totalDocuments:after.length,verifiedAt:new Date().toISOString()};
  save('spotify-report.json',report);
  console.log(JSON.stringify(report,null,2));
} catch(error) {console.error(error.message);process.exitCode=1;}
