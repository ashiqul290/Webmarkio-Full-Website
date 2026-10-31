const mongoose = require('mongoose');

<<<<<<< HEAD
exports.dbConfig = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be configured.");
  }

  await mongoose.connect(process.env.DATABASE_URL);
  console.log("Database connected");
};
=======
exports.dbConfig = ()=>{
mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log('Database connected')
}).catch((err)=>{
    console.log(err)
})
} 
>>>>>>> origin/main
