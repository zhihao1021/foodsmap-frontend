import styles from './index.module.scss';

interface SuggestionButtonsProps {
  suggestions: string[];
  onSuggestionClick: (word: string) => void;
}

export default function SuggestionButtons({ suggestions, onSuggestionClick }: SuggestionButtonsProps) {
  
  return (
    <div className={styles.suggestionContainer}>
      {suggestions.map((word, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(word)}
          className={styles.suggestionButton}
        >
          {word}
        </button>
      ))}
    </div>
  );
}
