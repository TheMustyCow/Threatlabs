import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export const learningLevels = ['kids', 'entry', 'enthusiast'] as const;

export type LearningLevel = (typeof learningLevels)[number];

export const learningLevelConfig: Record<LearningLevel, { label: string; description: string }> = {
  kids: {
    label: 'Kids',
    description: 'Simple explanations with gentle prompts.',
  },
  entry: {
    label: 'Entry',
    description: 'Beginner-friendly practical guidance.',
  },
  enthusiast: {
    label: 'Enthusiast',
    description: 'More technical detail and harder scenarios.',
  },
};

const storageKey = 'threatlabs-learning-level';

type LearningLevelContextValue = {
  level: LearningLevel;
  label: string;
  cycleLevel: () => void;
  setLevel: (level: LearningLevel) => void;
};

const LearningLevelContext = createContext<LearningLevelContextValue | null>(null);

function isLearningLevel(value: string | null): value is LearningLevel {
  return learningLevels.includes(value as LearningLevel);
}

function getInitialLearningLevel(): LearningLevel {
  if (typeof window === 'undefined') {
    return 'entry';
  }

  const savedLevel = window.localStorage.getItem(storageKey);
  return isLearningLevel(savedLevel) ? savedLevel : 'entry';
}

export function LearningLevelProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState<LearningLevel>(getInitialLearningLevel);

  useEffect(() => {
    document.documentElement.dataset.learningLevel = level;
    window.localStorage.setItem(storageKey, level);
  }, [level]);

  const value = useMemo<LearningLevelContextValue>(
    () => ({
      level,
      label: learningLevelConfig[level].label,
      setLevel,
      cycleLevel: () => {
        setLevel((currentLevel) => {
          const nextIndex = (learningLevels.indexOf(currentLevel) + 1) % learningLevels.length;
          return learningLevels[nextIndex];
        });
      },
    }),
    [level],
  );

  return <LearningLevelContext.Provider value={value}>{children}</LearningLevelContext.Provider>;
}

export function useLearningLevel() {
  const value = useContext(LearningLevelContext);

  if (!value) {
    throw new Error('useLearningLevel must be used within LearningLevelProvider');
  }

  return value;
}
