import {
    UserIcon,
    BoltIcon,
    ClockIcon,
    LightBulbIcon,
    Square3Stack3DIcon,
    ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";

import studyImg from "../../../public/img/study.png";
import chatImg from "../../../public/img/chatbot.png";

const benefitData = {
    title: "Benefits",
    desc: "",
    image: studyImg,
    bullets: [
        {
            title: "Personalized Learning",
            desc: "Tailored questions and feedback to match your learning pace.",
            icon: <UserIcon />
        },
        {
            title: "Instant Feedback",
            desc: "Get immediate responses to your answers, helping you learn and improve faster.",
            icon: <BoltIcon />
        },
        {
            title: "24/7 Availability",
            desc: "Study anytime, anywhere with your AI companion.",
            icon: <ClockIcon />
        },
        {
            title: "Enhanced Understanding",
            desc: "Deepen your knowledge with detailed explanations and insights.",
            icon: <LightBulbIcon />
        }
    ]
};

const featureData = {
    title: "Features",
    desc: "",
    image: chatImg,
    bullets: [
        {
            title: "Flash Cards",
            desc: "Create and study flash cards on any topic. The AI generates questions to help reinforce your learning.",
            icon: <Square3Stack3DIcon />
        },
        {
            title: "Chatbot Assistance",
            desc: "Ask anything about your studies and get instant, accurate answers from the AI.",
            icon: <ChatBubbleLeftRightIcon />
        }
    ]
};

export { benefitData, featureData };
