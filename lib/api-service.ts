import { getAccessToken } from "@/lib/client-storage"

export type UserInvestment = {
  name: string
  monthlyYield: string
  investmentSum: number
  profits: number
  withdrawals: number
}

export type UserTransaction = {
  message: string
  date: Date
}

export type InvestmentPlan = {
  investmentname: string
  targetinvestor: string
  targetcash: string
  targetmultiple: string
  photo: string
}

export type DashboardData = {
  user: {
    firstname: string
    lastname: string
    email: string
    phonenumber: string
    balance: number
    investments: UserInvestment[]
    transactions: UserTransaction[]
  }[]
  plans: InvestmentPlan[]
}

// Cache for dashboard data to avoid multiple fetches
let cachedDashboardData: DashboardData | null = null
let lastFetchTime = 0
const CACHE_DURATION = 60000 // 1 minute in milliseconds

export async function fetchDashboardData(): Promise<DashboardData | null> {
  try {
    // Check if we have cached data that's still fresh
    const now = Date.now()
    if (cachedDashboardData && now - lastFetchTime < CACHE_DURATION) {
      return cachedDashboardData
    }

    const token = getAccessToken()

    if (!token) {
      console.error("No access token available")
      return null
    }

    const response = await fetch("https://shalomserver.onrender.com/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({}),
    })

    if (!response.ok) {
      console.error("Failed to fetch dashboard data")
      return null
    }

    const data = await response.json()

    // Update cache
    cachedDashboardData = data as DashboardData
    lastFetchTime = now

    return data as DashboardData
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return null
  }
}

// Function to clear the dashboard data cache
export function clearDashboardCache() {
  cachedDashboardData = null
  lastFetchTime = 0
}

