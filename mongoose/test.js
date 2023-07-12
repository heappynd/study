import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: String, // String is shorthand for {type: String}
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs: Number,
    },
  },
  {
    methods: {
      findSimilarTypes() {
        console.log("findSimilarTypes", this.title);
      },
    },
    statics: {
      findByTestName() {
        console.log("findByTestName");
      },
    },

    query: {
      byTestName() {
        console.log("byTestName");
      },
    },
  }
);

const Blog = mongoose.model("Blog", blogSchema);

console.log(new Blog()._id instanceof mongoose.Types.ObjectId);

Blog.findByTestName();

// blogSchema.methods.findSimilarTypes();

new Blog({
  title: "my-title",
}).findSimilarTypes();

Blog.find().byTestName();
