import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "@/pages/Home";
import LearningSpace from "@/pages/LearningSpace";

export default function App() {
  return (
    <Router>
      {/* 导航栏 */}
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🧸</span>
            <span className="font-bold text-lg text-pink-600">七七大王</span>
          </div>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-pink-600 font-medium">
              个人主页
            </Link>
            <Link to="/learning-space" className="text-gray-600 hover:text-pink-600 font-medium">
              学习空间
            </Link>
          </div>
        </div>
      </nav>
      
      {/* 主内容区 */}
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learning-space" element={<LearningSpace />} />
        </Routes>
      </div>
    </Router>
  );
}
