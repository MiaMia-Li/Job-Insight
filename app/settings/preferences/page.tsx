import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Separator } from "../../../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Switch } from "../../../components/ui/switch";

export default function PreferencesSettings() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Preferences</h1>

      <div className="space-y-8">
        {/* Job Preferences */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Job Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Preferred Job Title</Label>
              <Input id="jobTitle" placeholder="e.g., Frontend Developer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Job Keywords</Label>
              <Input id="keywords" placeholder="React, TypeScript, etc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Target Salary</Label>
              <Input id="salary" type="number" placeholder="80000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Preferred Location</Label>
              <Input id="location" placeholder="City or Remote" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Interview Settings */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Interview Settings</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Interview Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="autoRecord" />
              <Label htmlFor="autoRecord">Auto-record interview sessions</Label>
            </div>
          </div>
        </div>

        <Separator />

        {/* Notification Preferences */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="jobAlerts" defaultChecked />
              <Label htmlFor="jobAlerts">Job Match Alerts</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="interviewReminders" defaultChecked />
              <Label htmlFor="interviewReminders">Interview Reminders</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="weeklyDigest" />
              <Label htmlFor="weeklyDigest">Weekly Progress Digest</Label>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button>Save Preferences</Button>
        </div>
      </div>
    </div>
  );
}
