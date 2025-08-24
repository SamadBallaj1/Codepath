export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16 border-t bg-white/80 backdrop-blur">
      <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/assets/codepath.svg" alt="CodePath" className="h-8 w-auto" />
          <span className="text-sm text-gray-600">Built for CodePath WEB103</span>
        </div>
        <div className="text-sm text-gray-600">© {year} Samad · All rights reserved.</div>
      </div>
    </footer>
  )
}