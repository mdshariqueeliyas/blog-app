import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './routes/Home';
import About from './routes/About';
import Article from './routes/Article';
import ArticlesList from './routes/ArticlesList';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div id="page-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles/:articleId" element={<Article />} />
          <Route path="/articles" element={<ArticlesList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
