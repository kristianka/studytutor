"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { deleteCard } from "@/lib/card";
import { useSWRConfig } from "swr";

interface DeleteCardProps {
    userId: string;
    cardId: string;
}

export default function DeleteCard({ userId, cardId }: DeleteCardProps) {
    const { mutate } = useSWRConfig();
    const body = { userId, cardId };
    const deleteCardHistory = async () => {
        const res = await deleteCard({ body });
        // revalidate the data
        if (res) {
            await mutate(`/api/history/`);
            console.log("Card deleted");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className="text-xs text-gray-600 hover:text-gray-400">
                Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deleting flash card</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the flash card
                        and its progress.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteCardHistory} className="bg-red-600">
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
