import { Link } from "react-router-dom";

const ThreadCard = ({ data }) => {
  const { id, title, category, author, date, content } = data;

  return (
    <article className="thread-card">
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        <span className="category-tag">{category}</span>
      </div>
      
      <div className="card-meta">
        <span className="author-info">Uppladdad av {author}</span>
        <time className="post-date">{date}</time>
      </div>
      
      <p className="card-preview">
        {content.length > 150 ? `${content.slice(0, 150)}...` : content}
      </p>

      <footer className="card-actions">
        <Link to={`/view-thread/${id}`} className="primary-link">
          Read More
        </Link>
        <Link to={`/edit-thread/${id}`} className="secondary-link">
          Edit Thread
        </Link>
      </footer>
    </article>
  );
};

export default ThreadCard; 