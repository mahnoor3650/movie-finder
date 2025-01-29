import { Client, Databases, ID, Query } from "appwrite";

const databae_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const project_id = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const collection_id = import.meta.env.VITE_APPWRITE_Collection_ID;

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1')
.setProject(project_id);
const database = new Databases(client);

export const updateSerachCount=async(serachTerm,movie)=>{
try {
 const result = await database.listDocuments(databae_id, collection_id, [
   Query.equal("serachTerm", serachTerm),
 ]);
 if(result.documents.length >0)
 {
    const doc = result.documents[0];
    await database.updateDocument(databae_id, collection_id, doc.$id, {
      count: doc.count + 1,
    });
 }
 else{
    await database.createDocument(databae_id, collection_id, ID.unique(), {
      serachTerm,
      count: 1,
      poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      movie_id: movie.id,
    });
 }
} catch (error) {
    console.log(error)
}

}


export const getTrendingMovies=async()=>{
    try {
         const result = await database.listDocuments(
           databae_id,
           collection_id,
           [Query.limit(5), Query.orderDesc("count")]
         );
         return result.documents;
    } catch (error) {
      console.log(error)  
    }
}


