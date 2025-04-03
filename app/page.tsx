"use client"

import type React from "react"

import { useState } from "react"
import { Edit, ChevronDown, Check, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AreaChart } from "@/components/area-chart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Define types for our input variables
interface InputVariable {
  id: string
  label: string
  value: string
  icon: React.ReactNode
}

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("Last 7 days")

  // State to track which card is being edited
  const [editingId, setEditingId] = useState<string | null>(null)

  // State for input variables
  const [inputVariables, setInputVariables] = useState<InputVariable[]>([
    {
      id: "category",
      label: "Category Name",
      value: "Food T",
      icon: (
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      ),
    },
    {
      id: "tenants",
      label: "No. of Tenants",
      value: "XX",
      icon: (
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      id: "load1",
      label: "Daily Approx Load",
      value: "XX",
      icon: (
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
      ),
    },
    {
      id: "load2",
      label: "Daily Approx Load",
      value: "XX",
      icon: (
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
      ),
    },
    {
      id: "costAdhoc",
      label: "Cost Per Adhoc",
      value: "XXX",
      icon: (
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: "monthlyCost",
      label: "Monthly Cost",
      value: "XX",
      icon: (
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ])

  // Temporary state for editing
  const [tempValue, setTempValue] = useState("")

  // Function to start editing a card
  const startEditing = (id: string, currentValue: string) => {
    setEditingId(id)
    setTempValue(currentValue)
  }

  // Function to save the edited value
  const saveEdit = () => {
    if (editingId) {
      setInputVariables(
        inputVariables.map((variable) => (variable.id === editingId ? { ...variable, value: tempValue } : variable)),
      )
      setEditingId(null)
    }
  }

  // Function to cancel editing
  const cancelEdit = () => {
    setEditingId(null)
  }

  // Render an input variable card
  const renderInputCard = (variable: InputVariable) => {
    const isEditing = editingId === variable.id

    return (
      <Card key={variable.id} className="bg-[#2d2d42] border-none text-white p-4 relative">
        <div className="flex items-center mb-2">
          <div className="bg-[#3d3d52] p-2 rounded-md mr-2">{variable.icon}</div>
          <span className="text-sm text-gray-400">{variable.label}</span>
        </div>

        {isEditing ? (
          <div className="flex items-center">
            <Input
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="bg-[#3d3d52] border-[#4d4d62] text-white h-8"
              autoFocus
            />
            <div className="absolute top-2 right-2 flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-green-400 hover:text-green-300 hover:bg-[#3d3d52]"
                onClick={saveEdit}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300 hover:bg-[#3d3d52]"
                onClick={cancelEdit}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-xl font-bold">{variable.value}</div>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => startEditing(variable.id, variable.value)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </>
        )}
      </Card>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#1a1a2e]">
      {/* Sidebar */}
      <div className="w-64 bg-[#1a1a2e] border-r border-[#2d2d42] p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="text-[#4ecca3] text-2xl font-bold">VIDACITY</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <Button variant="secondary" className="w-full justify-start bg-[#2d2d42] hover:bg-[#3d3d52] text-white">
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#2d2d42]">
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Button>
        </nav>

        <div className="mt-auto space-y-2">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#2d2d42]">
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Help
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#2d2d42]">
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <div className="flex items-center">
            <Avatar className="h-10 w-10 border-2 border-[#4ecca3]">
              <AvatarImage src="/placeholder-user.jpg" alt="Jerrick" />
              <AvatarFallback className="bg-[#2d2d42] text-white">JR</AvatarFallback>
            </Avatar>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ml-2 text-white">
                  Jerrick
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#2d2d42] text-white border-[#3d3d52]">
                <DropdownMenuItem className="hover:bg-[#3d3d52]">Profile</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3d3d52]">Settings</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3d3d52]">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Input Variables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {inputVariables.slice(0, 4).map(renderInputCard)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {inputVariables.slice(4, 6).map(renderInputCard)}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-[#2d3e50] border-none text-white p-4">
              <div className="flex items-center mb-4">
                <div className="bg-[#4ecca3] p-2 rounded-full mr-2">
                  <svg
                    className="h-5 w-5 text-[#2d3e50]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm">Average Monthly Cost</span>
              </div>
              <div className="text-3xl font-bold">$XXXX</div>
            </Card>

            <Card className="bg-[#2d3e50] border-none text-white p-4">
              <div className="flex items-center mb-4">
                <div className="bg-[#4ecca3] p-2 rounded-full mr-2">
                  <svg
                    className="h-5 w-5 text-[#2d3e50]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-sm">Months till Now Today</span>
              </div>
              <div className="text-3xl font-bold">$XXXX</div>
            </Card>

            <Card className="bg-[#2d3e50] border-none text-white p-4">
              <div className="flex items-center mb-4">
                <div className="bg-[#4ecca3] p-2 rounded-full mr-2">
                  <svg
                    className="h-5 w-5 text-[#2d3e50]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm">Recommendations</span>
              </div>
              <p className="text-sm text-gray-300">
                Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
                ipsum Lorem ipsum
              </p>
            </Card>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">No. of bins filled</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#4ecca3] mr-2"></div>
                <span className="text-sm text-gray-300">General</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#eeff41] mr-2"></div>
                <span className="text-sm text-gray-300">Recyclable</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-[#2d2d42] border-[#3d3d52] text-white">
                    {timeRange}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#2d2d42] text-white border-[#3d3d52]">
                  <DropdownMenuItem className="hover:bg-[#3d3d52]" onClick={() => setTimeRange("Last 7 days")}>
                    Last 7 days
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#3d3d52]" onClick={() => setTimeRange("Last 30 days")}>
                    Last 30 days
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#3d3d52]" onClick={() => setTimeRange("Last 90 days")}>
                    Last 90 days
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Card className="bg-[#1a1a2e] border-[#2d2d42] p-4">
            <div className="relative h-64">
              <AreaChart
                data={[
                  { date: "Apr 14", general: 2, recyclable: 1.5 },
                  { date: "Apr 15", general: 2.5, recyclable: 2 },
                  { date: "Apr 16", general: 2, recyclable: 2.5 },
                  { date: "Apr 17", general: 1.5, recyclable: 3 },
                  { date: "Apr 18", general: 1, recyclable: 2.5 },
                  { date: "Apr 19", general: 2, recyclable: 2 },
                  { date: "Apr 20", general: 2.5, recyclable: 3 },
                ]}
                generalColor="#4ecca3"
                recyclableColor="#eeff41"
                highlightDate="Apr 17"
                highlightValue={3}
              />
            </div>
          </Card>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">No. of Overfilled Bins</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#4ecca3] mr-2"></div>
                <span className="text-sm text-gray-300">General</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-[#2d2d42] border-[#3d3d52] text-white">
                    {timeRange}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#2d2d42] text-white border-[#3d3d52]">
                  <DropdownMenuItem className="hover:bg-[#3d3d52]" onClick={() => setTimeRange("Last 7 days")}>
                    Last 7 days
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#3d3d52]" onClick={() => setTimeRange("Last 30 days")}>
                    Last 30 days
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#3d3d52]" onClick={() => setTimeRange("Last 90 days")}>
                    Last 90 days
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Card className="bg-[#1a1a2e] border-[#2d2d42] p-4">
            <div className="relative h-64">
              <AreaChart
                data={[
                  { date: "Apr 14", general: 1.5, recyclable: 0 },
                  { date: "Apr 15", general: 3, recyclable: 0 },
                  { date: "Apr 16", general: 2.5, recyclable: 0 },
                  { date: "Apr 17", general: 2, recyclable: 0 },
                  { date: "Apr 18", general: 1, recyclable: 0 },
                  { date: "Apr 19", general: 1.5, recyclable: 0 },
                  { date: "Apr 20", general: 2, recyclable: 0 },
                ]}
                generalColor="#4ecca3"
                recyclableColor="#eeff41"
                highlightDate="Apr 17"
                highlightValue={2}
                singleLine
              />
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}

