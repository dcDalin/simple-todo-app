export default function AppLogo() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <img
        src="/app-logo.png"
        alt="simple todo app logo"
        className="w-16 h-auto md:w-20 lg:w-24"
      />
      <h1 className="text-3xl md:text-4xl font-bold">Rapptr Labs</h1>
    </div>
  );
}
