import React, { useState } from "react";

export default function CommentForm({ onCommentSubmit }) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      author,
      content,
      date: new Date().toLocaleString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    onCommentSubmit(newComment);
    setAuthor("");
    setContent("");
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        className="comment-input"
        type="text"
        placeholder="Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <textarea
        className="comment-textarea"
        placeholder="Write Comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button className="submit-btn" type="submit">
        Ladda upp kommentar
      </button>
    </form>
  );
}
