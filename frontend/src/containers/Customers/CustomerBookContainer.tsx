import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"


interface User {
  id: number
  name: string
}

const CustomerBookContainer: React.FC = () => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate("/dashboard")
  }

  //初始默认
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Alice" },
    { id: 2, name: "Alice" },
    { id: 3, name: "Alice" },
    { id: 4, name: "Alice" },
    { id: 5, name: "Alice" }

  ])

  // 获取用户数据
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("") // 替换为你的API
        const data = await response.json()
        if (data.length > 0) {
          setUsers(data) // 只有当API返回数据时才更新状态
        }
      } catch (error) {
        console.error("Failed to fetch users:", error)
      }
    }

    fetchUsers()
  }, []) // 组件挂载时调用

  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {users.map((user) => (
          <Card
            key={user.id}
            className="shadow-md border-0 bg-gradient-to-br from-white/80 to-slate-100 
            dark:from-slate-800 dark:to-slate-700/90 transition-all duration-300 hover:shadow-xl 
            hover:translate-y-[-3px] hover:bg-gradient-to-br hover:from-white/90 hover:to-blue-50 
            dark:hover:from-slate-800 dark:hover:to-blue-900/20 group">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <div
                  className="p-2 rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 
                  group-hover:text-white transition-colors duration-300">
                  <Users className="h-5 w-5" />
                </div>
                User: {user.name}
              </CardTitle>
              <CardDescription>view details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{user.name}</div>
              <div className="mt-4">
                <Button
                  type="button"
                  onClick={handleNavigate}
                  className="bg-purple-600 hover:bg-purple-700 text-white">
                  Open
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CustomerBookContainer
