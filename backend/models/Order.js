driver: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null,
},
status: {
  type: String,
  enum: ["pending", "picked_up", "delivered"],
  default: "pending",
},
deliveryEarning: {
  type: Number,
  default: 0,
}
