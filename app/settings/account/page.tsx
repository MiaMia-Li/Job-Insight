import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Separator } from "../../../components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";

export default function AccountSettings() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <div className="space-y-8">
        {/* Profile Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Profile Information</h2>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button>Change Photo</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Resume Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Resume Management</h2>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">
              Current Resume: resume_v2.pdf
            </p>
            <Button>Upload New Resume</Button>
          </div>
        </div>

        <Separator />

        {/* Saved Jobs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Saved Jobs</h2>
          <div className="space-y-2">
            {/* Job items would be mapped here */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Senior Frontend Developer</h3>
              <p className="text-sm text-muted-foreground">Tech Corp Inc.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
