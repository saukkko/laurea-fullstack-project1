import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
export const router = Router();

const guestbookFile = "./guestbook_data.json";

router.get("/", (req, res) => res.sendFile("index.html", { root: "./html" }));

router.get("/newmessage", (req, res) =>
  res.sendFile("form.html", { root: "./html" })
);

router.get("/ajaxmessage", (req, res) =>
  res.sendFile("./ajaxform.html", { root: "./html" })
);

router.get("/guestbook", (req, res) => {
  res.sendFile("./guestbook.html", { root: "./html" });
});

router.get("/entries", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  readFile(guestbookFile)
    .then((data) => res.send(data.toString()))
    .catch((err) => sendError(res, err, 500));
});

router.post("/post", (req, res) => {
  const contentLength = parseInt(req.headers["content-length"]);
  if (contentLength > 2000) {
    sendError(res, new Error("Content length exceeds 2kb"), 413);
    return;
  }
  if (contentLength === 0) {
    sendError(res, new Error("Empty content not allowed"), 400);
    return;
  }

  processFormData(req.body)
    .then(() => res.redirect("/guestbook"))
    .catch((err) => sendError(res, err, 400));
});

/**
 *
 * @param {any} response Response object from the route
 * @param {Error} error An error object
 * @param {number} statusCode HTTP status code to send
 */
const sendError = (response, error, statusCode) => {
  response
    .writeHead(statusCode, { "Content-Type": "text/plain" })
    .end(
      `Error ${response.statusCode} - ${response.statusMessage}\n\nError message: ${error.message}`
    );
};

/**
 *
 * @param {GuestbookData} newData
 * @param {string} contentType
 * @returns {Promise<void>}
 */
const processFormData = async (newData) => {
  const file = await readFile(guestbookFile);

  /** @type {GuestbookData[]} */
  let data = [];
  if (file && file.length > 1) data = JSON.parse(file.toString());

  return new Promise((resolve, reject) => {
    try {
      // check data exists
      if (!newData) throw new Error("Request must have a body");
      if (!newData.message) throw new Error("Message field is mandatory");
      if (!newData.country) throw new Error("Country field is mandatory");
      if (!newData.name) newData.name = "Anonymous";

      // check data validity (this should match the html5 soft caps)
      if (newData.name.length > 30) {
        throw new Error("Name field too long");
      }
      if (newData.country.length > 30) {
        throw new Error("Country field too long");
      }
      if (newData.message.length > 500) {
        throw new Error("Message field too long");
      }

      // POST payload may contain extra fields and we mitigate the issue by ignoring everything else but our fields
      const { name, country, message } = newData;
      data.push({ name, country, message });

      writeFile(guestbookFile, JSON.stringify(data)).then(resolve);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @typedef {Object} GuestbookData
 * @property {string} name
 * @property {string} country
 * @property {string} message
 */
