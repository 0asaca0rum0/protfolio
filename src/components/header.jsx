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
        <header id="top" className={`md:w-8/12 w-11/12 fixed top-0  z-50 h-16 mx-2 flex flex-row items-center justify-between my-2 px-10 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] ${!islight ? "bg-black " : " bg-white "} bg-opacity-10 backdrop-filter backdrop-blur-md md:backdrop-blur-lg border border-white border-opacity-10  rounded-full`}>
            <img
                src={`${isChecked ? "crow2.webp " : "crow-removebg.webp"}`}
                alt=""
                className="h-14 w-14 hover:scale-110 transition-transform duration-300"
                href="#"
            />
            <nav className="w-1/2 hidden lg:block">
                <ul className="flex flex-row items-center justify-between gap-2 w-full ">
                    <li className="flex flex-row gap-2 items-center hover:text-teal-400 hover:scale-105 transition-all duration-300 cursor-pointer " onClick={() => { scroll('top') }}>
                        <div className="flex flex-row gap-2 items-center">
                            <FaHome size={"20"} />
                            Home 
                       </div>
                    </li>
                    <li className="flex flex-row gap-2 items-center hover:text-teal-400 hover:scale-105 transition-all duration-300 cursor-pointer" onClick={() => { scroll('tech') }}>
                        <div className="flex flex-row gap-2 items-center" >
                            <FaReact className="motion-safe:animate-spin-slow" size={"20"} />
                            tech
                        </div>
                    </li>
                    <li className="flex flex-row gap-2 items-center hover:text-teal-400 hover:scale-105 transition-all duration-300 cursor-pointer" onClick={() => { scroll('project') }}>
                        <div className="flex flex-row gap-2 items-center">
                            <FaServer  />
                            Projects
                        </div>
                    </li>
                    <li className="flex flex-row gap-2 items-center hover:text-teal-400 hover:scale-105 transition-all duration-300 cursor-pointer" onClick={() => { scroll('contact') }}>
                        <div className="flex flex-row gap-2 items-center">
                            <BiMailSend size={"20"} />
                            Contact
                        </div>
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
                    <span className="slider" id="slider"></span>
                </label>
                <div className="lg:hidden flex flex-row items-center justify-center">
                    <Menu >
                        <MenuHandler  >
                            <Button className={`${isChecked ? "text-black bg-white bg-opacity-10 shadow z-50    backdrop-blur-lg backdrop-filter" :"text-white bg-gray-500 bg-opacity-5  shadow backdrop-blur-lg backdrop-filter"}`} >
                                <RxHamburgerMenu size={"25"}  />
                            </Button>
                        </MenuHandler>
                        <MenuList className=" my-5 p-4  w-1/3 h-1/4 flex flex-col justify-around items-center bg-gray-400 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-500" >
                            <MenuItem className="flex gap-2 hover:bg-white text-teal-400 transition-all delay-100 flex-row justify-evenly items-center" onClick={() => { scroll('top') }}>
                                <FaHome size={"20"} />
                                Home
                            </MenuItem>
                            <MenuItem className="flex gap-2 flex-row  justify-evenly items-center text-teal-400 hover:scale-105 transition-all duration-300" onClick={() => { scroll('tech') }}>
                                <FaReact className="motion-safe:animate-spin-slow" size={"20"} />
                                tech
                            </MenuItem>
                            <MenuItem className="flex gap-2 flex-row justify-evenly items-center text-teal-400 hover:scale-105 transition-all duration-300" onClick={() => { scroll('project') }}>
                                <FaServer className="" />
                                Projects
                            </MenuItem>
                            <MenuItem className="flex gap-2 flex-row justify-evenly items-center text-teal-400 hover:scale-105 transition-all duration-300" onClick={() => { scroll('contact') }}>
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