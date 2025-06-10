"use client"

import React, { useState } from "react"
import Image from "next/image"
import logo from "@/assets/logo.png"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import CreateJobForm from "@/components/createJob"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    return (
        <header className="w-full bg-white shadow-md md:w-fit md:mx-auto md:rounded-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between md:justify-center items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <Image src={logo} alt="Job Board Logo" className="h-10 w-10" />
                    </div>

                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="#" className="text-gray-900 hover:text-gray-700 text-md font-medium">
                            Home
                        </Link>
                        <Link href="#" className="text-gray-900 hover:text-gray-700 text-md font-medium">
                            Find Jobs
                        </Link>
                        <Link href="#" className="text-gray-900 hover:text-gray-700 text-md font-medium">
                            Find Talents
                        </Link>
                        <Link href="#" className="text-gray-900 hover:text-gray-700 text-md font-medium">
                            About us
                        </Link>
                        <Link href="#" className="text-gray-900 hover:text-gray-700 text-md font-medium">
                            Testimonials
                        </Link>
                    </nav>
                    <div className="hidden md:block">
                        <Dialog>
                            <DialogTrigger>
                                <Button className="bg-gradient-to-b from-[#A128FF] to-[#6100AD] text-md text-white px-4 py-2 cursor-pointer rounded-full">
                                    Create Jobs
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-[90vw] max-w-3xl h-fit">
                                <div className="text-center mb-4">
                                    <h1 className="text-2xl font-bold text-gray-900">Create Job Opening</h1>
                                </div>
                                <CreateJobForm />
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="md:hidden">
                        <button onClick={toggleMobileMenu}>
                            {mobileMenuOpen ? <X className="h-6 w-6 text-gray-900" /> : <Menu className="h-6 w-6 text-gray-900" />}
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 space-y-6 absolute top-16 right-0 w-full z-20 p-5 pb-7 bg-white shadow-md">
                        <Link href="#" className="block text-gray-900 hover:text-gray-700 font-medium">
                            Home
                        </Link>
                        <Link href="#" className="block text-gray-900 hover:text-gray-700 font-medium">
                            Find Jobs
                        </Link>
                        <Link href="#" className="block text-gray-900 hover:text-gray-700 font-medium">
                            Find Talents
                        </Link>
                        <Link href="#" className="block text-gray-900 hover:text-gray-700 font-medium">
                            About us
                        </Link>
                        <Link href="#" className="block text-gray-900 hover:text-gray-700 font-medium">
                            Testimonials
                        </Link>

                        <Dialog>
                            <DialogTrigger>
                                <Button className="w-full bg-gradient-to-b from-[#A128FF] to-[#6100AD] text-white px-4 py-2 rounded-full">
                                    Create Jobs
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="h-screen md:h-fit  md:w-[90vw] w-full max-w-3xl overflow-auto">
                                <div className="text-center mb-0 md:mb-4">
                                    <h1 className="text-2xl font-bold text-gray-900">Create Job Opening</h1>
                                </div>
                                <CreateJobForm />
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar
