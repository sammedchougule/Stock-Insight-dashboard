"use client"

import { useState, useEffect, useRef } from 'react'
import { Search, Moon, Sun, ChevronRight, Info, Plus, Check, X, TrendingUp, TrendingDown, Activity, ArrowUp, ArrowDown } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Component() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('Gainers') // Update: Default activeTab to 'Gainers'
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  // Function to get initials from company name
  const getInitials = (name:string) => {
    return name
      .split(' ')
      .map((word:string) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Function to get a consistent color based on company name
  const getColor = (name:string) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500', 'bg-indigo-500']
    const index = name.length % colors.length
    return colors[index]
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-gray-800 dark:text-white">StockInsights</h1>
                </div>
                <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {['COMPARE MARKETS', 'US', 'Europe', 'India', 'Currencies', 'Crypto', 'Futures'].map((item) => (
                    <a key={item} href="#" className={`${item === 'COMPARE MARKETS' ? 'border-indigo-500 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="flex items-center">
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  className="mr-2"
                />
                {darkMode ? (
                  <Sun className="h-5 w-5 text-gray-300" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-500" />
                )}
                <div className="flex items-center ml-4">
                  <Button
                    onClick={() => setLoginOpen(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => setSignupOpen(true)}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-4 sm:px-0">
            <div className="flex flex-wrap -mx-2 mb-4">
              {[
                { name: 'NIFTY 50', value: '24,946.75', change: '-57.80', percent: '-0.23%', color: 'red' },
                { name: 'SENSEX', value: '81,380.09', change: '-231.31', percent: '-0.28%', color: 'red' },
                { name: 'Nifty Bank', value: '51,072.60', change: '-458.30', percent: '-0.89%', color: 'red' },
                { name: 'Nifty IT', value: '42,195.30', change: '+106.50', percent: '+0.25%', color: 'green' },
                { name: 'S&P BSE SmallCap', value: '56,497.93', change: '+144.57', percent: '+0.26%', color: 'green' },
              ].map((index) => (
                <div key={index.name} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-2 mb-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{index.name}</h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{index.value}</p>
                    <p className={`mt-1 text-sm ${index.color === 'red' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {index.change} ({index.percent})
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mb-8 w-1/2 mx-auto">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md dark:shadow-gray-800"
                placeholder="Search for stocks, ETFs & more"
              />
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 dark:text-gray-300" />
              </div>
            </div>

            <div className="flex flex-wrap -mx-4 mb-8">
              <div className="w-full lg:w-8/12 px-4">
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Top movers in your lists</h2>
                  </div>
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {[
                      { name: 'Tata Consultancy Services', price: '₹4,124.30', change: '-₹103.10', percent: '-2.44%', color: 'red' },
                      { name: 'HDFC Bank Ltd', price: '₹1,645.15', change: '-₹17.25', percent: '-1.04%', color: 'red' },
                      { name: 'Infosys Ltd', price: '₹1,936.60', change: '+₹17.60', percent: '0.92%', color: 'green' },
                      { name: 'Reliance Industries Ltd', price: '₹2,752.45', change: '+₹10.35', percent: '0.38%', color: 'green' },
                    ].map((stock) => (
                      <li key={stock.name}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`w-10 h-10 rounded-full ${getColor(stock.name)} flex items-center justify-center text-white font-bold`}>
                                {getInitials(stock.name)}
                              </div>
                              <p className="ml-3 text-sm font-bold text-indigo-600 dark:text-indigo-400 truncate">{stock.name}</p>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100">
                                Active
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                {stock.price}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                              <p className={`${stock.color === 'red' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                {stock.change} ({stock.percent})
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4 mt-8 lg:mt-0">
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Most followed on Google</h2>
                  </div>
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {[
                      { name: 'Reliance Industries Ltd', followers: '306K', change: '0.43%', color: 'green', icon: 'check' },
                      { name: 'State Bank of India', followers: '272K', change: '0.11%', color: 'red', icon: 'plus' },
                      { name: 'Yes Bank Ltd', followers: '228K', change: '0.23%', color: 'red', icon: 'plus' },
                      { name: 'Tata Motors Ltd', followers: '197K', change: '0.32%', color: 'green', icon: 'plus' },
                      { name: 'Infosys Ltd', followers: '164K', change: '0.70%', color: 'green', icon: 'check' },
                      { name: 'Tata Consultancy Services', followers: '156K', change: '2.56%', color: 'red', icon: 'check' },
                    ].map((stock, index) => (
                      <li key={stock.name} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : ''}>
                        <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full ${getColor(stock.name)} flex items-center justify-center text-white font-bold text-xs`}>
                              {getInitials(stock.name)}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-bold text-gray-900 dark:text-white">{stock.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{stock.followers} following</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stock.color === 'red' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'}`}>
                              {stock.color === 'red' ? '▼' : '▲'} {stock.change}
                            </span>
                            {stock.icon === 'check' ? (
                              <Check className="ml-2 h-5 w-5 text-green-500" />
                            ) : (
                              <Plus className="ml-2 h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:px-6">
                {/* Update: Removed Market trends headline */}
                <div className="mt-4 flex space-x-4 border-b border-gray-200 dark:border-gray-700">
                  {[
                    { name: 'Gainers', color: 'bg-green-500', icon: <TrendingUp className="w-5 h-5 mr-1" /> },
                    { name: 'Losers', color: 'bg-red-500', icon: <TrendingDown className="w-5 h-5 mr-1" /> },
                    { name: 'Most Active', color: 'bg-yellow-500', icon: <Activity className="w-5 h-5 mr-1" /> },
                    { name: '52W High', icon: <ArrowUp className="w-5 h-5 mr-1 text-green-500" /> },
                    { name: '52W Low', icon: <ArrowDown className="w-5 h-5 mr-1 text-red-500" /> },
                  ].map((tab) => (
                    <button
                      key={tab.name}
                      className={`pb-2 px-1 flex items-center text-lg font-medium ${activeTab === tab.name ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab(tab.name)}
                    >
                      {tab.icon}
                      {tab.name}
                    </button>
                  ))}
                </div>
              </div>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { name: 'Vodafone Idea Ltd', news: 'Vodafone Idea gets share upgrade from JP Morgan; check target price, rating', source: 'Business Standard', time: '2 hours ago', price: '₹9.11', change: '-2.15%', color: 'red' },
                  { name: 'Bandhan Bank Ltd', news: 'Bandhan Bank shares jump 9% to cross Rs 200-mark. Here\'s why', source: 'The Economic Times', time: '2 hours ago', price: '₹206.95', change: '10.26%', color: 'green' },
                  { name: 'Jaiprakash Power Ventures', news: 'JP Power Ven. Emerges as Top Performer in Power Industry; Gains 6.55% ...', source: 'MarketsMojo', time: '1 day ago', price: '₹22.64', change: '-1.05%', color: 'red' },
                  { name: 'IDFC Ltd', news: 'UBS buys 81 lakh shares of IDFC for Rs 88 crore via block deal ahead of s...', source: 'The Economic Times', time: '1 day ago', price: '₹108.78', change: '-1.09%', color: 'red' },
                  { name: 'GTL Infrastructure Limited', news: '', price: '₹2.34', change: '4.00%', color: 'green' },
                  { name: 'Tata Steel Ltd', news: 'Tata Steel Share Price Today on : Tata Steel share are up by 1.32%, Nifty d...', source: 'Livemint', time: '47 minutes ago', price: '₹161.64', change: '1.20%', color: 'green' },
                ].map((stock, index) => (
                  <li key={index} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full ${getColor(stock.name)} flex items-center justify-center text-white font-bold`}>
                          {getInitials(stock.name)}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{stock.name}</p>
                          {stock.news && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-md">{stock.news}</p>
                          )}
                          {stock.source && (
                            <p className="text-xs text-gray-400 dark:text-gray-500">{stock.source} • {stock.time}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900 dark:text-white mr-2">{stock.price}</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stock.color === 'red' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'}`}>
                          {stock.change}
                        </span>
                        <Plus className="ml-2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white flex items-center">
                  Discover more
                  <Info className="ml-2 h-4 w-4 text-gray-400" />
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">You may be interested in</p>
              </div>
              <div className="relative">
                <div ref={scrollRef} className="flex overflow-x-auto pb-4 hide-scrollbar">
                  {[
                    { name: 'Tata Steel Ltd', price: '₹161.64', change: '1.20%', color: 'green', bgColor: 'bg-blue-100' },
                    { name: 'ICICI Bank Ltd', price: '₹1,224.30', change: '-1.54%', color: 'red', bgColor: 'bg-indigo-100' },
                    { name: 'Larsen and Toubro Ltd', price: '₹3,488.00', change: '0.80%', color: 'green', bgColor: 'bg-gray-100' },
                    { name: 'Maruti Suzuki India Ltd', price: '₹12,870.90', change: '-0.57%', color: 'red', bgColor: 'bg-blue-100' },
                    { name: 'Punjab National Bank', price: '₹103.90', change: '0.20%', color: 'green', bgColor: 'bg-yellow-100' },
                    { name: 'Sun Pharmaceutical Industries Ltd', price: '₹1,902.80', change: '0.80%', color: 'green', bgColor: 'bg-orange-100' },
                  ].map((stock, index) => (
                    <div key={index} className={`flex-shrink-0 w-48 p-4 m-2 rounded-lg shadow ${stock.bgColor} dark:bg-gray-700`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 rounded-full ${getColor(stock.name)} flex items-center justify-center text-white font-bold text-xs`}>
                          {getInitials(stock.name)}
                        </div>
                        <Plus className="h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{stock.name}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{stock.price}</p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${stock.color === 'red' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'}`}>
                          {stock.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
                >
                  <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Login Modal */}
        <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Login to StockInsight</DialogTitle>
              <DialogDescription>
                Enter your credentials to access your account
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Signup Modal */}
        <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign Up for StockInsight</DialogTitle>
              <DialogDescription>
                Create your account to start tracking stocks
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="Enter your full name" />
              </div>
              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" placeholder="Create a password" />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm your password" />
              </div>
              <Button type="submit" className="w-full">Sign Up</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}