import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import Card from "./card";
import { useEffect, useState } from "react";

export default function Projects() {
    const projects = [
        {
            title: "E-commerce Dashboard",
            description: "A comprehensive dashboard for managing an e-commerce platform, was ment for frih7a, a local shop  in algeria.",
            image: "project-1.webp",
            techstack: ['Next 13 ', "nodejs", "express "],
            link: "",
            category: "Web App",
        },
        {
            title: "E-commerce website",
            description: "A responsive e-commerce website for selling products online, was intended for bilwafi, a local cosmetic shop in algeria, the website is integrated with a payment gateway and a dashboard for managing the products.",
            image: "project-3.webp",
            techstack: ['Next 13 ', "nodejs", "express "],
            link: "",
            category: "Web App",
        },
        {
            title: "Student Attendance System",
            description: "A system for tracking student attendance using Qr codes and a mobile app, developed for the bachelor's project,at the university of ahmed draia, adrar, algeria.",
            image: "project-2.webp",
            techstack: ["React ", "nodejs", "express ", 'mongodb '],
            link: "https://qr-attend.netlify.app/",
            category: "Web App",
        },
        {
            title: "Faculty Website",
            description: "A responsive faculty website for displaying academic resources and information, was intended for the faculty of matierals science and computer science and mathimatics at the university of ahmed draia, adrar, algeria.",
            image: "project-4.webp",
            techstack: ['Next 13 ', 'Tailwind CSS '],
            link: "",
            category: "Web App",
        },
        {
            title: "7awasli App",
            description: "a mobile app for connecting people with local services and freelance workers, like plumbers, electricians, etc , it uses the user's location to show the nearest service provider.",
            image: "7awasli.webp",
            techstack: ["React Native ", "Expo"],
            link: "",
            category: "Mobile App",
        },
        {
            title: "library System",
            description: "A library manegment system  with a sleek UI, the system allows the admin to add, delete, and update booksand users , and also to search for books by title or author.",
            image: "library.jpg",
            techstack: ["java", 'mysql'],
            link: "",
            category: "Desktop App",
        },
        {
            title: "digit recognition app",
            description: "A desktop application for recognition of hand writting digits using a neural network, the digits are drawn on a canvas and the app predicts the digit.",
            image: "digits.png",
            techstack: ["Custom tkinter", "Python", "AI"],
            link: "",
            category: "AI",
        },
        {
            title: "digit recognition app",
            description: "A desktop application for recognition of hand writting digits using a neural network, the digits are drawn on a canvas and the app predicts the digit.",
            image: "digits.png",
            techstack: ["Custom tkinter", "Python", "AI"],
            link: "",
            category: "Desktop App",
        },
    ];

    const categories = [
        { label: "Web App", value: "Web App" },
        { label: "Mobile App", value: "Mobile App" },
        { label: "Desktop App", value: "Desktop App" },
        { label: "AI", value: "AI" },
    ];

    const [activeTab, setActiveTab] = useState("Web App");
    const [bgColor, setBgColor] = useState("white");

    const handleBgColorChange = () => {
        const bgColor = window.getComputedStyle(document.documentElement).getPropertyValue('background-color').toString();
        setBgColor(bgColor === "rgb(0, 0, 0)" ? "black" : "white");
    };

    useEffect(() => {
        const slider = document.getElementById("slider");
        slider?.addEventListener('click', handleBgColorChange);
        return () => slider?.removeEventListener('click', handleBgColorChange);
    }, []);

    return (
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value)} >
            <TabsHeader
                className="h-full w-full rounded-lg p-2 m-2 bg-gray-700/20 backdrop-blur-md backdrop-filter max-w-full min-w-full mx-auto"
                indicatorProps={{
                    className: "bg-white/20 py-3 mx-2  rounded-xl",
                }}
                id="project"
            >
                {categories.map(({ label, value }) => (
                    <Tab
                        key={value}
                        value={value}
                        className={`${activeTab === value ? `text-${bgColor}` : ` text-${bgColor}/35 font-normal`
                            }`}
                        onClick={() => setActiveTab(value)}
                    >
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody
                animate={{
                    initial: { y: 200 },
                    mount: { y: 0 },
                    unmount: { y: 200 },
                }}
            >
                {categories.map(({ value }) => (
                    <TabPanel
                        key={value}
                        value={value}
                        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 "
                    >
                        {projects
                            .filter((project) => project.category === value)
                            .map((project, index) => (
                                <Card project={project} key={`${value}-${index}`} />
                            ))}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}
