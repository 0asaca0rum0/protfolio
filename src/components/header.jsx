import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaServer } from "react-icons/fa6";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";

const Header = ({ islight }) => {
    const [isChecked, setIsChecked] = useState(islight);

    useEffect(() => {
        document.documentElement.style.backgroundColor = isChecked
            ? "white"
            : "black";
        document.documentElement.style.color = !isChecked ? "#fff" : "#333";
    }, [isChecked]);

    const handleSwitchChange = () => {
        setIsChecked(!isChecked);
        document.documentElement.style.backgroundColor = isChecked
            ? "white"
            : "black";
        document.documentElement.style.transition =
            "background-color 0.5s ease-in-out";
        document.documentElement.style.color = !isChecked ? "#fff" : "#333";
    };


    const scroll = (id) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({
            behavior: "smooth",

        });
    }
    return (
        <header id="top" className="md:w-8/12 w-11/12 fixed top-0  z-50 h-16 mx-2 flex flex-row items-center justify-between my-2 px-10 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] bg-inherit  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 rounded-full border border-gray-600 ">
            <img
                src={`${isChecked ? "crow2.webp " : "crow-removebg.webp"}`}
                alt=""
                className="h-14 w-14 hover:scale-110 transition-transform duration-300"
                href="#"
            />
            <nav className="w-1/2 hidden lg:block">
                <ul className="flex flex-row items-center justify-between gap-2 w-full ">
                    <li className="flex flex-row gap-2 items-center hover:text-teal-400 hover:scale-105 transition-all duration-300">
                        <FaHome size={"20"} />
                        <a onClick={() =>{scroll('top')}}>Home</a>
                    </li>
                    <li className="flex flex-row gap-2 items-center hover:text-teal-400 hover:scale-105 transition-all duration-300">
                        <FaReact className="motion-safe:animate-spin-slow" size={"20"} />
                        <a onClick={() =>{scroll('tech')}}>tech</a>
                    </li>
                    <li className="flex flex-row gap-2 items-center hover:text-teal-400 hover:scale-105 transition-all duration-300">
                        <FaServer className="" />
                        <a onClick={() =>{scroll('project')}}>Projects</a>
                    </li>
                    <li className="flex flex-row gap-2 items-center hover:text-teal-400 hover:scale-105 transition-all duration-300">
                        <BiMailSend size={"20"} />
                        <a onClick={() =>{scroll('contact')}}>Contact</a>
                    </li>
                </ul>
            </nav>
            <div className="h-full flex flex-row items-center  gap-4 ">
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleSwitchChange}
                        className="hidden"
                    />
                    <span className="slider"></span>
                </label>
                <div className="lg:hidden flex flex-row items-center justify-center">
                    <Menu >
                        <MenuHandler  >
                            <Button className=" ">
                                <RxHamburgerMenu size={"25"} />
                            </Button>
                        </MenuHandler>
                        <MenuList className=" my-5 p-4  w-1/3 h-1/4 flex flex-col justify-around items-center bg-gray-400 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-500">
                            <MenuItem className="flex gap-2 hover:bg-white hover:text-black transition-all delay-100 flex-row justify-evenly items-center">
                                <FaHome size={"20"} />
                                Home
                            </MenuItem>
                            <MenuItem className="flex gap-2 flex-row justify-evenly items-center hover:text-teal-400 hover:scale-105 transition-all duration-300">
                                <FaReact className="motion-safe:animate-spin-slow" size={"20"} />
                                tech
                            </MenuItem>
                            <MenuItem className="flex gap-2 flex-row justify-evenly items-center hover:text-teal-400 hover:scale-105 transition-all duration-300">
                                <FaServer className="" />
                                Projects
                            </MenuItem>
                            <MenuItem className="flex gap-2 flex-row justify-evenly items-center hover:text-teal-400 hover:scale-105 transition-all duration-300">
                                <BiMailSend size={"20"} />
                                Contact
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>
        </header>
    );
};

export default Header;