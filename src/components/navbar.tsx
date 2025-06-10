import React from 'react'
import Image from "next/image"
import logo from "@/assets/logo.png"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import CreateJobForm from "@/components/createJob"
import { Button } from './ui/button'

function Navbar() {
    return (
        <header className="py-5 bg-white shadow-sm w-fit mx-auto rounded-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex justify-center items-center space-x-5">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Image src={logo} alt="Job Board Logo" className="h-10 w-9" />
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-4">
                        <Link href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 text-md font-medium">
                            Home
                        </Link>
                        <Link href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 text-md font-medium">
                            Find Jobs
                        </Link>
                        <Link href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 text-md font-medium">
                            Find Talents
                        </Link>
                        <Link href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 text-md font-medium">
                            About us
                        </Link>
                        <Link href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 text-md font-medium">
                            Testimonials
                        </Link>
                    </nav>

                    {/* Create Jobs Button */}
                    <Dialog>
                        <DialogTrigger>
                            <Button
                                size="text"
                                className="bg-gradient-to-b from-[#A128FF] to-[#6100AD] text-md text-white px-4 py-2 cursor-pointer rounded-full"
                            >
                                Create Jobs
                            </Button>

                        </DialogTrigger>
                        <DialogContent className="w-[60vw] h-fit" >
                            {/* Header */}
                            <div className="text-center">
                                <h1 className="text-2xl font-bold text-gray-900">Create Job Opening</h1>
                            </div>
                            <CreateJobForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </header>
    )
}

export default Navbar
