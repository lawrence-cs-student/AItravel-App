export default function GlassLoader() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-[#1F4068]/10" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#1F4068] animate-spin" />
        <div className="absolute inset-2 rounded-full bg-[#1F4068]/10" />
      </div>
      <p className="text-[#1F4068]/70 text-sm font-semibold tracking-wide animate-pulse">
        Fetching tourist spots...
      </p>
    </div>
  );
}
