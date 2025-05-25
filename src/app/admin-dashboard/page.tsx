"use client"

import { useState } from "react"
import { MOCK_PRODUCTS } from "@/lib/constants"
import type { ProductAdmin, Order } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

// Mock orders for demo
const MOCK_ORDERS: Order[] = [
  {
    id: "order1",
    productId: "1",
    productName: "Pro Performance T-Shirt",
    quantity: 2,
    price: 29.99,
    status: "pending",
    customer: "John Doe",
    date: "2024-06-01",
  },
  {
    id: "order2",
    productId: "2",
    productName: "Elite Soccer Uniform",
    quantity: 1,
    price: 79.99,
    status: "shipped",
    customer: "Jane Smith",
    date: "2024-06-02",
  },
]

export default function AdminDashboard() {
  // For demo, extend products with admin fields
  const [products, setProducts] = useState<ProductAdmin[]>(
    MOCK_PRODUCTS.map((p, i) => ({
      ...p,
      inStock: 10 + i * 2,
      orders: i * 3,
      isActive: true,
    }))
  )
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
  const [editId, setEditId] = useState<string | null>(null)
  const [editStock, setEditStock] = useState<number>(0)

  // Product actions
  const handleToggleActive = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    )
  }
  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }
  const handleEditStock = (id: string, stock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: stock } : p))
    )
    setEditId(null)
  }

  // Order actions
  const handleStatusChange = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-12">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Name</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">In Stock</th>
                  <th className="p-2">Orders</th>
                  <th className="p-2">Active</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="p-2 font-medium">{p.name}</td>
                    <td className="p-2">{p.category}</td>
                    <td className="p-2">₹{p.price.toFixed(2)}</td>
                    <td className="p-2">
                      {editId === p.id ? (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault()
                            handleEditStock(p.id, editStock)
                          }}
                        >
                          <Input
                            type="number"
                            value={editStock}
                            onChange={(e) =>
                              setEditStock(Number(e.target.value))
                            }
                            className="w-20 inline-block mr-2"
                          />
                          <Button size="sm" type="submit">
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            type="button"
                            onClick={() => setEditId(null)}
                          >
                            Cancel
                          </Button>
                        </form>
                      ) : (
                        <>
                          {p.inStock}{" "}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditId(p.id)
                              setEditStock(p.inStock)
                            }}
                          >
                            Edit
                          </Button>
                        </>
                      )}
                    </td>
                    <td className="p-2">{p.orders}</td>
                    <td className="p-2">
                      <Button
                        size="sm"
                        variant={p.isActive ? "default" : "outline"}
                        onClick={() => handleToggleActive(p.id)}
                      >
                        {p.isActive ? "Active" : "Inactive"}
                      </Button>
                    </td>
                    <td className="p-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Order ID</th>
                  <th className="p-2">Product</th>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b">
                    <td className="p-2">{o.id}</td>
                    <td className="p-2">{o.productName}</td>
                    <td className="p-2">{o.customer}</td>
                    <td className="p-2">{o.date}</td>
                    <td className="p-2">{o.quantity}</td>
                    <td className="p-2">
                      ₹{(o.price * o.quantity).toFixed(2)}
                    </td>
                    <td className="p-2">
                      <select
                        className="border rounded px-2 py-1"
                        value={o.status}
                        onChange={(e) =>
                          handleStatusChange(
                            o.id,
                            e.target.value as Order["status"]
                          )
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
