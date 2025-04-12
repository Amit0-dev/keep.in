import express from "express"
import {getAllLinks} from "../controllers/notion.controller.js"

const router = express.Router();

router.get('/links' , getAllLinks)





export default router;