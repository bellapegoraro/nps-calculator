'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0f172a', '#5222d0', '#8455ff'];

type Data = {
  name: string;
  value: number;
}[];

export default function Chart({ promotores, neutros, detratores }: { promotores: number, neutros: number, detratores: number }) {
  const data: Data = [
    { name: 'Detratores', value: detratores },
    { name: 'Neutros', value: neutros },
    { name: 'Promotores', value: promotores },
  ];

  return (
    <section style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percent }) => `${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    dataKey="value"
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
        </ResponsiveContainer>
    </section>
  );
}
