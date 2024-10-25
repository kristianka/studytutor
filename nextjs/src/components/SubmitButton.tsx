"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./LoadingSpinner";

type Props = ComponentProps<"button"> & {
    pendingText?: string;
};

export function SubmitButton({ children, ...props }: Props) {
    const { pending, action } = useFormStatus();

    const isPending = pending && action === props.formAction;

    return (
        <Button {...props} type="submit" aria-disabled={pending}>
            {isPending ? <LoadingSpinner /> : children}
        </Button>
    );
}
