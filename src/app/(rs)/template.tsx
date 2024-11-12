// The template rerenders every time 
// The layout only renders when the app loads 

export default async function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-appear">
      {children}
    </div>
  )
}

