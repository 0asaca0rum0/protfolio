import React from 'react';
import Card from './card';

const projects = [
    {
        id: 1,
        title: 'E-commerce Dashboard',
        description: 'An essential tool for online businesses, the Ecommerce Dashboard offers real-time sales tracking, inventory management, customer analytics, and marketing campaign monitoring in a user-friendly interface.',
        imageUrl: 'project-1.webp',
        techstack: ['Next 13 ' , 'tailwindcss ', 'nodejs ', 'express ', 'mongodb ', 'nginx ', 'linux '],
        link: null
    },
    {
        id: 2,
        title: 'student attendance system',
        description: 'The Student Attendance System is a web-app application designed to simplify tracking student attendance. It offers a user-friendly interface for teachers to record attendance and for administrators to monitor records. Key features include automated attendance recording, detailed reports, notifications in the students app and much more.',
        techstack: ['React ', 'Tailwind CSS ','vite ','nodejs','express','flutter '],
        imageUrl: '/project-2.webp',
        link: 'https://students-attendance.vercel.app/'
    },
    {
        id: 3,
        title: 'Ecommerce website',
        description: 'An online platform for seamless shopping, the Ecommerce Website offers a variety of products, secure payments, and efficient order processing. It features user-friendly browsing, a shopping cart, secure payments, order tracking, and customer support, making it a valuable tool for expanding businesses online.',
        techstack: ['Next 13 ', 'Tailwind CSS ', 'nodejs', 'express '],
        imageUrl: '/project-3.webp',
        link: 'https://bilwafi.shop/'
    },
    {
        id: 3,
        title: 'faculty website',
        description: 'An online platform for seamless shopping, the Ecommerce Website offers a variety of products, secure payments, and efficient order processing. It features user-friendly browsing, a shopping cart, secure payments, order tracking, and customer support, making it a valuable tool for expanding businesses online.',
        techstack: ['Next 13 ', 'Tailwind CSS ', 'nodejs', 'express '],
        imageUrl: '/project-4.webp',
        link: null
    },
    // Add more projects here
];

const Projects = () => {
    return (
                <div className='w-full h-full flex flex-col items-center justify-center'>
            <div className='text-xl md:text-2xl p-2 text-center flex flex-row items-center justify-center font-mono font-extralight  w-full'>  <p className=' bg-opacity-80 backdrop-filter backdrop-blur-lg bg-inherit rounded-lg shadow-lg w-fit p-4'> the projects i worked on this days  </p> </div>
            <div className='text-lg md:text-xl p-2 text-center flex flex-row items-center justify-center font-mono font-extralight text-neutral-500  w-full'>  <p className=' bg-opacity-80 backdrop-filter backdrop-blur-lg bg-inherit rounded-lg shadow-lg w-fit p-4'> request one if you like  </p> </div>
            <br className='h-1  w-24 ' color='white'/>

            <div id='project' className="w-11/12 md:w-full p-2 lg:w-10/12 xl:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5  md:gap-3">

                {projects.map((project, index) => (
                    <Card project={project} key={index} />
                ))}
                <div className={`max-w-md  row-span-12 border border-gray-700 md:row-span-1 min-w-60 flex flex-col items-center justify-center w-full overflow-hidden bg-opacity-80 backdrop-filter backdrop-blur-lg bg-inherit rounded-lg shadow-lg `}>
                    <p className='text-4xl  -rotate-45 font-mono'> coming soon </p>

                </div>
            </div>
                </div>
    );
};

export default Projects;
