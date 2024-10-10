"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { deleteCard } from "@/lib/card";
import { useSWRConfig } from "swr";

interface DeleteCardProps {
    setShowDelete: (show: boolean) => void;
    showDelete: boolean;
    userId: string;
    cardId: string;
}

export default function DeleteCard({ setShowDelete, showDelete, userId, cardId }: DeleteCardProps) {
    const { mutate } = useSWRConfig();
    const body = { userId, cardId };
    const deleteCardHistory = async () => {
        const res = await deleteCard({ body });
        // revalidate the data
        if (res) {
            await mutate(`/api/history/`);
            setShowDelete(false);
        }
    };

    const handleCancel = () => {
        setShowDelete(false);
    };

    return (
        <AlertDialog open={showDelete}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deleting flash card</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the flash card
                        and its progress.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteCardHistory} className="bg-red-600">
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
