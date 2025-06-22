'use client';

import ArticleCard from './ArticleCard';
import getLatestArticle from '@/api/article/getLatestArticle';
import styles from './page.module.scss';
import { useRef, useState, useEffect } from 'react';
import { Article } from '@/schemas/article';
import ArticleList from '@/components/ArticleList';


export default function HostPage(){
    const [showArticleCard, setShowArticleCard] = useState(false);
    const [article, setarticle] = useState<Article[]>();
    const [error, setError] = useState<string | null>(null);

    useEffect( () => {
        const loadLatestArticle = async () => {
            try {
                const latestArticle = await getLatestArticle(20);
                setarticle(latestArticle);
            } catch (err) {
                console.error('載入最新文章失敗:', err);
                setError('無法載入最新文章');
            }
        };  
        
        loadLatestArticle();
      
    }, []);
    
    return (
    <div className={styles.mainPage}>
        <h1>最新文章</h1>
        {
            article && <ArticleList articles={article} />
        }
    </div>
  );
}