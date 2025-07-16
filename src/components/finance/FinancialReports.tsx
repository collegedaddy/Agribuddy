
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Download, FileText, Calendar, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample financial data for reports
const monthlyFinancialData = [
  { month: 'Jan', income: 12000, expenses: 8500, profit: 3500 },
  { month: 'Feb', income: 14500, expenses: 9200, profit: 5300 },
  { month: 'Mar', income: 13800, expenses: 8900, profit: 4900 },
  { month: 'Apr', income: 18000, expenses: 11000, profit: 7000 },
  { month: 'May', income: 20500, expenses: 12500, profit: 8000 },
  { month: 'Jun', income: 19200, expenses: 13000, profit: 6200 },
];

const incomeBreakdown = [
  { name: 'Crop Sales', value: 65000 },
  { name: 'Livestock', value: 15000 },
  { name: 'Subsidies', value: 12000 },
  { name: 'Rentals', value: 8000 },
  { name: 'Services', value: 5000 },
];

const expenseBreakdown = [
  { name: 'Seeds', value: 12000 },
  { name: 'Fertilizer', value: 15000 },
  { name: 'Labor', value: 18000 },
  { name: 'Equipment', value: 9000 },
  { name: 'Fuel', value: 7000 },
  { name: 'Other', value: 2500 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export function FinancialReports() {
  const { toast } = useToast();
  const [reportType, setReportType] = useState("monthly");
  const [reportPeriod, setReportPeriod] = useState("6-months");
  const [activeTab, setActiveTab] = useState("overview");
  
  // Function to handle report download
  const handleDownloadReport = () => {
    toast({
      title: "Downloading report",
      description: `Your ${reportPeriod} ${reportType} report is being generated.`,
    });
    
    // In a real app, this would generate and download a PDF or Excel file
    setTimeout(() => {
      toast({
        title: "Report downloaded",
        description: "Your financial report has been downloaded successfully.",
      });
    }, 1500);
  };
  
  // Period options based on report type
  const getPeriodOptions = () => {
    if (reportType === "monthly") {
      return [
        { id: "3-months", name: "Last 3 Months" },
        { id: "6-months", name: "Last 6 Months" },
        { id: "12-months", name: "Last 12 Months" },
      ];
    } else if (reportType === "quarterly") {
      return [
        { id: "current-quarter", name: "Current Quarter" },
        { id: "last-quarter", name: "Last Quarter" },
        { id: "year-to-date", name: "Year to Date" },
      ];
    } else {
      return [
        { id: "current-year", name: "Current Year" },
        { id: "last-year", name: "Last Year" },
        { id: "custom", name: "Custom Range" },
      ];
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Financial Reports</CardTitle>
            <CardDescription>Generate and analyze farm financial reports</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleDownloadReport} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="space-y-2 w-full md:w-1/3">
              <label className="text-sm font-medium flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Report Type
              </label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Report</SelectItem>
                  <SelectItem value="quarterly">Quarterly Report</SelectItem>
                  <SelectItem value="annual">Annual Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 w-full md:w-1/3">
              <label className="text-sm font-medium flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Time Period
              </label>
              <Select value={reportPeriod} onValueChange={setReportPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  {getPeriodOptions().map(option => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 w-full md:w-1/3">
              <label className="text-sm font-medium flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Additional Filters
              </label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Apply filters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="crops">Crops Only</SelectItem>
                  <SelectItem value="livestock">Livestock Only</SelectItem>
                  <SelectItem value="subsidies">Subsidies Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="overview">Overall Performance</TabsTrigger>
              <TabsTrigger value="income">Income Analysis</TabsTrigger>
              <TabsTrigger value="expenses">Expense Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="p-0">
              <div className="bg-muted/40 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Financial Performance Over Time</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyFinancialData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `₹${value}`} />
                      <Legend />
                      <Line type="monotone" dataKey="income" stroke="#4ade80" strokeWidth={2} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="expenses" stroke="#f87171" strokeWidth={2} />
                      <Line type="monotone" dataKey="profit" stroke="#6366f1" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/40 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Key Financial Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Net Profit Margin</span>
                        <span className="text-sm font-bold text-green-500">32%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Return on Investment</span>
                        <span className="text-sm font-bold text-green-500">18%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Debt-to-Asset Ratio</span>
                        <span className="text-sm font-bold text-amber-500">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Cash Flow Coverage</span>
                        <span className="text-sm font-bold text-green-500">120%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/40 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Recommendations</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-100 border-l-4 border-green-500 rounded text-green-800">
                      <p className="text-sm font-medium">Crop Diversification</p>
                      <p className="text-xs">Adding 2-3 more crop varieties could increase revenue by 15-20%.</p>
                    </div>
                    
                    <div className="p-3 bg-amber-100 border-l-4 border-amber-500 rounded text-amber-800">
                      <p className="text-sm font-medium">Cost Management</p>
                      <p className="text-xs">Labor costs are 18% above regional average. Consider optimizing workforce.</p>
                    </div>
                    
                    <div className="p-3 bg-blue-100 border-l-4 border-blue-500 rounded text-blue-800">
                      <p className="text-sm font-medium">Subsidy Opportunity</p>
                      <p className="text-xs">You may qualify for equipment modernization subsidy worth up to ₹50,000.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="income" className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/40 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Income Sources</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={incomeBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {incomeBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${value}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-muted/40 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Monthly Income Trend</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyFinancialData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `₹${value}`} />
                        <Legend />
                        <Bar dataKey="income" fill="#4ade80" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-muted/40 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Income Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Crop Revenue Potential</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">+12% YoY</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Current crop yields are generating 82% of potential revenue based on market prices.
                      Opportunity exists to increase revenue by ₹15,000-20,000 through improved cultivation practices.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Seasonal Revenue Distribution</span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Attention Needed</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      73% of annual revenue occurs in Q2 and Q3, creating cash flow challenges during other periods.
                      Consider crop rotation strategies or alternative income sources to balance revenue throughout the year.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Government Subsidy Utilization</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Opportunity</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Currently utilizing 3 of 7 eligible farm subsidy programs. 
                      Additional subsidies worth approximately ₹35,000 may be available for organic farming initiatives
                      and water conservation projects.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="expenses" className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/40 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Expense Breakdown</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {expenseBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${value}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-muted/40 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Monthly Expense Trend</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyFinancialData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `₹${value}`} />
                        <Legend />
                        <Bar dataKey="expenses" fill="#f87171" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-muted/40 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Cost-Saving Opportunities</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Fertilizer Costs</span>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">28% Above Average</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Current fertilizer spending is ₹15,000 (28% above regional average).
                      Potential savings of ₹3,500-4,200 by optimizing application timing and adopting soil testing.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Labor Efficiency</span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Improvement Needed</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Labor costs account for 29% of total expenses (₹18,000).
                      Implementing better scheduling and task management could reduce costs by 15-20%.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Equipment Maintenance</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Well Managed</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Current maintenance spending is within optimal range at ₹7,000 annually.
                      Continue regular maintenance schedule to avoid costly repairs and extend equipment lifespan.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
