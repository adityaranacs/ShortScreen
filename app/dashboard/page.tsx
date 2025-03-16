"use client";

import { useState } from "react";
import { Filter, Download } from "lucide-react";
import { AudienceDemographics } from "../../components/dashboard/audience-demographics";
import { ContentPerformanceChart } from "../../components/dashboard/content-performance-chart";
import { DashboardHeader } from "../../components/dashboard/dashboard-header";
import { DashboardShell } from "../../components/dashboard/dashboard-shell";
import { DateRangePicker } from "../../components/dashboard/date-range-picker";
import { EarningsHistory } from "../../components/dashboard/earnings-history";
import { EarningsOverview } from "../../components/dashboard/earnings-overview";
import { EngagementOverview } from "../../components/dashboard/engagement-overview";
import { RevenueSourcesChart } from "../../components/dashboard/revenue-sources-chart";
import { StatsCards } from "../../components/dashboard/stats-cards";
import { TargetSettingPanel } from "../../components/dashboard/target-setting-panel";
import { TopPerformingContent } from "../../components/dashboard/top-performing-content";
import { WithdrawalPanel } from "../../components/dashboard/withdrawal-panel";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { CreatorClipsTable } from "../../components/creator-clips-table";
import { CreatorEarningsChart } from "../../components/creator-earnings-chart";
import { CreatorEngagementChart } from "../../components/creator-engagement-chart";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card";

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState("30days");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardShell>
      <DashboardHeader />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div className="col-span-1 md:col-span-3 lg:col-span-4">
          <StatsCards />
        </div>

        <div className="col-span-1 md:col-span-3 lg:col-span-3">
          <Tabs
            defaultValue="overview"
            className="space-y-4"
            onValueChange={setActiveTab}
          >
            
            <Tabs defaultValue="earnings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="clips">Top Clips</TabsTrigger>
          </TabsList>

          <TabsContent value="earnings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Your earnings over the selected time period</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <CreatorEarningsChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Overview</CardTitle>
                <CardDescription>Your likes, comments, and shares over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <CreatorEngagementChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clips" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Clips</CardTitle>
                <CardDescription>Your most viewed and highest earning clips</CardDescription>
              </CardHeader>
              <CardContent>
                <CreatorClipsTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

            

            <TabsContent value="content" className="space-y-4">
              <ContentPerformanceChart />
              <TopPerformingContent />
            </TabsContent>

            <TabsContent value="audience" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <AudienceDemographics />
                <EngagementOverview />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="col-span-1">
          <div className="space-y-4">
            <WithdrawalPanel />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
