import "./index.css";

interface SegmentedControlProps {
  currentTask: string;
  tabs: { label: string; value: string }[];
  handleTabChange: (tab: string) => void;
  name: string;
}

const SegmentedControl = ({
  currentTask,
  tabs,
  handleTabChange,
  name,
}: SegmentedControlProps): JSX.Element => {
  return (
    <div className="segmented-control inset-shadow-sm inset-shadow-gray-500/70 rounded-lg w-full sm:w-auto">
      {tabs.map((tab) => (
        <div
          key={tab?.value}
          className={`segment rounded-md p-[10px] w-full ${
            tab?.value === currentTask ? "active drop-shadow-md" : ""
          }`}
        >
          <input
            key={tab?.value}
            type="radio"
            id={tab?.value}
            name={name}
            onChange={() => handleTabChange(tab?.value)}
            checked={currentTask === tab?.value}
          />
          <label htmlFor={tab?.value}>{tab?.label}</label>
        </div>
      ))}
    </div>
  );
};

export default SegmentedControl;
