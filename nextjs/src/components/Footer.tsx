import React from "react";
import { Container } from "@/components/landing_page/Container";

export function Footer() {
    return (
        <div className="relative mt-auto border-t-2 border-gray-100">
            <Container>
                <div className="my-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    Copyright © {new Date().getFullYear()}
                </div>
            </Container>
            {/* Do not remove this */}
        </div>
    );
}
