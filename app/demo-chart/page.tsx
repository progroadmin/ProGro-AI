"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useMemo } from "react";

export default function DemoChart() {
  const data = useMemo(
    () => [
      { name: "Jan", value: 12 },
      { name: "Feb", value: 18 },
      { name: "Mar", value: 9 },
      { name: "Apr", value: 22 },
      { name: "May", value: 15 },
      { name: "Jun", value: 28 },
    ],
    []
  );

  return (
    <main className="p-6">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Sample Line Chart</CardTitle>
        </CardHeader>
        <CardContent style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </main>
  );
}
