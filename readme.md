## Installation and Running Server
use npm install to install depencies
Install dotenv and create .env file to add your database credentials
run server with: npm run devstart



## Query a single author:
***replace x with id you want to query***
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
***replace x with id you want to query***
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
***replace x with id you want to query***

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
***replace x with id you want to query***

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