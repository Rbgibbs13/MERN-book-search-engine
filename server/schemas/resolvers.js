const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async() => {
            return User.find();
          },
          user: async(parent, { userId }) => {
            return User.findOne({ _id: userId });
          },
    },

    Mutation: {
        addUser: async(_, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { user, token };
        },
        saveBook: async(_, args) => {
            const updateUser = await User.findOneAndUpdate(
                { _id: args._id }, 
                { $addToSet: { savedBooks: [...args] } }, 
                { new:true });

                return updateUser;
        },
        removeBook: async(_, args) => {
            const updateUser = await User.findOneAndUpdate(
                {_id: args._id},
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true });

                return updateUser;
        },
        login: async(_, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) throw AuthenticationError;

            const checkPW = await user.isCorrectPassword(password);
            if(!checkPW) throw AuthenticationError;

            const token = signToken(user);
            return { token, user };
        }
    }
};

module.exports = resolvers;