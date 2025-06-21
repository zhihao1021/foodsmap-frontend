import { useState, useImperativeHandle, forwardRef } from 'react';
import styles from './index.module.scss';

export interface SearchFormRef {
  setSearchTerm: (value: string) => void;
}

interface SearchFormProps {
  onSubmit: (value: string) => void;
  onClear: () => void;
}

const SearchForm = forwardRef<SearchFormRef, SearchFormProps>(({ onSubmit, onClear }, ref) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      console.log('輸入框已清空');
      onClear();
    }
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSubmit(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit(searchTerm);
      e.preventDefault(); // Prevent default form submission behavior (if it were in a <form> tag)
    }
  };

  // 提供外部可控制 input 的方法
  useImperativeHandle(ref, () => ({
    setSearchTerm: (value: string) => setSearchTerm(value),
  }));

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="輸入關鍵字"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={styles.searchInput}
      />
      <button onClick={handleSearchClick} className={styles.searchButton}>
        🔍
      </button>
    </div>
  );
});

export default SearchForm;
