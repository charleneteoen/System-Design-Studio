"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface DataPoint {
  date: string
  general: number
  recyclable: number
}

interface AreaChartProps {
  data: DataPoint[]
  generalColor: string
  recyclableColor: string
  highlightDate: string
  highlightValue: number
  singleLine?: boolean
}

export function AreaChart({
  data,
  generalColor,
  recyclableColor,
  highlightDate,
  highlightValue,
  singleLine = false,
}: AreaChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const labels = data.map((d) => d.date)
    const generalData = data.map((d) => d.general)
    const recyclableData = data.map((d) => d.recyclable)

    const highlightIndex = labels.indexOf(highlightDate)

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "General",
            data: generalData,
            borderColor: generalColor,
            backgroundColor: `${generalColor}20`,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 0,
          },
          ...(!singleLine
            ? [
                {
                  label: "Recyclable",
                  data: recyclableData,
                  borderColor: recyclableColor,
                  backgroundColor: `${recyclableColor}20`,
                  tension: 0.4,
                  fill: true,
                  pointRadius: 0,
                  pointHoverRadius: 0,
                },
              ]
            : []),
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            mode: "index",
            intersect: false,
            backgroundColor: "#2d2d42",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#3d3d52",
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              color: "#6c7293",
            },
          },
          y: {
            min: 0,
            max: 4,
            grid: {
              color: "#2d2d4220",
              drawBorder: false,
            },
            ticks: {
              color: "#6c7293",
              stepSize: 1,
            },
          },
        },
        elements: {
          point: {
            radius: (context) => {
              const index = context.dataIndex
              return index === highlightIndex ? 4 : 0
            },
            backgroundColor: (context) => {
              const index = context.dataIndex
              return index === highlightIndex ? "#fff" : "transparent"
            },
            borderColor: (context) => {
              const index = context.dataIndex
              const datasetIndex = context.datasetIndex
              return index === highlightIndex ? (datasetIndex === 0 ? generalColor : recyclableColor) : "transparent"
            },
            borderWidth: 2,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, generalColor, recyclableColor, highlightDate, highlightValue, singleLine])

  return (
    <>
      <canvas ref={chartRef} />
      {highlightDate && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2d2d42] text-white px-3 py-1 rounded-md shadow-lg border border-[#3d3d52]">
          <div className="text-sm font-medium">{highlightDate}</div>
          <div className="text-lg font-bold">{highlightValue}</div>
        </div>
      )}
    </>
  )
}

