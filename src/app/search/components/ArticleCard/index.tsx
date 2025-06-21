'use client';
import { useState } from 'react';
import type { Article } from '@/schemas/article';
import getAvatarSrc from '@/utils/getAvatarSrc';
import styles from './index.module.scss';

type Props = {
  article: Article;
  showAuthor?: boolean;
};

export default function ArticleCard({ article, showAuthor = true }: Props) {
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  return (
    <div className={styles.articleCard}>
      {/* 作者資訊區塊 */}
      {showAuthor && (
        <div className={styles.authorSection}>
          <div className={styles.authorInfo}>
            <img
              src={getAvatarSrc(article.author.id)}
              alt="avatar"
              className={styles.avatar}
            />
            <span className={styles.authorName}>{article.author.displayName}</span>
          </div>
        </div>
      )}

      {/* 文章內容區塊 */}
      <div className={styles.titleBox}>
        <h2 className={styles.title}>{article.title}</h2>
        {article.googleMapUrl && (
          <a
            className={styles.mapLink}
            href={article.googleMapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            pin_drop
          </a>
        )}
        <div className={styles.createTime}>
          {article.createTime && new Date(article.createTime).toLocaleDateString()}
        </div>
      </div>

      <p className={styles.content}>{article.context}</p>

      <div className={styles.footer}>
        <span className={styles.tags}>
          {article.tags.map((tag) => `#${tag} `)}
        </span>
        <div className={styles.likes}>
          <span className="material-symbols-outlined">thumb_up</span>
          <span>{article.likesCount}</span>
        </div>
      </div>

      {/* 圖片區塊 */}
      {article.mediaList?.length > 0 && (
        <div className={styles.imageGallery}>
          {article.mediaList.map((url, index) => (
            <img
              key={index}
              src={url}
              alt="article media"
              className={styles.thumbnail}
              onClick={() => setZoomImage(url)}
            />
          ))}
        </div>
      )}

      {/* 圖片放大預覽 */}
      {zoomImage && (
        <div className={styles.imageOverlay} onClick={() => setZoomImage(null)}>
          <img
            src={zoomImage}
            alt="enlarged preview"
            className={styles.enlargedImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <hr className={styles.bottomDivider} />
    </div>
  );
}