import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import { randomUUID } from "crypto";
export const router = Router();

const guestbookFile = "./guestbook_data.json";

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
  if (parseInt(req.headers["content-length"]) > 3000) {
    sendError(res, new Error("Content length exceeds 3kb"), 413);
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
  console.error(error);
  response
    .writeHead(statusCode, { "Content-Type": "text/plain" })
    .end(
      `Error ${response.statusCode} - ${response.statusMessage}\n\nError message: ${error.message}`
    );
};

/**
 *
 * @param {GuestbookData} newData
 * @returns {Promise<void>}
 */
const processFormData = async (newData) => {
  const file = await readFile(guestbookFile);

  /** @type {GuestbookData[]} */
  let data = [];
  if (file && file.length > 1) data = JSON.parse(file.toString());

  return new Promise((resolve, reject) => {
    try {
      if (!newData) throw new Error("Request must have a body");
      if (!newData.message) throw new Error("Message field is mandatory");

      if (!newData.username) newData.username = "Anonymous";

      newData.date = new Date().toString();
      do newData.id = randomUUID();
      while (typeof data.find((x) => x.id == newData.id) !== "undefined");

      // POST payload may contain extra fields and we mitigate the issue by ignoring everything else but our fields
      const { id, username, country, date, message } = newData;
      data.push({ id, username, country, date, message });

      writeFile(guestbookFile, JSON.stringify(data)).then(resolve);
    } catch (err) {
      console.error(newData);
      reject(err);
    }
  });
};

/**
 * @typedef {Object} GuestbookData
 * @property {number} id
 * @property {string} username
 * @property {string} country
 * @property {string|Date|null} date
 * @property {string} message
 */
