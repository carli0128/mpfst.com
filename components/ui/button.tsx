export function Button({ children, onClick, variant = "default" }: any) {
  const base = "inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium shadow-sm"
  const variants: any = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
  }
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  )
}
