import { Button } from '@material-tailwind/react';
import React from 'react';

const Contact = () => {
    return (
        <section className=' md:w-3/6 h-1/2 mt-10' id='contact'>
            <p className='text-2xl'>Contact</p>
            <form className="w-full h-full flex flex-col items-center justify-center bg-inherit bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-lg" action='https://formspree.io/f/xgegpyra' method='POST'>
                <div className='w-full flex flex-col md:flex-row items-center justify-around gap-4'>
                    <label htmlFor="name" className='-mt-4'>Name:</label>
                    <input type="text" id="name" name="name" className="bg-transparent border-2  rounded-md border-gray-500 focus:border-teal-500 outline-none mb-4" />

                    <label htmlFor="email" className='-mt-4'>Email:</label>
                    <input type="email" id="email" name="email" className="bg-transparent border-2 rounded-md border-gray-500 focus:border-teal-500 outline-none mb-4" />
                </div>
                <div className='w-full'>
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows="4" className="w-full bg-transparent border-2 rounded-md border-gray-500 focus:border-teal-500 outline-none mb-4" />
                </div>
                <div className='w-full flex flex-row items-center justify-end'>
                    <Button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Send</Button>

                </div>
            </form>
        </section>
    );
};

export default Contact;
