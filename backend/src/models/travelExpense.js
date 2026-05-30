import mongoose from 'mongoose';

const travelExpenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      enum: [
        'food',
        'transportation',
        'accommodation',
        'activities',
        'shopping',
        'others',
      ],
      required: true,
    },

    date: {
      type: Date,
      required: true,
      index: true
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model('TravelExpense', travelExpenseSchema);