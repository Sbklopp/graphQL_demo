# Authors and Books GraphQL Demo


## Installation and Running Server
use **npm install** to install depencies. <br>
Install nodemon as a dev depency using **npm i --save-dev nodemon** <br>
Install dotenv with **npm install dotenv --save** and create an .env file to add your database credentials  <br>
run server with **npm run devstart**



## Query a single author:
*replace x with id you want to query* <br>
{ 
  author(id: x){
    id
    name
    age
  }
}

## Query all authors:

{
  authors{
    id
    name
    age
  }
}



## Query a single book:
*replace x with id you want to query* <br>
{
  book(id: x) {
    id
    name
    pages
  }
}


## Query all books:

{
  books {
    id
    name
    pages
  }
}



## Query a book by author_id:
*replace x with id you want to query* <br>

{
  books(author_id: x)
  {
    name
    author{
      name
    }
  }
}


## Query an author by book id:
*replace x with id you want to query* <br>

{
    book(id:1) {
      id
    	name
    	author{
        name 
        age
      }
    }
  }
  
  
 ## Helpful Videos:
- [GraphQL in 40 minutes-- Great for getting set up](https://www.youtube.com/watch?v=ZQL7tL2S0oQ&t=918s) <br>
- [Setting up enviroment variables in node](https://www.youtube.com/watch?v=xc7UduoAh-0)
