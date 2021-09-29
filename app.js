const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const routes=require('./routers/router');
const host='0.0.0.0';

const port=process.env.PORT||2077;

const app=express();

app.use(cors());

app.use(express.json());

app.use('/',routes);

mongoose.connect('mongodb+srv://BujalaSarathKumarReddy:12345abcd@cluster0.nud0w.mongodb.net/Zensark?retryWrites=true&w=majority',()=>{
    app.listen(port,host,()=>{
        console.log(`Server is running at ${host} : ${port}`);
    })
})

