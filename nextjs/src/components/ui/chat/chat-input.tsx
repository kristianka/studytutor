import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
    ({ className, ...props }, ref) => (
        <Textarea
            autoComplete="off"
            ref={ref}
            name="message"
            className={cn(
                "max-h-12 border-2 border-gray-600 bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:border-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                className
            )}
            {...props}
        />
    )
);
ChatInput.displayName = "ChatInput";

export { ChatInput };
