const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="relative h-7 w-7">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-md shadow-sm"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-5 h-5">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-white rounded-full"></div>
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white rounded-full"></div>
            <div className="absolute top-0 left-1.5 right-0 h-1.5 bg-white rounded-full"></div>
            <div className="absolute top-1/2 transform -translate-y-1/2 left-1.5 right-2 h-1.5 bg-white rounded-full"></div>

            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full transform translate-y-1 opacity-80"></div>
          </div>
        </div>
      </div>

      <h2 className="ml-3 text-xl font-bold text-blue-400">InvoiceFlow</h2>
    </div>
  )
}

export default Logo
