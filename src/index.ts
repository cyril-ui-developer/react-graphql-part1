
// GraphQL Implementation
require("dotenv").config(); 
// run the code early to prevent ESLint warning error
// and also helps prevent compilation issues where other imported files don't pick up environment variables.

import { ApolloServer } from "apollo-server-express";
import  express, { Application}  from 'express';

import { typeDefs, resolvers } from './graphql';
import { connectDatabase } from "./database";

//const app = express();
// const server = new ApolloServer({ typeDefs, resolvers });

// server.applyMiddleware({ app, path: "/api" });

const mount = async (app: Application) =>{
    const port = 4000;
    const db = await connectDatabase();

    const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ db }) });

    server.applyMiddleware({ app, path: "/api" });

    const listings = await db.listings.find({}).toArray();
    console.log(listings);

    app.listen(process.env.PORT);

    console.log(`[app]: http://localhost:${process.env.PORT}`);
}

mount(express())
// REST Implementation
// import express from 'express';
// import bodyParser from "body-parser";


// import { listings } from './listings';


//const port = 4000;

// app.use(bodyParser.json());

// app.get('/', (_req, res) => res.send('hello world3'));

// app.get('/listing', (_req, res) =>{
//     res.send(listings)
// })

// app.post('/delete-listing', (req, res) => {
//     const id: string = req.body.id;
   
//     listings.map((li, i ) =>{
//         if (li.id === id) {
//             return res.send(listings.splice(i, 1));
//         }
//     })
//     // for (let i = 0; i < listings.length; i++) {
//     //   if (listings[i].id === id) {
//     //     return res.send(listings.splice(i, 1));
//     //   }
//     // }
//   })


//app.listen(port);

//console.log(`[app] : http://localhost:${port}`);
