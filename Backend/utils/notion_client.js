import {Client} from "@notionhq/client"
import dotenv from "dotenv"

dotenv.config({
    path: './.env'
})

const notionSecret = process.env.NOTION_SECRET
if(!notionSecret){
    throw new Error("Must define NOTION_SECRET in .env file")
}

const notion = new Client({
    auth: notionSecret
})


export {
    notion
}