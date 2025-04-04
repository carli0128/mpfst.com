import { useState } from "react"

export function Tabs({ defaultValue, children }: any) {
  const [tab, setTab] = useState(defaultValue)
  return <div>{React.Children.map(children, child => React.cloneElement(child, { tab, setTab }))}</div>
}

export function TabsList({ children }: any) {
  return <div className="flex gap-2 mb-4">{children}</div>
}

export function TabsTrigger({ value, children, setTab, tab }: any) {
  return (
    <button
      onClick={() => setTab(value)}
      className={`px-4 py-2 rounded ${
        tab === value ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"
      }`}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, tab, children }: any) {
  return tab === value ? <div>{children}</div> : null
}
