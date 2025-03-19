// components/ThreadForm.js
import { useState } from "react";
import { addThread } from "../API";
import { useNavigate } from "react-router";

const ThreadForm = ({onCancel }) => {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title.trim() || !category.trim() || !content.trim() || !author.trim()) {
        return;
      }
  
  const data = { title,
    category,
    content,
    author,
      } 
   
      console.log("Sending thread data:", data); // För att se vad som skickas

      const response = await addThread(data);
      console.log("Server response:", response); // För att se serversvaret

      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error adding thread:", error);
      alert("Failed to create thread. Please try again."); // Feedback till användaren
    }
  };




  return (
    <form className="thread-form" onSubmit={handleOnSubmit}>
      <h2>Skapa ny tråd</h2>
      
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Thread Title"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Thread Content"
          className="form-textarea"
          required
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your Name"
          className="form-input"
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          Skapa tråd
        </button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          Avbryt
        </button>
      </div>
    </form>
  );
};

export default ThreadForm;
