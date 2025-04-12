import { notion } from "../utils/notion_client.js";

async function getAllLinks(req, res) {
  try {
    const query = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID
        ? process.env.NOTION_DATABASE_ID
        : (() => {
            throw new Error("Must define NOTION_DATABASE_ID in .env file");
          })(),
    });

    const list = query.results.map((row) => {
      const titleCell = row.properties.title;
      const urlCell = row.properties.URL;
      const startCell = row.properties.start;

      if (titleCell && urlCell && startCell) {
        const title = titleCell.rich_text?.[0].text.content;
        const url = urlCell.url ?? "";
        const start = startCell.date?.start ?? "";

        return { title, url, start };
      }

      return { label: "NOT_FOUND", url: "", start: "" };
    });

    return res.status(200).json({
      message: "All links fetched successfully",
      success: true,
      list,
    });
  } catch (error) {
    return res.status(400).json({
      message: "links not fetched something went wrong",
      error,
      success: false,
    });
  }
}

export { getAllLinks };
