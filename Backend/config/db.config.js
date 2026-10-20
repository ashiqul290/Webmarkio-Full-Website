const mongoose = require('mongoose');

exports.dbConfig = ()=>{
mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log('Database connected')
}).catch((err)=>{
    console.log(err)
})
} 