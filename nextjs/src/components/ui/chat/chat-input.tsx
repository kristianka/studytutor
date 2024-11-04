import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ChatInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    onSend: () => void;
}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
    ({ className, onSend, ...props }, ref) => (
        <div className="flex items-center space-x-2">
            <Textarea
                autoComplete="off"
                ref={ref}
                name="message"
                className={cn(
                    "max-h-12 flex-1 border-2 border-gray-600 bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:border-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    className
                )}
                {...props}
            />
            <Button onClick={onSend} className="bg-blue-500 text-white">
                Send
            </Button>
        </div>
    )
);
ChatInput.displayName = "ChatInput";

export { ChatInput };
