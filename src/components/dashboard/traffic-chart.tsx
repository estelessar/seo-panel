"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const data = [
  { name: '1 Şub', organikTrafik: 4000, aramalar: 2400 },
  { name: '2 Şub', organikTrafik: 3000, aramalar: 1398 },
  { name: '3 Şub', organikTrafik: 2000, aramalar: 9800 },
  { name: '4 Şub', organikTrafik: 2780, aramalar: 3908 },
  { name: '5 Şub', organikTrafik: 1890, aramalar: 4800 },
  { name: '6 Şub', organikTrafik: 2390, aramalar: 3800 },
  { name: '7 Şub', organikTrafik: 3490, aramalar: 4300 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-3 shadow-lg">
        <p className="mb-2 font-medium">{label}</p>
        {payload.map((pld: any) => (
          <div key={pld.dataKey} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: pld.color }} />
            <span className="text-sm text-muted-foreground">{pld.name}:</span>
            <span className="font-medium">{pld.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function TrafficChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="name" 
            className="text-xs text-muted-foreground"
          />
          <YAxis 
            className="text-xs text-muted-foreground"
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="organikTrafik" 
            name="Organik Trafik"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="aramalar" 
            name="Aramalar"
            stroke="hsl(var(--secondary))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
