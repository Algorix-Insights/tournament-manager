export default function ArrowButton({ children }: { children: string }) {
  return (
    <button
      className="flex h-9 items-center justify-between rounded-full bg-[#101827] py-1 pl-5 pr-1 text-[14px] text-white transition-transform hover:scale-[1.02] cursor-pointer"
      type="button"
    >
      
     <span className="flex-1 text-center font-medium">
    {children}
  </span>
      <span
        aria-hidden="true"
        className="flex size-7 items-center justify-center rounded-full bg-[#f4f1f8] text-[14px] text-[#101827] "
      >
        →
      </span>
    </button>
  );
}