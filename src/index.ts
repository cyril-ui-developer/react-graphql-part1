
// GraphQL Implementation

import { ApolloServer } from "apollo-server-express";
import express from 'express';

import { typeDefs, resolvers } from './graphql';

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: "/api" });

// REST Implementation
// import express from 'express';
// import bodyParser from "body-parser";


// import { listings } from './listings';


const port = 4000;

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


app.listen(port);

console.log(`[app] : http://localhost:${port}`);
