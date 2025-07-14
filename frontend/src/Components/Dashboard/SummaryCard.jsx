const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="flex bg-white rounded-md shadow-md min-w-[220px] max-w-full h-24 overflow-hidden">
      {/* Icon block */}
      <div className={`w-20 h-full flex items-center justify-center ${color}`}>
        <div className="text-white text-2xl">
          {icon}
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col justify-center px-4">
        <p className="text-sm font-medium text-gray-600">{text}</p>
        <p className="text-xl font-bold text-gray-900">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
