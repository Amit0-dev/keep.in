const http = require("node:http")
const {Client} = require("@notionhq/client")
const dotenv = require("dotenv")

dotenv.config({
    path: './.env'
})

const host = process.env.HOST || "localhost"
const port = process.env.PORT || 8000;

const notionDatabaseId = process.env.NOTION_DATABASE_ID
const notionSecret = process.env.NOTION_SECRET

if(!notionDatabaseId || !notionSecret){
    throw new Error("Must define NOTION_DATABASE_ID and NOTION_SECRET in .env file")
}

const notion = new Client({
    auth: notionSecret
})

const server = http.createServer(async(req,res)=>{

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json")
    switch(req.url){
        case "/":
            res.writeHead(200)
            res.end(JSON.stringify({data: "success"}))
            break;
        case "/links":
            const query = await notion.databases.query({
                database_id: notionDatabaseId
            })

            const list = query.results.map((row) => {
                const titleCell = row.properties.title;
                const urlCell = row.properties.URL;
                const startCell = row.properties.start;


                if(titleCell && urlCell && startCell) {
                    const title = titleCell.rich_text?.[0].text.content;
                    const url = urlCell.url ?? "";
                    const start = startCell.date?.start ?? "";

                    return {title , url , start};
                }

                return {label: "NOT_FOUND" , url: "" , start: ""}
            })

            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(JSON.stringify(list));
            break;

        default:
            res.writeHead(404)
            res.end(JSON.stringify({error: "Resource not found"}))
    }
})


server.listen(port , host , ()=>{
    console.log(`Server is running on http://${host}:${port}`)
})