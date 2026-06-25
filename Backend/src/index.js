import  express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoute from "./routes/auth.routes.js"
import OrganizationsRoute from "./routes/organization.routes.js"
import flagRoute from "./routes/flag.routes.js"
const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/organizations',OrganizationsRoute);
app.use('/api/flags',flagRoute);

app.listen(PORT,()=>{
  console.log(`\n Feature Flag API → http://localhost:${PORT}`);
})