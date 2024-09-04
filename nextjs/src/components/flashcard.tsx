"use client";
import { useState } from "react";

export default function FlashCard() {
    const [isFlipped, setIsFlipped] = useState(false);

    console.log("client");

    return (
        <div>
            <p>hello world from flashcard</p>
        </div>
    );
}
