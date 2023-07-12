import mongoose from "mongoose";

main().catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

  const kittySchema = new mongoose.Schema({
    name: String,
  });

  kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  const Kitten = mongoose.model("Kitten", kittySchema);

  const fluffy = new Kitten({ name: "fluffy" });

  //   await fluffy.save();
  //   fluffy.speak();

  const kittens = await Kitten.find({ name: /^fluff/ });
  console.log(kittens);

  //   const silence = new Kitten({ name: "Silence" });
  //   console.log(silence.name); // 'Silence'
}
