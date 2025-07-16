
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2, CalendarIcon as CalendarIconLucide, Tag, IndianRupee } from "lucide-react";
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Sample expense categories
const expenseCategories = [
  { id: "seeds", name: "Seeds" },
  { id: "fertilizer", name: "Fertilizer" },
  { id: "pesticides", name: "Pesticides" },
  { id: "labor", name: "Labor" },
  { id: "equipment", name: "Equipment" },
  { id: "fuel", name: "Fuel" },
  { id: "irrigation", name: "Irrigation" },
  { id: "maintenance", name: "Maintenance" },
  { id: "rental", name: "Land Rental" },
  { id: "other", name: "Other" }
];

// Sample expenses for demonstration
const sampleExpenses = [
  { id: "1", date: new Date("2023-05-15"), category: "seeds", description: "Wheat seeds", amount: 5000 },
  { id: "2", date: new Date("2023-05-20"), category: "fertilizer", description: "NPK fertilizer", amount: 3200 },
  { id: "3", date: new Date("2023-05-25"), category: "labor", description: "Planting labor", amount: 2500 },
  { id: "4", date: new Date("2023-06-05"), category: "pesticides", description: "Insecticides", amount: 1800 },
  { id: "5", date: new Date("2023-06-10"), category: "fuel", description: "Tractor fuel", amount: 2000 },
];

export function ExpenseTracker() {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState(sampleExpenses);
  const [date, setDate] = useState<Date>(new Date());
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  
  // Function to handle adding a new expense
  const handleAddExpense = () => {
    if (!date || !category || !description || !amount || isNaN(Number(amount))) {
      toast({
        title: "Invalid input",
        description: "Please fill in all fields with valid values.",
        variant: "destructive",
      });
      return;
    }
    
    const newExpense = {
      id: Date.now().toString(),
      date,
      category,
      description,
      amount: Number(amount)
    };
    
    setExpenses([...expenses, newExpense]);
    
    // Reset form fields
    setDate(new Date());
    setCategory("");
    setDescription("");
    setAmount("");
    setIsAddingExpense(false);
    
    toast({
      title: "Expense added",
      description: "Your expense has been recorded successfully.",
    });
  };
  
  // Function to delete an expense
  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    
    toast({
      title: "Expense deleted",
      description: "The expense has been removed from your records.",
    });
  };
  
  // Get category name from id
  const getCategoryName = (categoryId: string) => {
    const category = expenseCategories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };
  
  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Expense Tracker</CardTitle>
            <CardDescription>Record and manage your farm expenses</CardDescription>
          </div>
          <Button onClick={() => setIsAddingExpense(true)} className="ml-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </CardHeader>
        <CardContent>
          {isAddingExpense && (
            <div className="bg-muted p-4 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="expense-date">Date</Label>
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
                  <Label htmlFor="expense-category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="expense-description">Description</Label>
                <Input 
                  id="expense-description" 
                  placeholder="Brief description of the expense"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="expense-amount">Amount (₹)</Label>
                <Input 
                  id="expense-amount" 
                  type="number" 
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingExpense(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddExpense}>
                  Save Expense
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
            {expenses.length === 0 ? (
              <div className="px-4 py-6 text-center text-muted-foreground">
                No expenses recorded yet. Click "Add Expense" to get started.
              </div>
            ) : (
              <div className="divide-y">
                {expenses.map(expense => (
                  <div key={expense.id} className="px-4 py-3 grid grid-cols-12 items-center">
                    <div className="col-span-2 flex items-center">
                      <CalendarIconLucide className="h-4 w-4 mr-2 text-muted-foreground" />
                      {format(expense.date, "dd/MM/yyyy")}
                    </div>
                    <div className="col-span-2 flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                      {getCategoryName(expense.category)}
                    </div>
                    <div className="col-span-5">{expense.description}</div>
                    <div className="col-span-2 text-right flex items-center justify-end">
                      <IndianRupee className="h-4 w-4 mr-1 text-muted-foreground" />
                      {expense.amount.toLocaleString()}
                    </div>
                    <div className="col-span-1 text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteExpense(expense.id)}
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
            Showing {expenses.length} expenses
          </div>
          <div className="font-semibold">
            Total: ₹{totalExpenses.toLocaleString()}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
