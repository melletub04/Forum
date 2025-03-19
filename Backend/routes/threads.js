import express from "express";
import {
  getAllThreads,
  getThreadById,
  createThread,
  updateThread,
  deleteThread,
  getCommentByThreadId,
  createComment,
  updateComment,
  deleteComment,
} from "../models/threadModel.js";
import { validateThreadData } from "../middleware/validateThread.js";

const router = express.Router(); // Hanterar trådar och kommentarer

// Hämta alla trådar
router.get("/", (req, res) => {
  try {
    const threads = getAllThreads();
    res.json(threads);
  } catch (error) {
    console.error("Error getting threads:", error);
    res.status(500).json({ error: "Failed to get threads" });
  }
});

// Hämta en specifik tråd
router.get("/:id", (req, res) => {
  const thread = getThreadById(req.params.id); // Hämtar en tråd baserat på ID från URL-parametern
  if (!thread) return res.status(404).json({ error: "Thread not found" });
  res.json(thread); // Returnerar tråden som JSON
});

// Lägg till en ny tråd
router.post("/", (req, res) => {
  try {
    const { title, content, author, category } = req.body;
    
    // Validera att all nödvändig data finns
    if (!title || !content || !author || !category) {
      return res.status(400).json({ 
        error: "Missing required fields",
        received: { title, content, author, category }
      });
    }

    const newThread = createThread(title, content, author, category);
    console.log("Created new thread:", newThread); // För debugging
    res.status(201).json(newThread);
  } catch (error) {
    console.error("Error creating thread:", error);
    res.status(500).json({ error: "Failed to create thread" });
  }
});

// Uppdatera en tråd
router.put("/:id", validateThreadData, (req, res) => {
  const { id } = req.params; // Hämtar trådens ID från URL-parametern
  const { title, content, author, date, category } = req.body; // Hämtar uppdaterad data från request body
  const updatedThread = updateThread(
    id,
    title,
    content,
    author,
    date,
    category
  );

  if (!updatedThread)
    return res.status(404).json({ error: "Thread not found" });

  res.json(updatedThread); // Returnerar den uppdaterade tråden
});

// Ta bort en tråd
router.delete("/:id", (req, res) => {
  if (!deleteThread(req.params.id)) {
    return res.status(404).json({ error: "Thread not found" });
  }
  res.status(200).json({ message: "Thread deleted successfully" });
});

// Rutter för kommentarer
router.get("/:id/comments", (req, res) => {
  const comments = getCommentByThreadId(req.params.id); // Hämtar alla kommentarer för en given tråd
  res.json(comments);
});

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;

  if (!author?.trim() || !content?.trim()) { 
    return res.status(400).json({ error: "Author and content are required" }); // Validerar att författare och innehåll finns
  }

  // Skapar en tidsstämpel när kommentaren skapas
  const date = new Date()
    .toLocaleString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", "");

  // Skapa kommentaren med tidsstämpeln
  const newComment = createComment(id, author, content, date);

  res.status(201).json(newComment);
});

// Uppdatera en kommentar
router.put("/:threadId/comments/:commentId", (req, res) => {
  const { commentId } = req.params;
  const { author, content } = req.body;

  if (!author?.trim() || !content?.trim()) {
    return res.status(400).json({ error: "Author and content are required" });
  }

  // Generera en ny tidsstämpel varje gång kommentaren uppdateras
  const date = new Date()
    .toLocaleString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", "");

  // Uppdatera kommentaren med ny tidsstämpel
  const updatedComment = updateComment(commentId, author, content, date); // Uppdaterar kommentaren i databasen

  if (!updatedComment) {
    return res.status(404).json({ error: "Comment not found" });
  }

  res.json(updatedComment); // Returnerar den uppdaterade kommentaren
});

// Ta bort en kommentar
router.delete("/:threadId/comments/:commentId", (req, res) => {
  const { commentId } = req.params; // hämtar kommentarens ID 
  if (!deleteComment(commentId)) {
    return res.status(404).json({ error: "Comment not found" });
  }
  res.status(200).json({ message: "Comment deleted successfully" });
});

// Exporterar router 
export default router;
