import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFound";
import articles from "./article-contents";

const Article = () => {
    const params = useParams();
    const articleId = params.articleId;
    const article = articles.find(article => article.name === articleId);

    if(!article) {
        return <NotFoundPage />
    }

    return (
        <>
            <h1>{article.title}</h1>
            {article.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
        </>
    );
}

export default Article;