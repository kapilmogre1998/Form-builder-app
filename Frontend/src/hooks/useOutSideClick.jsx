import { useEffect } from 'react';

const useOutsideClick = (ref, callback) => {
  console.log("🚀 ~ useOutsideClick ~ ref:", ref)
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref]);
};

export default useOutsideClick;
