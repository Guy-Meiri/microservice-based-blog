const CommentList = (props) => {
  const commentsList = Object.values(props.comments).map((com) => {
    let content;
    if (com.status === "approved") {
      content = com.content;
    } else if (com.status === "pending") {
      content = "This comment is awaiting moderation";
    } else if (com.status === "rejected") {
      content = "This comment has been rejected";
    }
    return <li key={com.id}>{content}</li>;
  });

  return <ul>{commentsList}</ul>;
};

export default CommentList;
