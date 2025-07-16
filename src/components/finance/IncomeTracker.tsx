
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2, CalendarIcon as CalendarIconLucide, Tag, IndianRupee } from "lucide-react";
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Sample income categories
const incomeCategories = [
  { id: "crop_sale", name: "Crop Sale" },
  { id: "livestock", name: "Livestock" },
  { id: "dairy", name: "Dairy Products" },
  { id: "subsidy", name: "Government Subsidy" },
  { id: "rental", name: "Land Rental" },
  { id: "services", name: "Farm Services" },
  { id: "other", name: "Other" }
];

// Sample income sources for demonstration
const sampleIncome = [
  { id: "1", date: new Date("2023-05-25"), category: "crop_sale", description: "Wheat harvest sale", amount: 15000 },
  { id: "2", date: new Date("2023-06-02"), category: "subsidy", description: "Fertilizer subsidy", amount: 3500 },
  { id: "3", date: new Date("2023-06-10"), category: "dairy", description: "Milk sales", amount: 7500 },
  { id: "4", date: new Date("2023-06-15"), category: "services", description: "Tractor rental", amount: 2500 },
];

export function IncomeTracker() {
  const { toast } = useToast();
  const [incomeRecords, setIncomeRecords] = useState(sampleIncome);
  const [date, setDate] = useState<Date>(new Date());
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [isAddingIncome, setIsAddingIncome] = useState(false);
  
  // Function to handle adding a new income record
  const handleAddIncome = () => {
    if (!date || !category || !description || !amount || isNaN(Number(amount))) {
      toast({
        title: "Invalid input",
        description: "Please fill in all fields with valid values.",
        variant: "destructive",
      });
      return;
    }
    
    const newIncome = {
      id: Date.now().toString(),
      date,
      category,
      description,
      amount: Number(amount)
    };
    
    setIncomeRecords([...incomeRecords, newIncome]);
    
    // Reset form fields
    setDate(new Date());
    setCategory("");
    setDescription("");
    setAmount("");
    setIsAddingIncome(false);
    
    toast({
      title: "Income recorded",
      description: "Your income has been recorded successfully.",
    });
  };
  
  // Function to delete an income record
  const handleDeleteIncome = (id: string) => {
    setIncomeRecords(incomeRecords.filter(income => income.id !== id));
    
    toast({
      title: "Record deleted",
      description: "The income record has been removed.",
    });
  };
  
  // Get category name from id
  const getCategoryName = (categoryId: string) => {
    const category = incomeCategories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };
  
  // Calculate total income
  const totalIncome = incomeRecords.reduce((sum, income) => sum + income.amount, 0);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Income Tracker</CardTitle>
            <CardDescription>Record and manage your farm income</CardDescription>
          </div>
          <Button onClick={() => setIsAddingIncome(true)} className="ml-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Income
          </Button>
        </CardHeader>
        <CardContent>
          {isAddingIncome && (
            <div className="bg-muted p-4 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="income-date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIconLucide className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => newDate && setDate(newDate)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income-category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {incomeCategories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="income-description">Description</Label>
                <Input 
                  id="income-description" 
                  placeholder="Brief description of the income"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="income-amount">Amount (₹)</Label>
                <Input 
                  id="income-amount" 
                  type="number" 
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingIncome(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddIncome}>
                  Save Income
                </Button>
              </div>
            </div>
          )}
          
          <div className="rounded-md border">
            <div className="px-4 py-3 font-medium border-b grid grid-cols-12">
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-5">Description</div>
              <div className="col-span-2 text-right">Amount</div>
              <div className="col-span-1"></div>
            </div>
            {incomeRecords.length === 0 ? (
              <div className="px-4 py-6 text-center text-muted-foreground">
                No income recorded yet. Click "Add Income" to get started.
              </div>
            ) : (
              <div className="divide-y">
                {incomeRecords.map(income => (
                  <div key={income.id} className="px-4 py-3 grid grid-cols-12 items-center">
                    <div className="col-span-2 flex items-center">
                      <CalendarIconLucide className="h-4 w-4 mr-2 text-muted-foreground" />
                      {format(income.date, "dd/MM/yyyy")}
                    </div>
                    <div className="col-span-2 flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                      {getCategoryName(income.category)}
                    </div>
                    <div className="col-span-5">{income.description}</div>
                    <div className="col-span-2 text-right flex items-center justify-end">
                      <IndianRupee className="h-4 w-4 mr-1 text-muted-foreground" />
                      {income.amount.toLocaleString()}
                    </div>
                    <div className="col-span-1 text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteIncome(income.id)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {incomeRecords.length} records
          </div>
          <div className="font-semibold">
            Total: ₹{totalIncome.toLocaleString()}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
