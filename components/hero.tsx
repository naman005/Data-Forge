import { Database, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <div className="py-24 text-center overflow-hidden">
      <div 
        className="flex items-center justify-center mb-10"
        style={{
          animation: "fadeInScale 0.6s ease-out forwards",
        }}
      >
        <div className="relative">
          <Database className="w-20 h-20 text-primary" strokeWidth={1.5} />
          <Sparkles 
            className="w-8 h-8 text-primary absolute -right-2 -top-2" 
            strokeWidth={1.5}
            style={{
              animation: "sparkle 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
      <div className="space-y-8 px-4">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-br from-primary via-primary/90 to-primary/50 text-transparent bg-clip-text leading-[1.25] font-space-grotesk"
          style={{
            
            animation: "slideUp 0.5s ease-out forwards",
            opacity: 0,
            transform: "translateY(20px)",
            paddingBottom: "0.2em",
            
          }}
        >
          Generate Fake Data Instantly
        </h1>
       
        <p 
          className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          style={{
            animation: "slideUp 0.5s ease-out 0.1s forwards",
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          DataForge allows developers and testers to effortlessly generate customizable
          and realistic fake data for applications, websites, and simulations in just seconds.
        </p>       
      </div>
    </div>
  )
}
