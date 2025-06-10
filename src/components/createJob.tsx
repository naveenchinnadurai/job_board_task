"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CalendarIcon, ChevronDown, ArrowRight, ArrowUpDown, ChevronsRight, ChevronsDown } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Form validation schema
const jobFormSchema = z.object({
  jobTitle: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  location: z.string().min(1, {
    message: "Please select a location.",
  }),
  jobType: z.string().min(1, {
    message: "Please select a job type.",
  }),
  salaryMin: z.string().min(1, {
    message: "Minimum salary is required.",
  }),
  salaryMax: z.string().min(1, {
    message: "Maximum salary is required.",
  }),
  applicationDeadline: z.date({
    required_error: "Application deadline is required.",
  }),
  jobDescription: z.string().min(10, {
    message: "Job description must be at least 10 characters.",
  }),
})

type JobFormValues = z.infer<typeof jobFormSchema>

const locations = [
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Gurgaon",
  "Noida",
  "Ahmedabad",
]

const jobTypes = ["FullTime", "PartTime", "Contract", "Freelance", "Internship"]

export default function CreateJobForm() {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      jobTitle: "",
      companyName: "",
      location: "",
      jobType: "",
      salaryMin: "",
      salaryMax: "",
      jobDescription: "",
    },
  })

  const onPublish = (data: JobFormValues) => {
    console.log("Job Opening Data:", {
      ...data,
      salaryRange: `₹${data.salaryMin} - ₹${data.salaryMax}`,
      applicationDeadline: format(data.applicationDeadline, "PPP"),
      publishedAt: new Date().toISOString(),
    })

    // You can add additional logic here like API calls
    alert("Job published successfully! Check console for details.")
  }

  const onSaveDraft = () => {
    const currentData = form.getValues()
    console.log("Draft Saved:", currentData)
    alert("Draft saved successfully! Check console for details.")
  }

  return (
    <div className="w-full h-full py-4 ">
      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onPublish)} className="space-y-4">
          {/* Job Title and Company Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-900">Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Stack Developer" className="h-12 text-base" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-900">Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Amazon, Microsoft, Swiggy" className="h-12 text-base" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Location and Job Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-900">Location</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="py-6 w-full text-base">
                        <SelectValue placeholder="Choose Preferred Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location} className="p-3">
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray=500">Job Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="py-6 w-full text-base">
                        <SelectValue placeholder="Select Job Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type} className="p-3">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Salary Range and Application Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormLabel className="text-base font-medium text-gray-900 mb-3 block">Salary Range</FormLabel>
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="salaryMin"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <Input placeholder="₹0" className="h-12 text-base px-8" {...field} />
                      </FormControl>
                      <ArrowUpDown className="absolute left-2 top-3.5 text-zinc-600" size={18} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salaryMax"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <Input placeholder="₹12,00,000" className="px-8 h-12 text-base" {...field} />
                      </FormControl>
                      <FormMessage />
                      <ArrowUpDown className="absolute left-2 top-3.5 text-zinc-500" size={18} />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="applicationDeadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray=500">Application Deadline</FormLabel>
                  <Dialog>
                    <DialogTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 text-left font-normal justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </DialogTrigger>
                    <DialogContent showCloseButton={false} className="w-auto p-0" >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </DialogContent>
                  </Dialog>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Job Description */}
          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-gray-900">Job Description</FormLabel>
                <FormControl className="h-20">
                  <Textarea
                    placeholder="Please share a description to let the candidate know more about the job role"
                    className="min-h-[120px] text-base resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button
              type="button" 
              size="text"
              variant="outline"
              onClick={onSaveDraft}
              className="px-8 py-3 text-md font-medium border border-black"
            >
              Save Draft
              <ChevronsDown className="ml-2 h-4 w-4" />
            </Button>

            <Button type="submit" size="text" className="bg-blue-500 hover:bg-blue-600 px-8 py-3 text-md font-medium">
              Publish
              <ChevronsRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
