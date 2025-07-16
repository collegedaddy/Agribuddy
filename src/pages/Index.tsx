import { useState } from "react";
import { Dashboard } from "@/components/layout/Dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <Dashboard>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Farm Dashboard</h2>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 Tasks</div>
              <p className="text-xs text-muted-foreground">
                Check your farm tasks for today
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Crop Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Healthy</div>
              <p className="text-xs text-muted-foreground">
                Your crops are doing well
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 updates</div>
              <p className="text-xs text-muted-foreground">
                View recent updates and notifications
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Your Farm Dashboard</CardTitle>
              <CardDescription>
                Access all your farming tools and information in one place
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>This dashboard provides quick access to all the features you need to manage your farm efficiently. 
                 Navigate using the sidebar to access different tools and information.</p>
              <div className="mt-4 grid gap-2 grid-cols-1 md:grid-cols-2">
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="font-medium mb-1">Mandi Prices</h3>
                  <p className="text-sm text-gray-600">Check current market prices for your crops</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="font-medium mb-1">Farm Calendar</h3>
                  <p className="text-sm text-gray-600">Plan your farming activities</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="font-medium mb-1">Farming Schemes</h3>
                  <p className="text-sm text-gray-600">Get information about government schemes</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="font-medium mb-1">Chatbot Assistant</h3>
                  <p className="text-sm text-gray-600">Get farming advice and answers to your questions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Dashboard>
  );
};

export default Index;
