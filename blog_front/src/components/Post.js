export function Post({ open }) {
  return open.map((el) => (
    <div key={el.createdAt} className="post">
      <div className="post__title">
        <h2>{el.title}</h2>
        <span>{el.createdAt}</span>
      </div>
      <p>{el.text}</p>
    </div>
  ));
}
