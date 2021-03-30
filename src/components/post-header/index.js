import { Link } from 'gatsby';
import React from 'react';

import './style.scss';

const PostHeader = ({ post }) => {
  return (
    <header className="post-header-wrapper">
      <div className="post-header">
        {post.emoji && <div className="emoji">{post.emoji}</div>}

        <div className="info">
          <div className="categories">
            {post.categories.map((category) => (
              <Link className="category" key={category} to={`/posts/${category}`}>
                {category}
              </Link>
            ))}
          </div>
        </div>

        <h1 className="title">{post.title}</h1>
        <div className="info">
          <div className="author">
            posted by <strong>{post.author}</strong>
          </div>
          <div className="date"> · {post.date}</div>
        </div>
      </div>
    </header>
  );
};
export default PostHeader;
