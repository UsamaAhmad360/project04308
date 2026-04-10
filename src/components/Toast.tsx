import { useEffect, useRef } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
}

export default function Toast({ message, visible }: ToastProps) {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toastRef.current) return;
    if (visible) {
      toastRef.current.style.transform = 'translateY(0)';
      toastRef.current.style.opacity = '1';
    } else {
      toastRef.current.style.transform = 'translateY(24px)';
      toastRef.current.style.opacity = '0';
    }
  }, [visible]);

  return (
    <div
      ref={toastRef}
      className="fixed bottom-24 right-6 bg-[#00F0FF] text-[#002022] font-['Inter'] text-xs font-bold py-3 px-6 rounded shadow-[0_0_20px_rgba(0,240,255,0.4)] tracking-widest uppercase transform translate-y-24 opacity-0 transition-all z-50 duration-300"
    >
      {message}
    </div>
  );
}
