import { useState, useMemo } from "react";
import { Dashboard } from "@/components/layout/Dashboard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Plus, Calendar as CalendarIcon, AlertTriangle, MapPin } from "lucide-react";

// Define the task type
interface FarmingTask {
  id: number;
  title: string;
  date: Date;
  type: string;
  status: string;
  location: string;
  notes: string;
  region?: string;
}

// Define the crop season type
interface SeasonalCrop {
  crop: string;
  season: string;
  sowingPeriod: string;
  harvestPeriod: string;
  region: string;
}

// Seasonal crops data with region support
const seasonalCrops: SeasonalCrop[] = [
  { crop: "Wheat", season: "Rabi", sowingPeriod: "October-November", harvestPeriod: "April-May", region: "north" },
  { crop: "Rice", season: "Kharif", sowingPeriod: "June-July", harvestPeriod: "November-December", region: "both" },
  { crop: "Mustard", season: "Rabi", sowingPeriod: "October-November", harvestPeriod: "February-March", region: "north" },
  { crop: "Cotton", season: "Kharif", sowingPeriod: "April-May", harvestPeriod: "October-November", region: "both" },
  { crop: "Gram", season: "Rabi", sowingPeriod: "October-November", harvestPeriod: "March-April", region: "north" },
  { crop: "Maize", season: "Kharif", sowingPeriod: "June-July", harvestPeriod: "September-October", region: "both" },
  { crop: "Groundnut", season: "Kharif", sowingPeriod: "June-July", harvestPeriod: "October-November", region: "south" },
  { crop: "Sugarcane", season: "Zaid", sowingPeriod: "February-March", harvestPeriod: "January-March", region: "both" },
  { crop: "Sorghum", season: "Kharif", sowingPeriod: "June-July", harvestPeriod: "October-November", region: "south" },
  { crop: "Coconut", season: "Perennial", sowingPeriod: "June-September", harvestPeriod: "Year-round", region: "south" },
];

const taskTypeColors: Record<string, string> = {
  "Fertilizing": "bg-green-100 text-green-800",
  "Irrigation": "bg-blue-100 text-blue-800",
  "Pest Control": "bg-red-100 text-red-800",
  "Harvesting": "bg-amber-100 text-amber-800",
  "Planting": "bg-purple-100 text-purple-800",
};

