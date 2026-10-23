import React from 'react';
import { PancaCintaValue } from '../../types';
import { Heart, BookOpen, Leaf, Users, Flag } from 'lucide-react';

interface PancaCintaBadgeProps {
  value: PancaCintaValue;
  size?: 'sm' | 'md';
}

export const PancaCintaBadge: React.FC<PancaCintaBadgeProps> = ({ value, size = 'sm' }) => {
  const config: Record<
    PancaCintaValue,
    { label: string; bg: string; text: string; border: string; icon: React.ReactNode }
  > = {
    'Cinta Allah dan Rasul-Nya': {
      label: 'Cinta Allah & Rasul',
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-300',
      icon: <Heart className="w-3 h-3 text-emerald-600 fill-emerald-600" />,
    },
    'Cinta Ilmu': {
      label: 'Cinta Ilmu',
      bg: 'bg-sky-50',
      text: 'text-sky-800',
      border: 'border-sky-300',
      icon: <BookOpen className="w-3 h-3 text-sky-600" />,
    },
    'Cinta Lingkungan': {
      label: 'Cinta Lingkungan',
      bg: 'bg-teal-50',
      text: 'text-teal-800',
      border: 'border-teal-300',
      icon: <Leaf className="w-3 h-3 text-teal-600" />,
    },
    'Cinta Diri dan Sesama Manusia': {
      label: 'Cinta Diri & Sesama',
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-300',
      icon: <Users className="w-3 h-3 text-amber-600" />,
    },
    'Cinta Tanah Air': {
      label: 'Cinta Tanah Air',
      bg: 'bg-rose-50',
      text: 'text-rose-800',
      border: 'border-rose-300',
      icon: <Flag className="w-3 h-3 text-rose-600" />,
    },
  };

  const item = config[value] || {
    label: value,
    bg: 'bg-slate-100',
    text: 'text-slate-800',
    border: 'border-slate-300',
    icon: <Heart className="w-3 h-3" />,
  };

  const sizeClass = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${item.bg} ${item.text} ${item.border} ${sizeClass}`}
      title={value}
    >
      {item.icon}
      {item.label}
    </span>
  );
};
