import { IResolvers } from "apollo-server-express";
import { ObjectId } from "mongodb";

//import { listings } from "../listings";
import { Database, Listing } from "../../../lib/types"

export const listingResolvers: IResolvers = {
    Query: {
        listings: async (_root: undefined, _args:{}, {db}: {db: Database}): Promise<Listing[]> => {
           // return listings;
           return await db.listings.find({}).toArray();
        }
    },

    Mutation: {
        deleteListing: async (
          _root: undefined,
          { id }: { id: string },
          { db }: { db: Database }
        ): Promise<Listing> => {
          const deleteRes = await db.listings.findOneAndDelete({
            _id: new ObjectId(id)
          });
    
          if (!deleteRes.value) {
            throw new Error("failed to delete listing");
          }
    
          return deleteRes.value;
        }
      },
      Listing: {
        id: (listing: Listing): string => listing._id.toString()
      }
    // Mutation: {
    //     deleteListing: (_root, { id }) => {
    //         listings.map((li, i) => {
    //             if (li.id === id) {
    //                 return listings.splice(i, 1);
    //             }
    //         })
    //         throw new Error("failed to deleted listing");
    //     }
    // }
   // Mutation: {
        // deleteListing: (_root: undefined, { id }: { id: string }) => {
        //   for (let i = 0; i < listings.length; i++) {
        //     if (listings[i].id === id) {
        //       return listings.splice(i, 1)[0];
        //     }
        //   }
    
        //   throw new Error("failed to deleted listing");
        // }
     // }
}