const Badge = ({ text }: { text: string }) => {
  return (
    <div className="px-6 py-1 bg-[#2325264F] rounded-md">
      {text}
    </div>
  );
};

export default Badge;