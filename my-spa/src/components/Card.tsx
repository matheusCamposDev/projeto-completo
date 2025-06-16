// src/components/Card.tsx
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  title: string;
  to: string;
}

export const Card: FC<CardProps> = ({ title, to }) => {
  const navigate = useNavigate();

  return (
    <div className={`w-[250px] h-[250px] rounded-xl p-2 flex flex-col justify-center items-center bg-[#D9D4A0] shadow-md`}>
      <span className="text-center text-3xl font-medium">{title}</span>
      <button
        className="text-base mt-2 bg-black text-white rounded px-3 py-1 hover:bg-red-600 transition cursor-pointer"
        onClick={() => navigate(to)}
      >
        Avançar
      </button>
    </div>
  );
};
