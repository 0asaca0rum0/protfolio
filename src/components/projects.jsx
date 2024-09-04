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
            description: "A comprehensive dashboard for managing an e-commerce platform, was meant for fri7a, a local shop  in algeria.",
            image: "project-1.webp",
            techstack: ['Next 13 ', "Node.js", "Express "],
            link: "",
            category: "Web App",
        },
        {
            title: "E-commerce (fri7a) ",
            description: "A comprehensive website  for an e-commerce platform, was meant for fri7a, a local shop  in algeria, the website has a feature for uploading short videos of the products or any other content.",
            image: "fri7a.png",
            techstack: ['Next 13 ', "Node.js", "Express "],
            link: "fri7a.pages.dev",
            category: "Web App",
        },
        {
            title: "E-commerce (bilwafi) ",
            description: "A responsive e-commerce website for selling products online, was intended for bilwafi, a local cosmetic shop in algeria, the website is integrated with a payment gateway and a dashboard for managing the products.",
            image: "project-3.webp",
            techstack: ['Next 13 ', "nodejs", "Express "],
            link: "",
            category: "Web App",
        },
        {
            title: "Student Attendance System",
            description: "A system for tracking student attendance using Qr codes and a mobile app, developed for the bachelor's project,at the university of ahmed draia, adrar, algeria.",
            image: "project-2.webp",
            techstack: ["React ", "Node.js", "Express ", 'MongoDB '],
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
        { label: "Websites", value: "Web App" },
        { label: "Mobile", value: "Mobile App" },
        { label: "Desktop", value: "Desktop App" },
        { label: "AI", value: "AI" },
    ];

    const [activeTab, setActiveTab] = useState("Web App");
    const [bgColor, setBgColor] = useState("white");
    const checkDarkMode = () => {
        const bgColor = window.getComputedStyle(document.documentElement).getPropertyValue('color');
        if (bgColor === 'rgb(51, 51, 51)') {
            return true;
        } else if (bgColor === 'rgb(255, 255, 255)') {
            return false;
        }
    };

    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        new MutationObserver(() => {
            !checkDarkMode() ? console.log('dark') : console.log('light');
            setIsDarkMode(!checkDarkMode());
        }).observe(document.documentElement, { attributes: true });
    }, []);

    return (
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value)} >
            <TabsHeader
                className="h-full w-full   rounded-2xl px-5 py-2 md:p-2 m-4 bg-gray-600 bg-opacity-15   backdrop-blur-lg backdrop-filter max-w-full min-w-full mx-auto"
                indicatorProps={{
                    className: "bg-white  bg-opacity-10 shadow-[0px_4px_12px_rgba(0,0,0,0.1),_0px_8px_32px_rgba(0,0,0,0.08),_inset_0px_1px_1px_rgba(255,255,255,0.2)]  py-3 -mx-1 md:mx-4  rounded-xl",
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
