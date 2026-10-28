import {createClient} from '@sanity/client';
import {readFileSync, writeFileSync} from 'node:fs';
import {isDeepStrictEqual} from 'node:util';

const root = new URL('./', import.meta.url);
const read = name => JSON.parse(readFileSync(new URL(name, root), 'utf8'));
const save = (name, value) => writeFileSync(new URL(name,root),JSON.stringify(value,null,2));
try {
  const client = createClient({projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,apiVersion:'2026-10-07',token:process.env.SANITY_API_WRITE_TOKEN,useCdn:false});
  const docs = read('prepared.json');
  const backup = read('before-import.json');
  const current = await client.fetch('*[_type == "episode"]',{}, {perspective:'raw'});
  const allowed = new Set([...backup,...docs].map(doc=>doc._id));
  if(current.some(doc=>!allowed.has(doc._id))) throw new Error('Unexpected episode documents; stopping');
  for(const doc of current.filter(doc=>backup.some(old=>old._id===doc._id))) {
    if(doc._rev!==backup.find(old=>old._id===doc._id)._rev) throw new Error('Demo data changed since backup; stopping');
  }
  // Upload assets first so a failed upload leaves the current content intact.
  const assets = (()=>{try{return read('uploaded-assets.json')}catch{return {}}})();
  for(const doc of docs) {
    if(!assets[doc.imageFile]) {
      const asset = await client.assets.upload('image',readFileSync(new URL('images/'+doc.imageFile,root)),{filename:doc.imageFile});
      assets[doc.imageFile]=asset._id;
      save('uploaded-assets.json',assets);
    }
    console.log('Image ready:',doc.imageFile);
  }
  const imported = docs.map(({imageFile,...doc})=>({...doc,image:{_type:'image',asset:{_type:'reference',_ref:assets[imageFile]}}}));
  save('imported.json',imported);
  // One atomic transaction removes demos before creating the replacement documents.
  let transaction = client.transaction();
  for(const old of backup) transaction=transaction.delete(old._id);
  for(const doc of imported) transaction=transaction.createIfNotExists(doc);
  await transaction.commit();
  const after=await client.fetch('*[_type == "episode"]',{}, {perspective:'raw'});
  if(after.length!==imported.length) throw new Error('Document count mismatch');
  for(const expected of imported) {
    const actual=after.find(doc=>doc._id===expected._id);
    if(!actual) throw new Error('Missing imported document');
    for(const [key,value] of Object.entries(expected)) {
      if(!isDeepStrictEqual(actual[key],value)) throw new Error(`Field mismatch: ${expected.sourceId}.${key}`);
    }
  }
  const refs=Object.values(assets);
  const count=await client.fetch('count(*[_type == "sanity.imageAsset" && _id in $refs])',{refs});
  if(count!==new Set(refs).size) throw new Error('Missing image assets');
  const report={projectId:client.config().projectId,dataset:client.config().dataset,deletedDemoIds:backup.map(doc=>doc._id),imported:after.length,verifiedAssets:count,featured:after.filter(doc=>doc.featured).length,verifiedAt:new Date().toISOString()};
  save('report.json',report);
  console.log(JSON.stringify(report,null,2));
} catch(error) {console.error(error.message);process.exitCode=1;}