// Create hardcoded demo tasks
const createDemoTasks = (): FarmingTask[] => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const twoWeeksFromNow = new Date(today);
  twoWeeksFromNow.setDate(today.getDate() + 14);
  
  return [
    {
      id: 1,
      title: "Apply Fertilizer to Wheat Field",
      date: tomorrow,
      type: "Fertilizing",
      status: "upcoming",
      location: "North Field",
      notes: "Use NPK 20-20-20 fertilizer, 200kg/hectare",
      region: "north"
    },
    {
      id: 2,
      title: "Irrigate Rice Paddies",
      date: new Date(new Date().setDate(today.getDate() + 3)),
      type: "Irrigation",
      status: "upcoming",
      location: "East Field",
      notes: "Ensure water level is 5cm above soil",
      region: "north"
    },
    {
      id: 3,
      title: "Pesticide Application for Groundnut",
      date: nextWeek,
      type: "Pest Control",
      status: "upcoming",
      location: "South Field",
      notes: "Use organic neem-based pesticide",
      region: "south"
    },
    {
      id: 4,
      title: "Harvest Coconut",
      date: twoWeeksFromNow,
      type: "Harvesting",
      status: "upcoming",
      location: "Coconut Grove",
      notes: "Arrange for workers and transportation",
      region: "south"
    },
    {
      id: 5,
      title: "Rice Seedling Transplantation",
      date: new Date(new Date().setDate(today.getDate() + 5)),
      type: "Planting",
      status: "upcoming",
      location: "Main Field",
      notes: "Prepare paddy field one day before transplantation",
      region: "both"
    },
    {
      id: 6,
      title: "Wheat Field Preparation",
      date: new Date(new Date().setDate(today.getDate() + 10)),
      type: "Planting",
      status: "upcoming",
      location: "West Field",
      notes: "Ensure proper field leveling before sowing",
      region: "north"
    }
  ];
};

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [farmingTasks, setFarmingTasks] = useState<FarmingTask[]>(createDemoTasks());
  const [selectedRegion, setSelectedRegion] = useState("north");
  const [newTask, setNewTask] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    type: "",
    location: "",
    notes: "",
    region: "north"
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Determine current season based on date
  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1; // JavaScript months are 0-indexed
    
    // In India, Kharif is roughly June to October, Rabi is October to March
    if (month >= 6 && month <= 10) {
      return "Kharif (June-October)";
    } else if (month >= 10 || month <= 3) {
      return "Rabi (October-March)";
    } else {
      return "Zaid (March-June)";
    }
  };
  
  // Filter crops based on selected region
  const filteredCrops = useMemo(() => {
    return seasonalCrops.filter(crop => 
      crop.region === selectedRegion || crop.region === "both"
    );
  }, [selectedRegion]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSelectChange = (id: string, value: string) => {
    setNewTask({
      ...newTask,
      [id]: value
    });
  };
  
  const handleAddTask = () => {
    if (!newTask.title || !newTask.date || !newTask.type) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const newTaskItem: FarmingTask = {
      id: farmingTasks.length + 1,
      title: newTask.title,
      date: new Date(newTask.date),
      type: newTask.type,
      status: "upcoming",
      location: newTask.location || "Main Field",
      notes: newTask.notes || "",
      region: newTask.region
    };
    
    setFarmingTasks([...farmingTasks, newTaskItem]);
    
    // Reset form
    setNewTask({
      title: "",
      date: new Date().toISOString().split("T")[0],
      type: "",
      location: "",
      notes: "",
      region: selectedRegion
    });
    
    setIsDialogOpen(false);
    
    toast({
      title: "Task Added",
      description: `"${newTaskItem.title}" has been added to your calendar.`,
    });
  };
  
  const getTasksForSelectedDate = () => {
    if (!date) return [];
    
    return farmingTasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate.getDate() === date.getDate() &&
             taskDate.getMonth() === date.getMonth() &&
             taskDate.getFullYear() === date.getFullYear();
    });
  };
  
  const getFilteredTasks = () => {
    return farmingTasks.filter(task => 
      !task.region || task.region === selectedRegion || task.region === "both"
    ).sort((a, b) => a.date.getTime() - b.date.getTime());
  };
  
  const getNextTask = () => {
    const today = new Date();
    const filteredTasks = getFilteredTasks();
    
    return filteredTasks.find(task => 
      new Date(task.date).getTime() >= today.getTime()
    );
  };
  
  const hasTaskForDay = (day: Date) => {
    return farmingTasks.some(task => {
      const taskDate = new Date(task.date);
      return taskDate.getDate() === day.getDate() &&
             taskDate.getMonth() === day.getMonth() &&
             taskDate.getFullYear() === day.getFullYear();
    });
  };
  
  const nextTask = getNextTask();
  const selectedDateTasks = getTasksForSelectedDate();
  
  return (
    <Dashboard>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Farming Calendar</h2>
          <div className="flex items-center">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[180px] mr-2">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="north">North India</SelectItem>
                <SelectItem value="south">South India</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Farming Task</DialogTitle>
                  <DialogDescription>
                    Create a new task for your farming calendar.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title*
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={newTask.title}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date*
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={newTask.date}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type*
                    </Label>
                    <Select
                      value={newTask.type}
                      onValueChange={(value) => handleSelectChange("type", value)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select task type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fertilizing">Fertilizing</SelectItem>
                        <SelectItem value="Irrigation">Irrigation</SelectItem>
                        <SelectItem value="Pest Control">Pest Control</SelectItem>
                        <SelectItem value="Harvesting">Harvesting</SelectItem>
                        <SelectItem value="Planting">Planting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Location
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={newTask.location}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">
                      Notes
                    </Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={newTask.notes}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddTask}>Add Task</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-[300px_1fr]">
          <Card className="md:row-span-2">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>
                Current Season: <strong>{getCurrentSeason()}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  hasTask: (day) => hasTaskForDay(day)
                }}
                modifiersClassNames={{
                  hasTask: "border-2 border-agribuddy-primary"
                }}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tasks for {date?.toLocaleDateString()}</CardTitle>
              <CardDescription>
                View and manage your farming activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDateTasks.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateTasks.map((task) => (
                    <div key={task.id} className="flex items-start p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h4 className="font-medium">{task.title}</h4>
                          <Badge className={`ml-2 ${taskTypeColors[task.type] || ""}`}>
                            {task.type}
                          </Badge>
                        </div>
                        {task.location && (
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {task.location}
                          </div>
                        )}
                        {task.notes && (
                          <p className="text-sm mt-2">{task.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No tasks scheduled for this date.
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task for {date?.toLocaleDateString()}
              </Button>
            </CardFooter>
          </Card>
          
          <Tabs defaultValue="upcoming" className="col-span-full">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Tasks</TabsTrigger>
              <TabsTrigger value="crops">Seasonal Crops</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Tasks</CardTitle>
                  <CardDescription>
                    Tasks scheduled for the next 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {getFilteredTasks().map((task) => (
                        <div key={task.id} className="flex items-start p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h4 className="font-medium">{task.title}</h4>
                              <Badge className={`ml-2 ${taskTypeColors[task.type] || ""}`}>
                                {task.type}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {task.date.toLocaleDateString()}
                            </div>
                            {task.location && (
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {task.location}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="crops">
              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Crop Calendar</CardTitle>
                  <CardDescription>
                    Recommended crops for {selectedRegion === "north" ? "North" : "South"} India
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Crop</th>
                          <th className="py-2 px-4 text-left">Season</th>
                          <th className="py-2 px-4 text-left">Sowing Period</th>
                          <th className="py-2 px-4 text-left">Harvest Period</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCrops.map((crop, i) => (
                          <tr key={i} className="border-b">
                            <td className="py-2 px-4">{crop.crop}</td>
                            <td className="py-2 px-4">{crop.season}</td>
                            <td className="py-2 px-4">{crop.sowingPeriod}</td>
                            <td className="py-2 px-4">{crop.harvestPeriod}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {nextTask && (
            <Alert className="col-span-full bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Next Up: {nextTask.title}</AlertTitle>
              <AlertDescription className="text-green-700">
                Scheduled for {nextTask.date.toLocaleDateString()} ({nextTask.type} - {nextTask.location})
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Calendar;
