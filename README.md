# Petpet
## 簡答題
1. ### 	何謂 Authentication？何謂 Authorization？

    1. Authentication 
    It is the process of **verifying oneself**, mostly by password, access token or verify number. When thinking of the question 'who is this user?', it is related to authentication.

    2.  Authorization 
    It is the process of **verifying what one use have access to**. When thinking of the question 'Is this user allowed to do this?', it is related to authorization.

1. ### Isolation Level 有幾種？個別可以避免那些問題？
    1. Read Uncommitted 
    When transaction A is writing but not committed yet, transaction B can only read. This level can avoid update lost.
    
    2. Read Committed
    When transaction A is writing but not committed yet, transaction B cannot read. Transaction B can only read after writing of transaction A is committed. This level can avoid dirty read and problems above.
    
    3. Repeatable Read
    When transaction A is reading, transaction B cannot write. This level can avoid non-repeatable read and problems above.
    
    4. Serializable
    When transaction A is reading, transaction B need to queue for writing; when transaction A is writing, transaction B need to queue for both writing and reading. This level can avoid phantom read and problems above.

3. ### 	何謂 Cross-Site Scripting？如何避免？
    1. Cross-Site Scripting(XSS) is a type of web application attack where malicious client-side script is injected into the web application and subsequently executed by victim user's browser. There are two major types of XSS, reflected and stored XSS attack.
 
        1. **Reflected XSS attack** refers to that attackers can put malicious script in the input and let the server to reflect back the code, then it will be injected into the web page from the website.
        2. **Stored XSS attack** means that an attacker directly sends malicious script to the target website which stores it in server database. If the website later sends the stored data with malicious code to other users, it would be executed on other user's web page.
    
    2.  Countermeasures:
        1.  **Remove script/code** from user inputs. Can use open-source libraries that can filter out javascript code, eg: jsoup.
        2.   **Replace HTML makrups** with alternate representations.
        3.   **Filter the user data** when it is sent back to the browser (output filtering).
        4.    **Set cookie** to http-only

4. ### 	何謂 SQL Injection？如何避免？
    1. SQL injection is placing SQL statement via web page input to spoof identity, get sensitive data from database, or even destroy one's database.
    
    3. Countermeasures:
        1. Prepared statements with **variable binding**: first define all the SQL code, and then pass in each parameter to the query later enables the database to distinguish between code and data, any data with SQL syntax would be treated malicious and escaped.
        
        3. **Avoid exposing SQL errors to front-end**, because they mostly include database or table information which enables hackers to hack database with SQL statements.
   
5. ### 	何謂耦合？何謂去耦合？
    1. **Coupling** refers to how dependent classes and modules are to one another. When you want to use or modify one class, other classes which are coupled may need to be correspondently used or modified as well.
    2. **Decoupliing** refers to that making a tightly coupled system more loosely coupled, which is to lower connections among classes. It allows changes to be made to any class without easily affecting on other classes and enhances maintainence and flexibility.


## 實作題 Todo List
### RESTful APIs

#### Domain Name: https://9pfinhxi47.execute-api.us-east-2.amazonaws.com/prod/

#### Schema
* `Todo Object`

| Field | Type | Description |
| :---: | :---: | :--- |
| id | String | Todo id |
| title | String | Todo title |
| description | String | Todo description |
| isCompleted | Boolean | Todo status |

---
a.	GET  /todos 列出代辦列表
* **Request Example**: 
https://9pfinhxi47.execute-api.us-east-2.amazonaws.com/prod/todos

* **Response Example**:
``` json
{
    "Items": [
        {
            "description": {
                "S": "buy cosmetics"
            },
            "id": {
                "S": "6d08f07d-4dd8-4fbb-81af-6c3bf9da3721"
            },
            "title": {
                "S": "Travel to Japan"
            },
            "isCompleted": {
                "BOOL": false
            }
        },
        {
            "description": {
                "S": "Email to professor about presentation"
            },
            "id": {
                "S": "5f84f5b7-5b82-4a2b-87b9-07357c93be51"
            },
            "title": {
                "S": "Meeting"
            },
            "isCompleted": {
                "BOOL": false
            }
        }
    ],
    "Count": 2,
    "ScannedCount": 2
}
```

b.	GET /todos/:id 取得單一代辦
* **Request Example**: 
https://9pfinhxi47.execute-api.us-east-2.amazonaws.com/prod/todos/63747da6-5f6e-44aa-bb86-6653ad304fc7

* **Response Example**:
``` json
{
    "Item": {
        "description": {
            "S": "Email to professor about presentation"
        },
        "id": {
            "S": "5f84f5b7-5b82-4a2b-87b9-07357c93be51"
        },
        "title": {
            "S": "Meeting"
        },
        "isCompleted": {
            "BOOL": false
        }
    }
}
```
c.	POST /todos 新增代辦
* **Request Example**: 
https://9pfinhxi47.execute-api.us-east-2.amazonaws.com/prod/todos
* **Request Body**: 
``` json
{
    "title": "todoTitle",
    "description": "todoDescription"
}
```
* **Success Response: 200**

| Type | Description |
| :---: | :--- |
| statusCode | number |
| body | new todo Id |
* **Response Example**
``` json
{
    "statusCode": 200,
    "body": "e6c12853-ea81-4113-98cc-344469e1e83c"
}
```

d.	PUT /todos/:id 修改代辦
* **Request Example**: 
https://9pfinhxi47.execute-api.us-east-2.amazonaws.com/prod/todos/e6c12853-ea81-4113-98cc-344469e1e83c
* **Request Body**: 
``` json
{
    "title": "todoTitle",
    "description": "todoDescription",
    "isCompleted": true
}
```
* **Response Example**:
``` json
{
    "statusCode": 200,
    "body": "success"
}
```

e.	DELETE /todos 刪除代辦
* **Request Example**: 
https://9pfinhxi47.execute-api.us-east-2.amazonaws.com/prod/todos/e6c12853-ea81-4113-98cc-344469e1e83c
* **Response Example**:
``` json
{
    "statusCode": 200,
    "body": "success"
}
```
--- 
### GraphQL APIs
#### Playground: https://06kraa1esa.execute-api.us-east-2.amazonaws.com/dev/graphql

#### Schema
``` 
type Mutation {
  newTodo(title: String!, description: String!): MutationResult
  updateTodo(
    id: ID!
    title: String!
    description: String!
    isCompleted: Boolean!
  ): MutationResult
  deleteTodo(id: ID!): MutationResult
}

type MutationResult {
  statusCode: Int
  body: String
}

type Query {
  todos: [Todo]!
  todo(id: ID!): Todo
}

type Todo {
  id: ID!
  title: String
  description: String
  isCompleted: Boolean
}
```

