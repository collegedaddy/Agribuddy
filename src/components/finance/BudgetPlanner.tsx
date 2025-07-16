
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Pencil, Save, X, AlertTriangle, Check, TrendingUp } from "lucide-react";

// Sample budget categories
const budgetCategories = [
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

// Sample budget items for demonstration
const sampleBudgetItems = [
  { id: "1", category: "seeds", budgetAmount: 10000, spentAmount: 5000 },
  { id: "2", category: "fertilizer", budgetAmount: 8000, spentAmount: 3200 },
  { id: "3", category: "labor", budgetAmount: 15000, spentAmount: 12500 },
  { id: "4", category: "equipment", budgetAmount: 5000, spentAmount: 4800 },
  { id: "5", category: "fuel", budgetAmount: 6000, spentAmount: 2000 },
];

export function BudgetPlanner() {
  const { toast } = useToast();
  const [budgetItems, setBudgetItems] = useState(sampleBudgetItems);
  const [isAddingBudget, setIsAddingBudget] = useState(false);
  const [category, setCategory] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  
  // Function to add a new budget item
  const handleAddBudget = () => {
    if (!category || !budgetAmount || isNaN(Number(budgetAmount)) || Number(budgetAmount) <= 0) {
      toast({
        title: "Invalid input",
        description: "Please select a category and enter a valid budget amount.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if category already exists
    if (budgetItems.some(item => item.category === category)) {
      toast({
        title: "Category exists",
        description: "This category already has a budget allocated. Edit the existing one instead.",
        variant: "destructive",
      });
      return;
    }
    
    const newBudgetItem = {
      id: Date.now().toString(),
      category,
      budgetAmount: Number(budgetAmount),
      spentAmount: 0
    };
    
    setBudgetItems([...budgetItems, newBudgetItem]);
    
    // Reset form fields
    setCategory("");
    setBudgetAmount("");
    setIsAddingBudget(false);
    
    toast({
      title: "Budget added",
      description: "Your budget allocation has been added successfully.",
    });
  };
  
  // Function to start editing a budget item
  const startEditing = (id: string, currentValue: number) => {
    setEditingId(id);
    setEditValue(currentValue.toString());
  };
  
  // Function to save edited budget
  const saveEdit = (id: string) => {
    const value = Number(editValue);
    
    if (isNaN(value) || value <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid budget amount.",
        variant: "destructive",
      });
      return;
    }
    
    setBudgetItems(budgetItems.map(item => 
      item.id === id ? { ...item, budgetAmount: value } : item
    ));
    
    setEditingId(null);
    setEditValue("");
    
    toast({
      title: "Budget updated",
      description: "Your budget allocation has been updated.",
    });
  };
  
  // Function to cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };
  
  // Get category name from id
  const getCategoryName = (categoryId: string) => {
    const category = budgetCategories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };
  
  // Calculate budget metrics
  const totalBudget = budgetItems.reduce((sum, item) => sum + item.budgetAmount, 0);
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spentAmount, 0);
  const remainingBudget = totalBudget - totalSpent;
  const spentPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  
  return (
    <div className="space-y-6">
      {/* Budget summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalBudget.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Spent So Far</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</div>
            <Progress 
              value={spentPercentage} 
              className={`h-2 mt-2 ${spentPercentage > 90 ? "bg-red-500" : spentPercentage > 75 ? "bg-amber-500" : "bg-emerald-500"}`}
            />
            <p className="text-xs text-muted-foreground mt-1">{spentPercentage.toFixed(1)}% of total budget</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Remaining Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${remainingBudget < 0 ? "text-red-500" : "text-emerald-500"}`}>
              ₹{remainingBudget.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Budget allocation management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Budget Allocations</CardTitle>
            <CardDescription>Set and manage your spending limits</CardDescription>
          </div>
          <Button onClick={() => setIsAddingBudget(true)} className="ml-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Budget
          </Button>
        </CardHeader>
        <CardContent>
          {isAddingBudget && (
            <div className="bg-muted p-4 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="budget-category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetCategories
                        .filter(category => !budgetItems.some(item => item.category === category.id))
                        .map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget-amount">Budget Amount (₹)</Label>
                  <Input 
                    id="budget-amount" 
                    type="number" 
                    placeholder="0.00"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingBudget(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddBudget}>
                  Save Budget
                </Button>
              </div>
            </div>
          )}
          
          <div className="rounded-md border">
            <div className="px-4 py-3 font-medium border-b grid grid-cols-12">
              <div className="col-span-3">Category</div>
              <div className="col-span-3">Budget</div>
              <div className="col-span-2">Spent</div>
              <div className="col-span-2">Remaining</div>
              <div className="col-span-2">Progress</div>
            </div>
            {budgetItems.length === 0 ? (
              <div className="px-4 py-6 text-center text-muted-foreground">
                No budget allocations yet. Click "Add Budget" to get started.
              </div>
            ) : (
              <div className="divide-y">
                {budgetItems.map(item => {
                  const spentPercentage = (item.spentAmount / item.budgetAmount) * 100;
                  const remaining = item.budgetAmount - item.spentAmount;
                  
                  return (
                    <div key={item.id} className="px-4 py-3 grid grid-cols-12 items-center">
                      <div className="col-span-3 font-medium">
                        {getCategoryName(item.category)}
                      </div>
                      <div className="col-span-3">
                        {editingId === item.id ? (
                          <div className="flex items-center space-x-2">
                            <Input 
                              type="number" 
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="h-8"
                            />
                            <Button 
                              size="icon" 
                              variant="ghost"
                              onClick={() => saveEdit(item.id)}
                              className="h-8 w-8"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost"
                              onClick={cancelEdit}
                              className="h-8 w-8"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>₹{item.budgetAmount.toLocaleString()}</span>
                            <Button 
                              size="icon" 
                              variant="ghost"
                              onClick={() => startEditing(item.id, item.budgetAmount)}
                              className="h-6 w-6"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="col-span-2">
                        ₹{item.spentAmount.toLocaleString()}
                      </div>
                      <div className={`col-span-2 ${remaining < 0 ? "text-red-500" : ""}`}>
                        ₹{remaining.toLocaleString()}
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center space-x-2">
                          <Progress 
                            value={spentPercentage > 100 ? 100 : spentPercentage} 
                            className={`h-2 flex-1 ${
                              spentPercentage > 100 ? "bg-red-500" : 
                              spentPercentage > 90 ? "bg-amber-500" : 
                              "bg-emerald-500"
                            }`}
                          />
                          <span className="text-sm">
                            {spentPercentage.toFixed(0)}%
                          </span>
                          {spentPercentage > 100 && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
