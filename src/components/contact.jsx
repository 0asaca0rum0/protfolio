import React from 'react';
import { Button } from '@material-tailwind/react';

const Contact = () => {
    return (
        <section className='w-full max-w-4xl mx-auto mt-20 px-4' id='contact'>
            <h2 className='text-3xl font-bold mb-8 text-center text-gray-200'>Contact Me</h2>
            <form
                className="w-full flex flex-col gap-6 bg-gray-900 bg-opacity-10 backdrop-filter backdrop-blur md:backdrop-blur-md p-8 rounded-xl shadow-2xl border border-gray-700/30"
                action='https://formspree.io/f/xgegpyra'
                method='POST'
            >
                <div className='grid md:grid-cols-2 gap-6'>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='mb-2 text-gray-300'>Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="bg-gray-800 bg-opacity-20 border border-gray-600 text-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="email" className='mb-2 text-gray-300'>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="bg-gray-800 bg-opacity-20 border border-gray-600 text-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                            required
                        />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="message" className='mb-2 text-gray-300'>Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        className="bg-gray-800 bg-opacity-30 border border-gray-600 text-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                        required
                    />
                </div>
                <div className='flex justify-end mt-4'>
                    <Button
                        type="submit"
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-md transition duration-200 shadow-lg hover:shadow-xl"
                    >
                        Send Message
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default Contact;