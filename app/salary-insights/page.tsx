"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalaryInsights() {
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");

  const mockSalaryData = [
    { month: "Jan", salary: 5000 },
    { month: "Mar", salary: 5200 },
    { month: "May", salary: 5500 },
    { month: "Jul", salary: 5800 },
    { month: "Sep", salary: 6000 },
    { month: "Nov", salary: 6200 },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">
        Salary Insights & Career Trends
      </h1>

      {/* Salary Analysis Section */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Target Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <Button className="w-full md:w-auto">Analyze Salary</Button>
        </CardContent>
      </Card>

      {/* Market Trends Section */}
      <Card>
        <CardHeader>
          <CardTitle>Market Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSalaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="salary" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Career Growth Section */}
      <Card>
        <CardHeader>
          <CardTitle>Career Growth Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Career Path" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="management">Management</SelectItem>
              <SelectItem value="specialist">Specialist</SelectItem>
            </SelectContent>
          </Select>

          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Recommended Skills</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Cloud Computing</li>
              <li>Data Analysis</li>
              <li>Project Management</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
