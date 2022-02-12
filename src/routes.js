import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import { randomUUID } from "crypto";
export const router = Router();

// router.get("/", (req, res) => res.sendFile("index.html", { root: "./www/" }));

router.get("/newmessage", (req, res) =>
  res.sendFile("./form.html", { root: "./www/" })
);

router.get("/ajaxmessage", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile("./ajaxform.html", { root: "./www/" });
});

router.get("/guestbook", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  readFile("./guestbook_data.json")
    .then((data) => res.send(data.toString()))
    .catch((err) => sendError(res, err, 500));
});

router.post("/post", (req, res) => {
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

const processFormData = async (newData) => {
  const filename = "./guestbook_data.json";
  const data = JSON.parse((await readFile(filename)).toString());

  return new Promise((resolve, reject) => {
    try {
      if (!newData) throw new Error("Request must have a body");
      if (!newData.message) throw new Error("Message field is mandatory");

      if (!newData.date) newData.date = new Date().toString();

      newData.id = randomUUID(); //parseInt(data[data.length - 1].id) + 1;

      data.push(newData);
      writeFile(filename, JSON.stringify(data, null, 2)).then(resolve);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @typedef {Object} TestData
 * @property {string} text
 * @property {string?} extra
 */

/**
 * @typedef {Object} GuestbookData
 * @property {number} id
 * @property {string} username
 * @property {string} country
 * @property {string|Date|null} date
 * @property {string} message
 */
