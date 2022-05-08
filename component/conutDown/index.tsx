import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import style from './CountDown.module.scss'

interface IProps {
  time: number;
  onEnd: Function;
}
const CountDown: NextPage<IProps> = ({ time, onEnd }) => {
  const [count, setCount] = useState(time || 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => {
        if (count === 0) {
          clearInterval(interval);
          onEnd && onEnd();
          return count;
        }
        return count - 0.5;
      });
      return () => {
        clearInterval(interval);
      };
    }, 1000);
  }, [time, onEnd]);
  return <div className={style['count-down']}>{count}</div>;
};

export default CountDown;
