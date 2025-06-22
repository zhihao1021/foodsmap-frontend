'use client';
import { useRef, useState, useEffect } from 'react';
import SearchForm, { SearchFormRef } from './components/SearchForm';
import SuggestionButtons from './components/SuggestionButtons';
import CategorySelector from './components/CategorySelector';
import AuthorCard from './components/AuthorCard';
import styles from './page.module.scss';
import type { Article } from '@/schemas/article';
import type { User } from '@/schemas/user';
import getUserByAuthor from '@/api/user/getUsersByDisplayName';
import getArticlesByContext from '@/api/article/getByContext';
import getArticlesByTag from '@/api/article/getByTag';
import PopularTag from '@/api/search/popularTag';
import ArticleList from '@/components/ArticleList';


export default function SearchPage() {
  const searchRef = useRef<SearchFormRef>(null);
  const [, setSearchText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('推薦');
  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const [showArticleCard, setShowArticleCard] = useState(false);
  const [, setShowAuthorCard] = useState(false);
  const [recommendedArticles, setRecommendedArticles] = useState<Article[]>([]);
  const [tagArticles, setTagArticles] = useState<Article[]>([]);
  const [author, setAuthor] = useState<User[]>([]);
  const [suggestionsTags, setSuggestionsTags] = useState<string[]>([]);
  const [, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPopularTags = async () => {
      try {
        const tags = await PopularTag();
        setSuggestionsTags(tags);
      } catch (err) {
        console.error('載入熱門標籤失敗:', err);
        setError('無法載入熱門標籤');
      }
    };

    loadPopularTags();
  }, []);

  const handleSubmit = async (input: string) => {
    console.log('搜尋字:', input);
    setSearchText(input);
    setShowSuggestions(false);
    setShowCategorySelector(true);
    setShowArticleCard(true);
    //setShowAuthorCard(true);
    setLoading(true);
    setError(null);

    try {
      const result_user = (await getUserByAuthor(input)).data;
      setAuthor(result_user);
      console.log('作者搜尋結果:', result_user);


      const recommended_article = (await getArticlesByContext(input)).data;
      setRecommendedArticles(recommended_article);
      console.log('Context搜尋結果:', recommended_article);

      const tags_article = (await getArticlesByTag(input)).data;
      setTagArticles(tags_article);
      console.log('Tags搜尋結果:', tags_article);


    } catch (err) {
      setError((err as Error).message ?? '搜尋失敗');
    } finally {
      setLoading(false);
    }
  };


  const handleClear = async () => {
    setShowSuggestions(true);
    setShowCategorySelector(false);
    setShowArticleCard(false);
    setShowAuthorCard(false);

    setAuthor([]);
    setTagArticles([]);
    setRecommendedArticles([]);

    try {
      const tags = await PopularTag();
      setSuggestionsTags(tags);
    } catch (err) {
      console.error('重新載入標籤失敗:', err);
    }
  };

  const handleSuggestionClick = (word: string) => {
    searchRef.current?.setSearchTerm(word);
    handleSubmit(word);
  };


  const renderCategoryContent = () => {
    switch (selectedCategory) {
      case '推薦':
        return (
          <ArticleList
            articles={recommendedArticles}
            deleteCallback={articleId => setRecommendedArticles(prev => prev.filter(v => v.id !== articleId))}
          />
        );
      case 'Tags':
        return <ArticleList
            articles={tagArticles}
            deleteCallback={articleId => setRecommendedArticles(prev => prev.filter(v => v.id !== articleId))}
          />;
      case '作者':
        return (
          <>
            {author.map(user => (
              <AuthorCard key={user.id} user={user} />
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <SearchForm onSubmit={handleSubmit} ref={searchRef} onClear={handleClear} />
      {showSuggestions && (
        <SuggestionButtons suggestions={suggestionsTags} onSuggestionClick={handleSuggestionClick} />
      )}
      {showCategorySelector && (
        <CategorySelector selected={selectedCategory} onSelect={setSelectedCategory} />
      )}
      {showArticleCard && (
        <div style={{ marginTop: '2rem' }}>
          {renderCategoryContent()}
        </div>
      )}
    </div>
  );
}
