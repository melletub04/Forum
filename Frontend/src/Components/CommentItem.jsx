import React, { useState } from "react";
import CommentEditForm from "./CommentEditForm";

export default function CommentItem({ comment, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => setEditing(true);
  const handleCancel = () => setEditing(false);

  return (
    <li className="comment-item">
      {editing ? (
        <CommentEditForm
          comment={comment}
          onCancel={handleCancel}
          onSubmit={onEdit}
        />
      ) : (
        <>
          <p>{comment.content}</p>
          <p>
            {comment.author} - {comment.date}
          </p>
          <div>
            <button className="action-btn" onClick={handleEditClick}>
              Redigera
            </button>
            <button
              className="action-btn"
              onClick={() => onDelete(comment.comment_id)}
            >
              Ta bort
            </button>
          </div>
        </>
      )}
    </li>
  );
}
