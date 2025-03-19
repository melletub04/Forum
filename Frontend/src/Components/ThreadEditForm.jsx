import { useState, useEffect } from "react";

export default function ThreadForm({ initialData, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [author, setAuthor] = useState(initialData?.author || "");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setCategory(initialData.category);
      setContent(initialData.content);
      setAuthor(initialData.author);
    }
  }, [initialData]);

  const handleSubmit = () => {

    onSubmit({
      title,
      category,
      content,
      author,
      date: new Date()
        .toLocaleString("sv-SE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(",", ""),
    });
  };

  return (
    <form className="edit-thread-form" onSubmit={handleSubmit}>
      <h1>Redigera tråd</h1>
      <input
        className="edit-input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title..."
        required
      />
      <input
        className="edit-input"
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter category..."
        required
      />
      <textarea
        className="edit-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter content..."
        required
      />
      <input
        className="edit-input"
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Enter author..."
        required
      />
      <div className="button-group">
        <button className="save-btn" type="submit">
          Spara ändringar
        </button>
        <button className="cancel-btn" type="button" onClick={onCancel}>
          Avbryt
        </button>
      </div>
    </form>
  );
}
