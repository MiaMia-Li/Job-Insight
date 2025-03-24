import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
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
import { LineChart, DollarSign, Briefcase, GraduationCap } from "lucide-react";

export default function MarketInsights() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Market Insights</h1>
        <p className="text-muted-foreground">
          Analyze salary trends and career opportunities to make informed
          decisions
        </p>
      </div>

      <Tabs defaultValue="salary" className="space-y-4">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 lg:max-w-[600px]">
          <TabsTrigger value="salary">Salary Analysis</TabsTrigger>
          <TabsTrigger value="trends">Industry Trends</TabsTrigger>
          <TabsTrigger value="growth">Career Growth</TabsTrigger>
        </TabsList>

        <TabsContent value="salary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Target Position Salary Analysis</CardTitle>
              <CardDescription>
                Get salary insights for your target position and location
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label>Position</label>
                  <Input placeholder="e.g. Software Engineer" />
                </div>
                <div className="space-y-2">
                  <label>Location</label>
                  <Input placeholder="e.g. San Francisco, CA" />
                </div>
              </div>
              <Button className="w-full md:w-auto">Analyze Salary</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Industry Trends Analysis</CardTitle>
              <CardDescription>
                Explore market demands and skill requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label>Industry</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Placeholder for trend charts */}
              <div className="h-[300px] rounded-lg border border-dashed flex items-center justify-center">
                <p className="text-muted-foreground">
                  Trend visualization will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Career Growth Recommendations</CardTitle>
              <CardDescription>
                AI-powered suggestions for skill development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-4 w-4" />
                      <CardTitle className="text-lg">
                        Technical Skills
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>Advanced Data Structures</li>
                      <li>Cloud Architecture</li>
                      <li>Machine Learning Basics</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4" />
                      <CardTitle className="text-lg">Career Paths</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>Senior Developer</li>
                      <li>Technical Lead</li>
                      <li>Solution Architect</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <LineChart className="h-4 w-4" />
                      <CardTitle className="text-lg">Growth Areas</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>Leadership Skills</li>
                      <li>System Design</li>
                      <li>Project Management</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
