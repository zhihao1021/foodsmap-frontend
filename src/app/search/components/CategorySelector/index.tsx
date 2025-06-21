// components/CategorySelector.tsx
import React from 'react';
import styles from './index.module.scss';

interface CategorySelectorProps {
  selected: string;
  onSelect: (category: string) => void;
}

const categories = ['推薦', 'Tags', '作者'];

export default function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  return (
    <div className={styles.selectorContainer}>
      {categories.map((category) => (
        <button
          key={category}
          className={`${styles.selectorButton} ${selected === category ? styles.active : ''}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
