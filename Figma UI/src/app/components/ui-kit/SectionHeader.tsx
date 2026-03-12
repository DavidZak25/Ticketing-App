interface SectionHeaderProps {
  title: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-white text-[17px]">{title}</h2>
      {action && (
        <button
          onClick={action.onClick}
          className="text-[#a855f7] text-[13px] hover:text-[#c084fc] transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
