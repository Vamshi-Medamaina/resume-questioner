import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { generateResponse } from "./geminiClient.js";

dotenv.config();

import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send("Backend Running...");
});

let resumeText = "";

app.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const mimetype = req.file.mimetype;
  let text = "";

  if (mimetype === "application/pdf") {
    const dataBuffer = fs.readFileSync(req.file.path);
    const result = await pdfParse(dataBuffer);
    text = result.text;
  } else if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
    try {
      const result = await mammoth.extractRawText({ path: req.file.path });
      text = result.value;
    } catch (e) {
      console.error("Error: ", e);
    }

  resumeText = resumeText + text;

  const response = await generateResponse(resumeText);
  return res.status(201).json(response);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
