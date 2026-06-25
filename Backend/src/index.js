import  express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoute from "./routes/auth.routes.js"
import OrganizationsRoute from "./routes/organization.routes.js"
import flagRoute from "./routes/flag.routes.js"
const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;
const allowedOrigins = [
  "https://multi-tenant-feature-flag-managemen-neon.vercel.app",
  "https://multi-tenant-feature-flag-managemen-one.vercel.app",
  "https://multi-tenant-feature-flag-managemen-seven.vercel.app",
  "http://localhost:5173", 
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/organizations',OrganizationsRoute);
app.use('/api/flags',flagRoute);

app.listen(PORT,()=>{
  console.log(`\n Feature Flag API → http://localhost:${PORT}`);
})