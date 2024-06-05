import React, {useEffect, useState} from "react";
import './index.css'
import ArticleCard from "./ArticleCard";


const Documents = ({documentsData}) => {
  const [documents, setDocuments] = useState([]);
  const [displayedDocs, setDisplayedDocs] = useState(2);

  const images = [
    '/assets/img/articleImages/article-capture-1.png',
    '/assets/img/articleImages/article-capture-2.png',
  ]

  useEffect(() => {

    console.debug(documentsData);

    if (documentsData && Array.isArray(documentsData)) {
      const transformedArticles = documentsData.map(doc => ({
        date: new Date(doc.ok.issueDate).toLocaleDateString("ru-RU"),
        url: doc.ok.url,
        sourceName: doc.ok.source.name,
        isTechNews: doc.ok.attributes.isTechNews,
        isAnnouncement: doc.ok.attributes.isAnnouncement,
        isDigest: doc.ok.attributes.isDigest,
        title: doc.ok.title.text,
        content: doc.ok.content.markup,
        wordCount: doc.ok.attributes.wordCount,
        // TODO рандомно беру картинку из доступного списка
        picture: images[Math.floor(Math.random() * images.length)],
      }));

      setDocuments(transformedArticles);
    }
  }, [documentsData]);


  // Функция для загрузки больше статей
  const showMoreArticles = () => {
    setDisplayedDocs(prev => prev + 2); // Показывать на две статьи больше
  };

  return (
    <div className='documents-container'>
      <div className="documents-cards">
        {documents.slice(0, displayedDocs).map((doc, index) => (
          <ArticleCard key={index} {...doc} />
        ))}
      </div>
      {displayedDocs < documents.length && (
        <button
          className="button show-more"
          onClick={showMoreArticles}
        >
          Показать больше
        </button>
      )}
    </div>
  )
}

export default Documents;