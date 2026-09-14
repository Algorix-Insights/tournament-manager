import Skeleton from "../../../core/ui/Skeleton";

interface SimpleCardProps {
    value: string;
    label: string;
    isLoading?: boolean;
}

export default function SimpleCard({ value, label, isLoading = false }: SimpleCardProps) {
    return (
        <div className="flex min-h-42.5 flex-col justify-between rounded-[18px] bg-[#eeeafa] p-5">
            <strong className="text-2xl tracking-[-0.04em]" aria-hidden={isLoading}>
                {isLoading ? <Skeleton className="h-8 w-24 rounded-lg " /> : value}
            </strong>
            <p className="max-w-60 text-[16px] leading-tight text-[#8f929b]">{label}</p>
        </div>
    );
}