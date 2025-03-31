/**
 * @file Logo.tsx - Defines the Logo component, which renders the application's logo.
 */

const Logo = () => {
  return (
    <div className="relative h-10 w-10">
      {/* <!-- Logo shape with gradient --> */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-blue-600 rounded-md shadow-sm"></div>

      {/* <!-- Stylized "IF" letters --> */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-6 h-6">
          {/* <!-- I letter --> */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-white rounded-full"></div>
          {/* <!-- F letter --> */}
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white rounded-full"></div>
          <div className="absolute top-0 left-1.5 right-0 h-1.5 bg-white rounded-full"></div>
          <div className="absolute top-1/2 transform -translate-y-1/2 left-1.5 right-2 h-1.5 bg-white rounded-full"></div>

          {/* <!-- Flow element --> */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full transform translate-y-1 opacity-80"></div>
        </div>
      </div>
    </div>
  )
}

export default Logo
