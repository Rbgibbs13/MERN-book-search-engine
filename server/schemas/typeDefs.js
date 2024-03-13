const typeDefs = `
    type User {
        _id: ID!
        username: String
        email: String
        password: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        _id: ID!
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        user(_id: ID!): User
        users: [User]

        book(_id: ID!): Book
        books: [Book]
        
        me: User
    }

    type Mutation {
        addUser(username: String, email: String, password: String): Auth
        saveBook(authors: [String], description: String, title: String, bookId: String, image: String, link: String): User
        removeBook(_id: ID!): User

        login(email: String!, password: String!): Auth
    }
`

module.exports = typeDefs;