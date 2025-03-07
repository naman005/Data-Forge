"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Field {
  name: string;
  type: string;
  connection: string;
}

interface Template {
  name: string;
  fields: Field[];
}

interface Templates {
  [key: string]: Template;
}

const predefinedTemplates: Templates = {
  "user-management": {
    name: "User Management System",
    fields: [
      { name: "userId", type: "number", connection: "ids" },
      { name: "username", type: "string", connection: "usernames" },
      { name: "email", type: "string", connection: "emails" },
      { name: "role", type: "string", connection: "roles" },
      { name: "lastLogin", type: "date", connection: "dates" },
    ]
  },
  "e-commerce": {
    name: "E-commerce Platform",
    fields: [
      { name: "productId", type: "string", connection: "ids" },
      { name: "name", type: "string", connection: "productNames" },
      { name: "price", type: "number", connection: "prices" },
      { name: "category", type: "string", connection: "categories" },
      { name: "stock", type: "number", connection: "quantities" },
    ]
  },
  "blog-cms": {
    name: "Blog/CMS",
    fields: [
      { name: "postId", type: "number", connection: "ids" },
      { name: "title", type: "string", connection: "titles" },
      { name: "content", type: "string", connection: "paragraphs" },
      { name: "author", type: "string", connection: "names" },
      { name: "publishDate", type: "date", connection: "dates" },
      { name: "tags", type: "array", connection: "words" },
    ]
  },
  "healthcare-records": {
    name: "Healthcare Records",
    fields: [
      { name: "patientId", type: "string", connection: "ids" },
      { name: "name", type: "string", connection: "names" },
      { name: "dateOfBirth", type: "date", connection: "dates" },
      { name: "diagnosis", type: "string", connection: "words" },
      { name: "treatment", type: "string", connection: "sentences" },
      { name: "admissionDate", type: "date", connection: "dates" },
    ]
  },
  "financial-transactions": {
    name: "Financial Transactions",
    fields: [
      { name: "transactionId", type: "string", connection: "ids" },
      { name: "amount", type: "number", connection: "amounts" },
      { name: "type", type: "string", connection: "transactionTypes" },
      { name: "date", type: "date", connection: "dates" },
      { name: "accountId", type: "string", connection: "ids" },
      { name: "status", type: "string", connection: "transactionStatuses" },
    ]
  },
  "inventory-management": {
    name: "Inventory Management",
    fields: [
      { name: "itemId", type: "string", connection: "ids" },
      { name: "name", type: "string", connection: "productNames" },
      { name: "quantity", type: "number", connection: "quantities" },
      { name: "location", type: "string", connection: "cities" },
      { name: "lastUpdated", type: "date", connection: "dates" },
      { name: "category", type: "string", connection: "categories" },
    ]
  },
}

interface TemplatesSelectorProps {
  onTemplateSelect: (fields: Field[]) => void;
}

export function TemplatesSelector({ onTemplateSelect }: TemplatesSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Templates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Select onValueChange={(value) => onTemplateSelect(predefinedTemplates[value].fields)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Load template" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(predefinedTemplates).map(([key, template]) => (
                <SelectItem key={key} value={key}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Available templates include pre-configured fields for common use cases.</p>
          <p className="mt-2">Template categories:</p>
          <ul className="list-disc list-inside mt-1">
            <li>User Management - User profiles and authentication</li>
            <li>E-commerce - Products, orders, and inventory</li>
            <li>Blog/CMS - Posts, authors, and content</li>
            <li>Healthcare - Patient records and appointments</li>
            <li>Financial - Transactions and accounts</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}