import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './routes/Home';
import About from './routes/About';
import Article from './routes/Article';
import ArticlesList from './routes/ArticlesListPage';
import NotFoundPage from './routes/NotFound';
import information from './content/information';
import { Loading } from './components/Loading';
import { Suspense, useState, useEffect } from 'react';

function App() {

  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1300);
    return () => {
      clearTimeout(timeout);
    }
  }, []);

  if (isLoading) {
    return <Loading/>
  }

  return (
    <div className="App">
      <Suspense fallback={<Loading />} >
        <NavBar
          firstName={information.userData.firstName}
          lastName={information.userData.lastName}
        />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/articles/:articleId" element={<Article />} />
            <Route path="/articles" element={<ArticlesList />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
