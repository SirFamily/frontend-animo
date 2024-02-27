import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";

function App() {
  const {loading} = useAuth()

  if(loading) {
    return (
      <span class="loading loading-ring loading-lg"></span>
    )
  }

  return (
    <div className="min-h-screen">
      <AppRouter />
    </div>
  );
}

export default App;