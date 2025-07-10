"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreHorizontal,
  Pencil,
  Search,
  Trash2,
  Users,
} from "lucide-react"

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    provider: "google" as const,
    role: "admin" as const,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    provider: "credentials" as const,
    role: "user" as const,
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@email.com",
    provider: "google" as const,
    role: "user" as const,
    createdAt: new Date("2024-03-10"),
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@domain.com",
    provider: "credentials" as const,
    role: "admin" as const,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@service.com",
    provider: "google" as const,
    role: "user" as const,
    createdAt: new Date("2024-04-12"),
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily.davis@platform.com",
    provider: "credentials" as const,
    role: "user" as const,
    createdAt: new Date("2024-03-25"),
  },
  {
    id: "7",
    name: "Robert Miller",
    email: "robert.miller@organization.com",
    provider: "google" as const,
    role: "admin" as const,
    createdAt: new Date("2024-02-08"),
  },
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    provider: "google" as const,
    role: "admin" as const,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    provider: "credentials" as const,
    role: "user" as const,
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@email.com",
    provider: "google" as const,
    role: "user" as const,
    createdAt: new Date("2024-03-10"),
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@domain.com",
    provider: "credentials" as const,
    role: "admin" as const,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@service.com",
    provider: "google" as const,
    role: "user" as const,
    createdAt: new Date("2024-04-12"),
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily.davis@platform.com",
    provider: "credentials" as const,
    role: "user" as const,
    createdAt: new Date("2024-03-25"),
  },
  {
    id: "7",
    name: "Robert Miller",
    email: "robert.miller@organization.com",
    provider: "google" as const,
    role: "admin" as const,
    createdAt: new Date("2024-02-08"),
  },
  {
    id: "8",
    name: "Lisa Anderson",
    email: "lisa.anderson@business.com",
    provider: "credentials" as const,
    role: "user" as const,
    createdAt: new Date("2024-04-01"),
  },
]

type User = (typeof mockUsers)[0]

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [providerFilter, setProviderFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editRoleModalOpen, setEditRoleModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [newRole, setNewRole] = useState<"admin" | "user">("user")

  // Pagination logic
  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesProvider = providerFilter === "all" || user.provider === providerFilter

      return matchesSearch && matchesProvider
    })
  }, [searchTerm, providerFilter])

  // Pagination logic
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage
    return filteredUsers.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredUsers, currentPage, rowsPerPage])

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage)

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Handle actions
  const handleView = (user: User) => {
    setSelectedUser(user)
    setViewModalOpen(true)
  }

  const handleEditRole = (user: User) => {
    setSelectedUser(user)
    setNewRole(user.role)
    setEditRoleModalOpen(true)
  }

  const handleConfirmDelete = () => {
    // In a real app, you would delete the user here
    console.log(`Deleting user ${selectedUser?.name}`)
    setDeleteModalOpen(false)
    setSelectedUser(null)
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage)
    setCurrentPage(1) // Reset to first page when changing rows per page
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <h1 className="text-3xl font-bold">Users Management</h1>
          </div>
          <p className="text-muted-foreground">Manage user accounts, roles, and permissions across your platform.</p>
          <p className="text-sm text-muted-foreground">
            Total users: <span className="font-medium">{filteredUsers.length}</span>
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10"
            />
          </div>
          <Select
            value={providerFilter}
            onValueChange={(value) => {
              setProviderFilter(value)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Providers</SelectItem>
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="credentials">Credentials</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>A list of all users in your system with their details and actions.</CardDescription>
          </CardHeader>
          <CardContent>
            {paginatedUsers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No users found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="block max-w-[150px] truncate">{truncateText(user.name, 20)}</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{user.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="block max-w-[200px] truncate">{truncateText(user.email, 25)}</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{user.email}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={user.provider === "google" ? "default" : "secondary"}
                              className={
                                user.provider === "google"
                                  ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                              }
                            >
                              {user.provider === "google" ? "Google" : "Credentials"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={user.role === "admin" ? "destructive" : "default"}
                              className={
                                user.role === "admin"
                                  ? "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300"
                                  : "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
                              }
                            >
                              {user.role === "admin" ? "Admin" : "User"}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(user.createdAt)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleView(user)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditRole(user)}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit Role
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedUser(user)
                                    setDeleteModalOpen(true)
                                  }}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Enhanced Pagination */}
                {totalPages > 0 && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 pt-4 border-t">
                    {/* Rows per page */}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground whitespace-nowrap">Rows per page:</span>
                      <Select
                        value={rowsPerPage.toString()}
                        onValueChange={(value) => handleRowsPerPageChange(Number.parseInt(value))}
                      >
                        <SelectTrigger className="w-[70px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="30">30</SelectItem>
                          <SelectItem value="40">40</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Page info and navigation */}
                    <div className="flex items-center gap-4">
                      {/* Page info */}
                      <div className="text-sm text-muted-foreground whitespace-nowrap">
                        {filteredUsers.length === 0 ? (
                          "0 of 0"
                        ) : (
                          <>
                            {(currentPage - 1) * rowsPerPage + 1}-
                            {Math.min(currentPage * rowsPerPage, filteredUsers.length)} of {filteredUsers.length}
                          </>
                        )}
                      </div>

                      {/* Navigation buttons */}
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1 || filteredUsers.length === 0}
                          className="h-8 px-2"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span className="sr-only sm:not-sr-only sm:ml-1">Previous</span>
                        </Button>

                        <div className="flex items-center gap-1 mx-2">
                          <span className="text-sm text-muted-foreground">
                            Page {filteredUsers.length === 0 ? 0 : currentPage} of {totalPages}
                          </span>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages || filteredUsers.length === 0}
                          className="h-8 px-2"
                        >
                          <span className="sr-only sm:not-sr-only sm:mr-1">Next</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* View User Modal */}
        <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>Complete information about the selected user.</DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Name:</Label>
                  <div className="col-span-3">{selectedUser.name}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Email:</Label>
                  <div className="col-span-3">{selectedUser.email}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Provider:</Label>
                  <div className="col-span-3">
                    <Badge
                      variant={selectedUser.provider === "google" ? "default" : "secondary"}
                      className={
                        selectedUser.provider === "google"
                          ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                      }
                    >
                      {selectedUser.provider === "google" ? "Google" : "Credentials"}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Role:</Label>
                  <div className="col-span-3">
                    <Badge
                      variant={selectedUser.role === "admin" ? "destructive" : "default"}
                      className={
                        selectedUser.role === "admin"
                          ? "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
                      }
                    >
                      {selectedUser.role === "admin" ? "Admin" : "User"}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Created:</Label>
                  <div className="col-span-3">{formatDate(selectedUser.createdAt)}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">User ID:</Label>
                  <div className="col-span-3 font-mono text-sm">{selectedUser.id}</div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Role Modal */}
        <Dialog open={editRoleModalOpen} onOpenChange={setEditRoleModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User Role</DialogTitle>
              <DialogDescription>
                Change the role for {selectedUser?.name}. This will affect their permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <div className="col-span-3">
                  <Select value={newRole} onValueChange={(value: "admin" | "user") => setNewRole(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditRoleModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // In a real app, you would update the user's role here
                  console.log(`Updating ${selectedUser?.name}'s role to ${newRole}`)
                  setEditRoleModalOpen(false)
                  setSelectedUser(null)
                }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Confirm Deletion
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete <strong>{selectedUser?.name}</strong>? This action cannot be undone and
                will permanently remove the user from your system.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Delete User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
