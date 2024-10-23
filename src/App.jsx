import MainContent from "./assets/Components/MainComponent/MainContent";
import SideBar from "./assets/Components/SideBar";

export default function App() {
  return (
    <>
    <div className="flex h-screen">
      <SideBar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
      <MainContent/>
      </main>
    </div>
    
      
    </>
  );
}
