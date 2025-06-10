"use client"

import Navbar from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { jobsData } from "@/lib/data"
import { Briefcase, Building2, Layers, MapPin, Search, UserPlus } from "lucide-react"
import { useState } from "react"

import amazon from "@/assets/company_logo/amazon.png"
import tesla from "@/assets/company_logo/tesla.png"
import swiggy from "@/assets/company_logo/swiggy.png"
import Image from "next/image"


export default function JobBoard() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedLocation, setSelectedLocation] = useState("")
    const [selectedJobType, setSelectedJobType] = useState("")
    const [salaryRange, setSalaryRange] = useState([10, 40])

    const filteredJobs = jobsData.filter((job) => {
        const matchesSearch =
            searchTerm.trim() === "" ||
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesLocation =
            selectedLocation === "" || selectedLocation === "all" || job.location === selectedLocation

        const matchesJobType =
            selectedJobType === "" || selectedJobType === "all" || job.jobType === selectedJobType

        const matchesSalary =
            job.salaryRange >= salaryRange[0] && job.salaryRange <= salaryRange[1]

        return matchesSearch && matchesLocation && matchesJobType && matchesSalary
    })



    return (
        <div className="min-h-screen bg-white py-4">
            <Navbar />
            {/* Search and Filters */}
            <div className=" rounded-lg border-0 shadow-xl shadow-slate-100 mb-3 mt-2 px-10 py-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                    {/* Search Input */}
                    <div className="relative flex items-center">
                        <Search className="absolute left-3 top-6 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search By Job Title, Role"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-8 shadow-none focus-visible:ring-0 pl-10 border-none focus:outline-none focus:ring-none text-md"
                        />
                        <div className="h-10 w-0.5  bg-[#EAEAEA]"></div>
                    </div>

                    {/* Location Filter */}
                    <div className="relative flex items-center">
                        <MapPin className="absolute left-3 top-6 h-4 w-4 text-gray-400 z-10" />
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                            <SelectTrigger className="p-8 pl-10 h-12 w-full border-none shadow-none focus:ring-0">
                                <SelectValue placeholder="Preferred Location" className="text-md" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all" className="p-3">All Locations</SelectItem>
                                <SelectItem value="Bangalore" className="p-3">Bangalore</SelectItem>
                                <SelectItem value="Mumbai" className="p-3">Mumbai</SelectItem>
                                <SelectItem value="Delhi" className="p-3">Delhi</SelectItem>
                                <SelectItem value="Hyderabad" className="p-3">Hyderabad</SelectItem>
                                <SelectItem value="Pune" className="p-3">Pune</SelectItem>
                                <SelectItem value="Chennai" className="p-3">Chennai</SelectItem>
                                <SelectItem value="Kolkata" className="p-3">Kolkata</SelectItem>
                                <SelectItem value="Gurgaon" className="p-3">Gurgaon</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="h-10 w-0.5  bg-[#EAEAEA]"></div>

                    </div>

                    {/* Job Type Filter */}
                    <div className="relative flex items-center">
                        <Briefcase className="absolute left-3 top-6 h-4 w-4 text-gray-400 z-10" />
                        <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                            <SelectTrigger className="p-8 pl-10 h-12 w-full border-none shadow-none focus:ring-0">
                                <SelectValue placeholder="Job type" className="text-md" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all" className="p-3">All Types</SelectItem>
                                <SelectItem value="Full Time" className="p-3">Full Time</SelectItem>
                                <SelectItem value="Part Time" className="p-3">Part Time</SelectItem>
                                <SelectItem value="Contract" className="p-3">Contract</SelectItem>
                                <SelectItem value="Freelance" className="p-3">Freelance</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="h-10 w-0.5  bg-[#EAEAEA]"></div>

                    </div>

                    {/* Salary Range */}
                    <div className="space-y-2 h-full flex flex-col justify-center ps-2">
                        <div className="flex justify-between items-center">
                            <span className="text-[16px] font-medium text-black">Salary Per Month</span>
                            <span className="text-sm font-medium text-gray-900">
                                ₹{salaryRange[0]}k - ₹{salaryRange[1]}k
                            </span>
                        </div>
                        <Slider
                            value={salaryRange}
                            onValueChange={setSalaryRange}
                            max={100}
                            min={10}
                            step={5}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">


                {/* Job Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {
                        filteredJobs.map((job) => (
                            <Card key={job.id} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow duration-200">
                                <CardContent className="p-4">
                                    {/* Header with Logo and Time */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${job.logoStyle}`}>
                                            {job.company === "Amazon" && <Image src={amazon} alt="Amazon Logo" className="h-8 w-8" />}
                                            {job.company === "Tesla" && <Image src={tesla} alt="Tesla Logo" className="h-8 w-8" />}
                                            {job.company === "Swiggy" && <Image src={swiggy} alt="Swiggy Logo" className="h-8 w-8 object-contain" />}
                                        </div>
                                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                            {job.postedTime}
                                        </Badge>
                                    </div>

                                    {/* Job Title */}
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{job.title}</h3>

                                    {/* Job Details */}
                                    <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600 mb-4">
                                        <div className="flex items-center gap-1">
                                            <span className="text-gray-400">
                                                <UserPlus size={18} />
                                            </span>
                                            <span className="text-sm">{job.experience}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-gray-400">
                                                <Building2 size={18} />
                                            </span>
                                            <span className="text-sm">{job.workType}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-gray-400">
                                                <Layers size={18} />
                                            </span>
                                            <span className="text-sm">{job.salary}</span>
                                        </div>
                                    </div>
                                    {/* Job Description */}
                                    <div className="space-y-2 mb-6">
                                        {job.description.map((point, index) => (
                                            <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                                <span className="text-gray-400">•</span>
                                                <span>{point}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Apply Button */}
                                    <Button size="text" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 cursor-pointer text-md">Apply Now</Button>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>

                {/* No Results Message */}
                {filteredJobs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
                        <p className="text-gray-400 text-sm mt-2">Try adjusting your filters to see more results.</p>
                    </div>
                )}
            </main>
        </div>
    )
}