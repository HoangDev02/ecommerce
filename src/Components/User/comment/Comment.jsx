import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {
  deleteCommentByUserId,
  deleteCommentById,
  updateCommentById,
  getCommentsByUserId,
  postComment,
} from "../../../redux/API/apiComment";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../redux/createInstance";
import "./comment.css";
import { loginSuccess } from "../../../redux/authSlice";

function Comment({ productId }) {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const comments = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState("");

  const handlePostComment = async () => {
    if (newComment.trim() !== "") {
      const data = {
        userId: user?._id,
        productId: productId,
        text: newComment,
      };
      try {
        await postComment(data, axiosJWT, user?.accessToken);
        setNewComment("");
        await getCommentsByUserId(productId, dispatch);
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    } else {
      alert("update fail");
    }
  };
  // DELETE comment
  const handleDeleteComment = async (commentId) => {
    await deleteCommentById(commentId, axiosJWT, user?.accessToken);
    getCommentsByUserId(productId, dispatch);
  };
  // UPDATE comment
  const handleUpdateComment = (commentId) => {
    console.log(commentId);
    if (editCommentContent.trim() !== "") {
      const dataComment = {
        text: editCommentContent,
      };
      updateCommentById(commentId, dataComment, axiosJWT, user?.accessToken);
      setEditCommentId(null);
      setEditCommentContent("");
      getCommentsByUserId(productId, dispatch);
    } else {
      alert("update fail");
    }
  };
  const handleEditChange = (content) => {
    setEditCommentContent(content);
  };

  const handleEdit = (comment) => {
    if (comment._id != null) {
      setEditCommentId(comment._id);
      setEditCommentContent(comment.content);
    }
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditCommentContent("");
  };
  useEffect(() => {
    getCommentsByUserId(productId, dispatch);
  }, [dispatch, productId]);
  return (
    <Container className="pt-5">
      <div className="comments-section">
        <h2>Comments</h2>

        <div className="new-comment-area">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="new-comment-input" // Added class for styling
          />
          <button
            onClick={handlePostComment}
            className="new-comment-button" // Added class for styling
          >
            Comment
          </button>
        </div>
        {comments?.comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-author">{comment.userId?.username}</div>
            <p className="comment-content">{comment.text}</p>

            {user?._id === comment.userId?._id && (
              <div>
                {editCommentId === comment._id ? (
                  <div>
                    <input
                      className="edit-comment-input"
                      type="text"
                      value={editCommentContent}
                      onChange={(e) => handleEditChange(e.target.value)}
                      placeholder="Write a comment..."
                      required
                    />
                    <button
                      className="comment-button update"
                      onClick={() => handleUpdateComment(comment._id)}
                    >
                      Update
                    </button>
                    <button
                      className="comment-button cancel"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="comment-button edit"
                      onClick={() => handleEdit(comment)}
                    >
                      Edit
                    </button>
                    <div className="user-action" onClick={() => handleDeleteComment(comment._id)}>Delete</div>
                  </div>
                )}
              </div>
            )}
            <p className="comment-date">{comment.postDate}</p>
            {/* Add more comment details here */}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Comment;
