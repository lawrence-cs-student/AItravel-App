export default function GlassLoader() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-12 h-12 border-4 border-[#EBECF1] border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-[#EBECF1] font-medium text-center">
        Fetching tourist spots...
      </p>
    </div>
  );
}
