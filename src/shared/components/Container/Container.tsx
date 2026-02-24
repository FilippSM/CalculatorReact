import type { ReactNode } from 'react'; // Добавляем type-only import
import styles from "./Container.module.css";
import clsx from 'clsx';

interface ContainerProps {
  children?: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => (
  <div className={clsx(styles.container, className)}>{children}</div>
);