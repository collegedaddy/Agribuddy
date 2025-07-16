import { Dashboard } from "@/components/layout/Dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, MapPin, Languages, FileText, Save } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully saved.",
    });
  };

  return (
    <Dashboard>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
        
        <Tabs defaultValue="profile">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Settings Sidebar */}
            <Card className="md:w-[200px]">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <TabsList className="flex flex-col w-full rounded-none h-auto">
                  <TabsTrigger value="profile" className="justify-start py-2 px-4 rounded-none data-[state=active]:bg-muted">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="farm" className="justify-start py-2 px-4 rounded-none data-[state=active]:bg-muted">
                    <MapPin className="h-4 w-4 mr-2" />
                    Farm Details
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="justify-start py-2 px-4 rounded-none data-[state=active]:bg-muted">
                    <Languages className="h-4 w-4 mr-2" />
                    Preferences
                  </TabsTrigger>
                  <TabsTrigger value="data" className="justify-start py-2 px-4 rounded-none data-[state=active]:bg-muted">
                    <FileText className="h-4 w-4 mr-2" />
                    Data Management
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>
            
            <div className="flex-1">
              {/* Profile Settings */}
              <TabsContent value="profile" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="Rajesh Kumar" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+91 9876543210" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="rajesh.kumar@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Preferred Language</Label>
                        <Select defaultValue="hindi">
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="hindi">Hindi</SelectItem>
                            <SelectItem value="punjabi">Punjabi</SelectItem>
                            <SelectItem value="tamil">Tamil</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Farm Settings */}
              <TabsContent value="farm" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Farm Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select defaultValue="punjab">
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="punjab">Punjab</SelectItem>
                            <SelectItem value="haryana">Haryana</SelectItem>
                            <SelectItem value="up">Uttar Pradesh</SelectItem>
                            <SelectItem value="rajasthan">Rajasthan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="district">District</Label>
                        <Select defaultValue="ludhiana">
                          <SelectTrigger id="district">
                            <SelectValue placeholder="Select district" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ludhiana">Ludhiana</SelectItem>
                            <SelectItem value="amritsar">Amritsar</SelectItem>
                            <SelectItem value="jalandhar">Jalandhar</SelectItem>
                            <SelectItem value="patiala">Patiala</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="village">Village</Label>
                        <Input id="village" defaultValue="Kharar" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farmSize">Farm Size (Acres)</Label>
                        <Input id="farmSize" type="number" defaultValue="5" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Primary Crops</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <Button variant="outline" className="justify-start">Rice</Button>
                        <Button variant="outline" className="justify-start">Wheat</Button>
                        <Button variant="outline" className="justify-start">Cotton</Button>
                        <Button variant="outline" className="justify-start">Sugarcane</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Preferences Settings */}
              <TabsContent value="preferences" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>App Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="theme">Theme</Label>
                        <Select defaultValue="light">
                          <SelectTrigger id="theme">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System Default</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notifications">Notification Preferences</Label>
                        <Select defaultValue="all">
                          <SelectTrigger id="notifications">
                            <SelectValue placeholder="Select notification preference" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Notifications</SelectItem>
                            <SelectItem value="important">Important Only</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Data Management */}
              <TabsContent value="data" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Manage your data and account information.
                    </p>
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" className="justify-start">Export Your Data</Button>
                      <Button variant="outline" className="justify-start">Clear Local Storage</Button>
                      <Button variant="outline" className="justify-start text-red-500">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </Dashboard>
  );
};

export default Settings;
