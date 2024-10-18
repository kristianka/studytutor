import { Skeleton } from "@/components/ui/skeleton";

export function HistorySkeleton() {
    return (
        <div className="flex items-center space-x-4">
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[150px]" />
            </div>
        </div>
    );
}
