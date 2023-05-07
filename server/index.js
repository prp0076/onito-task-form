const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000
const User = require("./models/User")
const Connectdb = require("./dbconnection");
Connectdb();

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// resolve cors policy error
 app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.use('/api',require("./Routes/List"));

app.use(express.json());
app.use(cors());
//routes
app.use("/api",require("./Routes/Userdata"));
// app.post('/submit', async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})