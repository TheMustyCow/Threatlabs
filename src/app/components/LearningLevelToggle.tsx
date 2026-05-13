import { learningLevelConfig, useLearningLevel } from '../learningLevel';

export function LearningLevelToggle() {
  const { level, label, cycleLevel } = useLearningLevel();
  const nextLabel =
    level === 'kids'
      ? learningLevelConfig.entry.label
      : level === 'entry'
        ? learningLevelConfig.enthusiast.label
        : learningLevelConfig.kids.label;

  return (
    <button
      className="learning-level-toggle"
      data-level={level}
      type="button"
      aria-label={`Change learning level. Current level is ${label}. Next level is ${nextLabel}.`}
      onClick={cycleLevel}
    >
      <span aria-hidden="true" />
      {label}
    </button>
  );
}
