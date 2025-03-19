export function validateThreadData(req, res, next) {
  const { title, content, author, category } = req.body;

  if (
    !title?.trim() ||
    !content?.trim() ||
    !author?.trim() ||
    !category?.trim()
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  next(); // Fortsätt till nästa middleware eller route-handler
}
