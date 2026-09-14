import ArrowButton from "@/core/ui/ArrowButton";

interface QuickActionCardProps {
  title: string;
  buttonText?: string;
  bgColor: string;
  textColor?: string;
  image: string;
  imageClassName?: string;
  onClick?: () => void;
}

export default function QuickActionCard({
  title,
  buttonText = "¡Vamos!",
  bgColor,
  textColor,
  image,
  imageClassName = "absolute -bottom-2 -right-3 h-42.5 w-42.5 object-contain sm:right-4",
  onClick,
}: QuickActionCardProps) {
  return (
    <article
      className={`relative min-h-42.5 rounded-[22px] p-6 sm:p-8 ${bgColor} ${textColor}`}
    >
      <div className="relative z-10 flex h-full max-w-46.25 flex-col justify-between gap-7">
        <h2 className="font-manrope-bold text-2xl leading-tight tracking-[-0.04em]">
          {title}
        </h2>
        <ArrowButton onClick={onClick}>{buttonText}</ArrowButton>
      </div>
      <img className={imageClassName} src={image} alt="" />
    </article>
  );
}