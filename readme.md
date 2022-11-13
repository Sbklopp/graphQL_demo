# Authors and Books GraphQL Demo
<br>

## Installation and Running Server
- use **npm install** to install depencies. <br>
- Install nodemon as a dev depency using **npm i --save-dev nodemon** <br>
- Install dotenv with **npm install dotenv --save** and create an .env file to add your database credentials  <br>
- run server with **npm run devstart**
- create queries at **localhost:5000/graphql**

<br>

## Graphiql Queries
**Replace x with the id you want to query** <br>
<br>

### Query a single author:


*{ 
  author(id: x){
    id
    name
    age
  }
}*

<br>

### Query all authors:

*{
  authors{
    id
    name
    age
  }
}*

<br>

### Query a single book:


*{
  book(id: x) {
    id
    name
    pages
  }
}*

<br>

### Query all books:

*{
  books {
    id
    name
    pages
  }
}*

<br>

### Query a book by author_id:


*{
  books(author_id: x)
  {
    name
    author{
      name
    }
  }
}*

<br>

### Query an author by book id:

*{
    book(id: x) {
      id
    	name
    	author{
        name 
        age
      }
    }
  }*
  
  <br>
  
 ## Helpful Videos:
- [GraphQL in 40 minutes-- Great for getting set up](https://www.youtube.com/watch?v=ZQL7tL2S0oQ&t=918s) <br>
- [Setting up enviroment variables in node](https://www.youtube.com/watch?v=xc7UduoAh-0)
