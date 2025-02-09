export default function Spinner() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white/80 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#20284D] border-t-transparent"></div>
    </div>
  );
}
