import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getThreadById,
  getComments,
  addComment,
  updateComment,
  deleteComment,
} from "../API";
import CommentForm from "../components/CommentForm";
import CommentItem from "../components/CommentItem";

export default function ThreadDetail() {
  

  const { id } = useParams(); // hämtar trådens ID från URL
  // Staet för att lagra tråden och dess kommentarer
  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);

  // Hämtar tråden och dess kommentarer vid sidladdning eller om ID ändras
  useEffect(() => {
    async function fetchThread() {
      try {
        const data = await getThreadById(id);
        setThread(data); // Sätter den hämtade tråden i state

        const commentsData = await getComments(id);
        setComments(commentsData); // Sätter de hämtade kommentarernai state

      } catch (error) {
        console.error("Kunde inte hämta tråden:", error);
      }
    }
    fetchThread();
  }, [id]); // Körs igen om ID ändras

  // Hanterar inlämning av en ny kommentar
  const handleCommentSubmit = async (newComment) => {
    try {
      const addedComment = await addComment(id, newComment);
      setComments([...comments, addedComment]); // Lägger till den nya kommentaren i listan 

      window.location.reload();
    } catch (error) {
      console.log("Couldn't add comment:", error);
    }
  };

  // Hanterar uppdatering av kommentarer
  const handleEditComment = async (updatedComment) => {
    try {
      const updated = await updateComment(
        id,
        updatedComment.comment_id, // Använder kommentarens ID för att identifiera
        updatedComment
      );
      setComments( // Uppdaterar listan med kommentarer
        comments.map((c) => (c.comment_id === updated.comment_id ? updated : c))
      );
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  // hanterar delete av en en kommentar
  const handleDelete = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment(id, commentId);
        // filtrerar bort den raderade kommentaren från llistan
        setComments(comments.filter((c) => c.comment_id !== commentId));
      } catch (error) {
        console.error("Failed to delete comment:", error);
      }
    }
  };
  // Laddningstext
  if (!thread) {
    return <p>Loading...</p>;
  }

  return (
    <div className="thread-detail-container">
      <div className="thread-item">
        <h3 className="thread-title">{thread.title}</h3>
        <p className="thread-author">
          {thread.author} - {thread.date}
        </p>
        <p className="thread-content">{thread.content}</p>
        <div className="thread-actions">

          <button
            className="action-btn"
            onClick={() => setShowCommentForm(!showCommentForm)} // Ändrar state för showCommentForm, formuläret visas när knappen klickas och döljs
          >
            {showCommentForm ? "Hide comments" : "+ New comment"}
          </button>
          <Link to="/" className="action-btn cancel-btn">
            Cancel
          </Link>
        </div>
      </div>

      {/* && används för att visa CommentForm om det är true. CommentForm skickar en ny kommentar till handleCommentSubmit*/}
      {showCommentForm && <CommentForm onCommentSubmit={handleCommentSubmit} />}

      <h4 className="comments-title">Comments</h4>
      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        <ul className="comment-list">
          {comments.map((comment) => (
            <CommentItem
              key={comment.comment_id}
              comment={comment}
              onEdit={handleEditComment}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
