"use client"

import React, { useState } from "react"
import { faker, fakerDE, fakerFR, fakerES, fakerIT } from '@faker-js/faker';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Plus, Trash2 } from 'lucide-react'
import { convertToCSV, convertToXML } from '../utils/exportFormats'
import { FileJson, FileSpreadsheet, FileCode } from 'lucide-react'
import { TemplatesSelector } from './templates-selector'
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { DataTable } from './data-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Field {
  name: string
  type: string
  connection: string
}

const categories = {
  users: ["ids", "names", "emails", "passwords", "phones", "addresses"],
  cars: ["vin", "manufacturer", "model", "type", "fuel", "color"],
  orders: ["orderId", "date", "status", "amount", "items"],
  maintenance: ["serviceId", "date", "description", "cost", "technician"],
  inventory: ["stockId", "quantity", "location", "status", "category"],
  payments: ["transactionId", "amount", "method", "status", "date"],
  vehicles: ["id", "type", "manufacturer", "model", "year", "registration"],
  services: ["serviceId", "name", "duration", "price", "category"],
  reviews: ["reviewId", "rating", "comment", "date", "reviewer"],
  locations: ["id", "address", "city", "state", "country", "coordinates"]
}

export function DataGenerator() {
  const [selectedCategory, setSelectedCategory] = useState("users")
  const [fields, setFields] = useState<Field[]>([
    { name: "userId", type: "number", connection: "ids" },
    { name: "name", type: "string", connection: "names" },
    { name: "email", type: "string", connection: "emails" },
    { name: "password", type: "string", connection: "passwords" },
  ])
  const [generatedData, setGeneratedData] = useState<Record<string, unknown>[]>([])
  const [recordCount, setRecordCount] = useState(10)
  const [corruptData, setCorruptData] = useState(false)
  const [locale, setLocale] = useState('en')

  const getFaker = () => {
    switch (locale) {
      case 'de': return fakerDE;
      case 'fr': return fakerFR;
      case 'es': return fakerES;
      case 'it': return fakerIT;
      default: return faker;
    }
  }

  const generateFieldValue = (connection: string) => {
    const currentFaker = getFaker();
    switch (connection) {
      // User related
        case "ids": return currentFaker.number.int(10000)
        case "names": return currentFaker.person.fullName()
        case "emails": return currentFaker.internet.email()
        case "passwords": return currentFaker.internet.password()
        case "phones": return currentFaker.phone.number()
        case "addresses": return currentFaker.location.streetAddress()
        
        // Car related
        case "vin": return currentFaker.vehicle.vin()
        case "manufacturer": return currentFaker.vehicle.manufacturer()
        case "model": return currentFaker.vehicle.model()
        case "type": return currentFaker.vehicle.type()
        case "fuel": return currentFaker.vehicle.fuel()
        case "color": return currentFaker.vehicle.color()
        
        // Order related
        case "orderId": return currentFaker.string.alphanumeric(8).toUpperCase()
        case "date": return currentFaker.date.recent().toISOString()
        case "status": return currentFaker.helpers.arrayElement(['pending', 'processing', 'completed', 'cancelled'])
        case "amount": return currentFaker.number.float({ min: 10, max: 1000, fractionDigits: 2 })
        case "items": return Array.from({ length: currentFaker.number.int({ min: 1, max: 5 }) }, () => ({
          id: currentFaker.string.alphanumeric(5),
          name: currentFaker.commerce.productName(),
          price: currentFaker.commerce.price()
        }))
        
        // Maintenance related
        case "serviceId": return currentFaker.string.alphanumeric(6).toUpperCase()
        case "description": return currentFaker.lorem.sentence()
        case "cost": return currentFaker.number.float({ min: 50, max: 5000, fractionDigits: 2 })
        case "technician": return currentFaker.person.fullName()
        
        // Inventory related
        case "stockId": return currentFaker.string.alphanumeric(7).toUpperCase()
        case "quantity": return currentFaker.number.int({ min: 0, max: 1000 })
        case "location": return currentFaker.location.city()
        case "category": return currentFaker.commerce.department()
        
        // Payment related
        case "transactionId": return currentFaker.string.alphanumeric(10).toUpperCase()
        case "method": return currentFaker.helpers.arrayElement(['credit_card', 'debit_card', 'paypal', 'cash'])
        
        // Vehicle related
        case "year": return currentFaker.date.past().getFullYear()
        case "registration": return currentFaker.vehicle.vrm()
        
        // Service related
        case "duration": return currentFaker.number.int({ min: 30, max: 180 })
        case "price": return currentFaker.commerce.price()
        
        // Review related
        case "rating": return currentFaker.number.int({ min: 1, max: 5 })
        case "comment": return currentFaker.lorem.paragraph()
        case "reviewer": return currentFaker.person.fullName()
        
        // Location related
        case "city": return currentFaker.location.city()
        case "state": return currentFaker.location.state()
        case "country": return currentFaker.location.country()
        case "coordinates": return {
        latitude: currentFaker.location.latitude(),
        longitude: currentFaker.location.longitude()
        }
      
      default: return "N/A"
    }
  }

  const generateData = () => {
    const data = Array.from({ length: recordCount }, () => {
      const item: Record<string, unknown> = {}
      fields.forEach((field) => {
        if (corruptData && Math.random() < 0.1) {
          // 10% chance to corrupt data
          if (Math.random() < 0.5) {
            // 50% chance to set field to null
            item[field.name] = null
          } else {
            // 50% chance to omit field
          }
        } else {
          item[field.name] = generateFieldValue(field.connection)
        }
      })
      return item
    })
    setGeneratedData(data)
  }

  const addField = () => {
    setFields([...fields, { name: "", type: "string", connection: "" }])
  }

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index))
  }

  const updateField = (index: number, field: Partial<Field>) => {
    setFields(
      fields.map((f, i) => (i === index ? { ...f, ...field } : f))
    )
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(generatedData, null, 2))
  }

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(generatedData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "fake-data.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadCSV = () => {
    const csvContent = convertToCSV(generatedData)
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "fake-data.csv")
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadXML = () => {
    const xmlContent = convertToXML(generatedData)
    const blob = new Blob([xmlContent], { type: "application/xml;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "fake-data.xml")
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleTemplateSelect = (templateFields: Field[]) => {
    setFields(templateFields)
  }

  const columns = React.useMemo(() => 
    fields.map(field => ({
      accessorKey: field.name,
      header: field.name,
    })),
  [fields])

  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-2 gap-6">
        <TemplatesSelector onTemplateSelect={handleTemplateSelect} />
        <Card>
          <CardHeader>
            <CardTitle>Customize Fields</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select 
              value={selectedCategory} 
              onValueChange={(value) => {
                setSelectedCategory(value)
                setFields(categories[value as keyof typeof categories].map(conn => ({
                  name: conn,
                  type: "string",
                  connection: conn
                })))
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="users">Users</SelectItem>
                <SelectItem value="cars">Cars</SelectItem>
                <SelectItem value="orders">Orders</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="inventory">Inventory</SelectItem>
                <SelectItem value="payments">Payments</SelectItem>
                <SelectItem value="vehicles">Vehicles</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="reviews">Reviews & Ratings</SelectItem>
                <SelectItem value="locations">Locations</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder="Field name"
                    value={field.name}
                    onChange={(e) => updateField(index, { name: e.target.value })}
                  />
                  <Select
                    value={field.connection}
                    onValueChange={(value) => updateField(index, { connection: value })}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories[selectedCategory as keyof typeof categories].map((conn) => (
                        <SelectItem key={conn} value={conn}>
                          {conn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeField(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <Label>Locale</Label>
              <Select value={locale} onValueChange={setLocale}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="it">Italian</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Number of records</Label>
              <Slider
                min={1}
                max={1000}
                step={1}
                value={[recordCount]}
                onValueChange={(value) => setRecordCount(value[0])}
              />
              <div className="text-right text-sm text-muted-foreground">
                {recordCount} records
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="corrupt-data"
                checked={corruptData}
                onCheckedChange={setCorruptData}
              />
              <Label htmlFor="corrupt-data">Simulate data corruption</Label>
            </div>
            
            <Button onClick={addField} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </Button>
            
            <Button onClick={generateData} className="w-full">
              Generate Data
            </Button>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Preview</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={downloadJSON}>
              <FileJson className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={downloadCSV}>
              <FileSpreadsheet className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={downloadXML}>
              <FileCode className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="json">
            <TabsList>
              <TabsTrigger value="json">JSON</TabsTrigger>
              <TabsTrigger value="table">Table</TabsTrigger>
            </TabsList>
            <TabsContent value="json">
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[500px]">
                <code>{JSON.stringify(generatedData, null, 2)}</code>
              </pre>
            </TabsContent>
            <TabsContent value="table">
              <DataTable columns={columns} data={generatedData} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}