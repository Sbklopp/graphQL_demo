require('dotenv').config()

const graphql = require("graphql")
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLID, GraphQLNonNull } = graphql;
const { GraphQLDateTime } = require("graphql-iso-date");


//UNCOMMENT TO TEST YOUR ENVIROMENT VARIABLES
//YOU WILL HAVE TO INSTALL DOTENV CREATE A .env FILE
// console.log(process.env) // remove this after you've confirmed it is working
// console.log('token', process.env.username1)
// console.log('token', process.env.password)
// console.log('token', process.env.database)


let mysql = require('mysql2');
let connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.USERNAME1,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: '3306'
});


connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});




/////////////////////////////TYPES//////////////////////////////////


const AuthorType = new GraphQLObjectType({
    name: "AuthorType",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        location: { type: GraphQLString },
        book: {
            type: new GraphQLList(BookType),
            resolve: async (parent, args) => {
                // Place your MySQL queries...
                const [rows, fields] = await connection.promise().query(
                    // `SELECT * from books where author_id = ${parent.id}`
                    `Select * from books where author_id = ${parent.id}`
                )
                console.log(rows)
                return rows

            },
        },
    })
});


const BookType = new GraphQLObjectType({
    name: "BookType",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        pages: { type: GraphQLInt },
        author_id: { type: GraphQLID },
        created_at: { type: GraphQLDateTime },
        updated_at: { type: GraphQLDateTime },
        author: {
            type: AuthorType,
            resolve: async (parent, args) => {
                // Place your MySQL queries...
                const [rows, fields] = await connection.promise().query(
                    //note how this query references parent.author_id
                    //while in the authortype it references parent.id
                    `SELECT * from authors where id = ${parent.author_id}` 
                )
                return rows[0]

            },
        },
    })
});






/////////////////////////ROOT QUERIES////////////////////////////////

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields: () => ({


        // query a single author
        author: {
            type: AuthorType,
            args: {
                 id: { type: GraphQLID},
            },
            resolve: async (parentVal, args) => {
                // Place your MySQL queries...
                const [rows, fields] = await connection.promise().query(
                    `SELECT * from authors WHERE id = ${args.id}`
                )
                return rows[0]    
            }
        },

   
        //query multiple authors
        authors: {
            type: new GraphQLList(AuthorType),
            args: {
                 id: { type: GraphQLID },
                 book_id: { type: GraphQLID}
            },
            resolve: async (parentVal, args) => {
                // Place your MySQL queries...
                if (args.book_id) {
                    const [rows, fields] = await connection.promise().query(
                        // `SELECT * FROM authors where book_id = ${args.book_id}`
                        `SELECT * FROM authors where book_id = ${args.id}` //maybe this one?
                    )
                    return rows
                }
                const [rows, fields] = await connection.promise().query(
                    "SELECT * FROM authors"
                )
                 return rows     
            }
        },



         //query a single book
         book: {
            type: BookType,
            args: {
                 id: { type: GraphQLID },
            },
            resolve: async (parentVal, args) => {
                // Place your MySQL queries...
                const [rows, fields] = await connection.promise().query(
                    `SELECT * from books where id = ${args.id}`
                )
                return rows[0]
            }
        },

        //query multiple books
        books: {
            type: new GraphQLList(BookType),
            args: {
                 id: { type: GraphQLID },
                 author_id: {type: GraphQLID},
            },
            resolve: async (parentVal, args) => {
                // Place your MySQL queries...
                if (args.author_id) {
                   const [rows, fields] = await connection.promise().query(
                       `SELECT * FROM books where author_id = ${args.author_id}`
                    //    `SELECT * FROM books where author_id = ${args.id}`
                   )
                   return rows
                }
                const [rows, fields] = await connection.promise().query(
                    "SELECT * FROM books"
                )
                 return rows 
            }   
        },



    }) //ROOT QUERY FIELDS END HERE 
}); // ROOT QUERY ENDS HERE *** DO NOT SEPERATE THESE TWO LINES ^^

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})
