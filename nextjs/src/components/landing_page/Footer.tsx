import React from "react";
import { Container } from "@/components/ui/Container";

export function Footer() {
    return (
        <div className="relative">
            <Container>
                <div className="my-10 text-center text-sm text-gray-600 dark:text-gray-400">
                    Copyright © {new Date().getFullYear()}
                </div>
            </Container>
            {/* Do not remove this */}
        </div>
    );
}
