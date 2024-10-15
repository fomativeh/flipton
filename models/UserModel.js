const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      default: null,
    },
    chatId: {
      type: Number,
      default: null,
    },
    firstname: {
      type: String,
      default: null,
    },
    lastname: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
    friends: {
      type: [
        {
          firstname: String,
          lastname: String,
          username: String,
          chatId: Number,
        },
      ],
      default: [],
    },
    transactions: {
      type: [
        {
          transactionType: { type: String, required: true },
          amount: { type: Number, required: true },
          date: { type: String, required: true },
        },
      ],
      default: [],
    },
    history: {
      type: [
        {
          won: { type: Boolean, required: true },
          player2: { type: String, required: true },
          amountWon: { type: Number, required: true },
          date: { type: String, required: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);
module.exports = User;
