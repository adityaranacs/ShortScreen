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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <TabsList className="h-auto p-1">
                <TabsTrigger value="overview" className="text-xs sm:text-sm">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="earnings" className="text-xs sm:text-sm">
                  Earnings
                </TabsTrigger>
                <TabsTrigger value="content" className="text-xs sm:text-sm">
                  Content
                </TabsTrigger>
                <TabsTrigger value="audience" className="text-xs sm:text-sm">
                  Audience
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <DateRangePicker />
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
                <Button className="ml-auto sm:ml-0 bg-blue-900 hover:bg-blue-500 border-0 text-white h-9">
                  <Download className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Download Report</span>
                </Button>
              </div>
            </div>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <EarningsOverview />
                <EngagementOverview />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <RevenueSourcesChart />
                <ContentPerformanceChart />
              </div>
              <TopPerformingContent />
            </TabsContent>

            <TabsContent value="earnings" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <EarningsOverview />
                <RevenueSourcesChart />
              </div>
              <EarningsHistory />
            </TabsContent>

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
            <TargetSettingPanel />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
