const CommentList = (props) => {
  const commentsList = Object.values(props.comments).map((com) => <li key={com.id}>{com.content}</li>);

  return <ul>{commentsList}</ul>;
};

export default CommentList;
