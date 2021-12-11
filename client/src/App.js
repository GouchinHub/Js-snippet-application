import "./App.css";
import SnippetList from "./components/SnippetList.jsx";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <header className="App-header">
          <p>Snippets</p>
          <div>
            <SnippetList />
          </div>
        </header>
      </QueryClientProvider>
    </div>
  );
}

export default App;
