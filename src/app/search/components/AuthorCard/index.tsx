'use client';
import type { User } from '@/schemas/user';
import getAvatarSrc from '@/utils/getAvatarSrc';
import styles from './index.module.scss';

type Props = {
  user: User; // 注意這裡改為接收 user 而不是 article
};

export default function AuthorCard({ user }: Props) {
  return (
    <div className={styles.authorCard}>
      <div className={styles.authorInfo}>
        <img
          src={getAvatarSrc(user.id)}
          alt="avatar"
          className={styles.avatar}
        />
        <span className={styles.authorName}>{user.displayName}</span>
      </div>
      <hr className={styles.bottomDivider} />
    </div>
  );
}