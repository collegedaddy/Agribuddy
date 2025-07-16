
import { useState } from "react";
import { Dashboard } from "@/components/layout/Dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialOverview } from "@/components/finance/FinancialOverview";
import { ExpenseTracker } from "@/components/finance/ExpenseTracker";
import { IncomeTracker } from "@/components/finance/IncomeTracker";
import { BudgetPlanner } from "@/components/finance/BudgetPlanner";
import { FinancialReports } from "@/components/finance/FinancialReports";

const FarmFinance = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Dashboard>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Farm Finance Management</h1>
          <p className="text-muted-foreground mt-2">
            Track, analyze, and manage your farm's financial health
          </p>
        </div>

        <Tabs 
          defaultValue="overview" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <TabsList className="bg-muted h-auto p-1">
              <TabsTrigger value="overview" className="px-4 py-2">Overview</TabsTrigger>
              <TabsTrigger value="expenses" className="px-4 py-2">Expenses</TabsTrigger>
              <TabsTrigger value="income" className="px-4 py-2">Income</TabsTrigger>
              <TabsTrigger value="budget" className="px-4 py-2">Budget</TabsTrigger>
              <TabsTrigger value="reports" className="px-4 py-2">Reports</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-0">
            <FinancialOverview />
          </TabsContent>
          
          <TabsContent value="expenses" className="mt-0">
            <ExpenseTracker />
          </TabsContent>
          
          <TabsContent value="income" className="mt-0">
            <IncomeTracker />
          </TabsContent>
          
          <TabsContent value="budget" className="mt-0">
            <BudgetPlanner />
          </TabsContent>
          
          <TabsContent value="reports" className="mt-0">
            <FinancialReports />
          </TabsContent>
        </Tabs>
      </div>
    </Dashboard>
  );
};

export default FarmFinance;
