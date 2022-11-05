import './App.scss';
import { useDispatch, useSelector } from 'react-redux';

import { Post } from './components/Post';
import { useEffect, useState } from 'react';

function App() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const array = useSelector((state) => state.allPosts.value);
  const titleVal = useSelector((state) => state.inputTitle.value);
  const textVal = useSelector((state) => state.inputText.value);

  const changeTitleValue = (e) => {
    dispatch({ type: 'CHANGE_TITLE', payload: e.target.value });
  };
  const changeTextValue = (e) => {
    dispatch({ type: 'CHANGE_TEXT', payload: e.target.value });
  };
  const getAllPosts = (arr) => {
    dispatch({ type: 'GET_POST', payload: arr });
  };

  const post = {
    title: titleVal,
    text: textVal,
  };

  const sendPost = async () => {
    const response = await fetch('http://localhost:3001/send/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error(`Ошибка запроса, статус ощибки ${response.status}`);
    }
    return await response.json();
  };

  useEffect(() => {
    fetch('http://localhost:3001/posts')
      .then((res) => res.json())
      .then((arr) => getAllPosts(arr));
  }, [open]);

  return (
    <div className="App">
      <div className="title">
        <h1>Дневник</h1>
      </div>
      <input
        className="form_title"
        onChange={(e) => changeTitleValue(e)}
        type="text"
        placeholder="Тема:"
      ></input>
      <textarea
        className="form_text"
        onChange={(e) => changeTextValue(e)}
        placeholder="Текст поста:"
      ></textarea>
      <button className="submit" onClick={sendPost}>
        cохранить
      </button>
      <button className="open_post" onClick={() => setOpen(true)}>
        показать посты
      </button>
      <button className="open_post" onClick={() => setOpen(false)}>
        скрыть посты
      </button>
      {array !== [] && open === true ? <Post open={array} /> : <div />}
    </div>
  );
}

export default App;
