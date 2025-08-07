import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects_User from "./pages/Projects_User.jsx";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Contact from "./pages/Contact";
import Dashboard from "./admin/Dashboard";
import Projects from "./admin/Projects";
import Login from "./pages/Login";
import AdminRoute from "./components/AdminRoute.jsx";
import Blogs from "./admin/Blogs.jsx";
import ContactMessages from "./admin/ContactMessages.jsx";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Services from "./pages/Services.jsx";
import AddProject from "./admin/AddProject.jsx";
import AddBlog from "./admin/AddBlog.jsx";
import WatchMyYouTube from "./pages/WatchMyYouTube.jsx";
import YouTubeDetails from "./pages/YouTubeDetails.jsx";
import AddYouTube from "./admin/AddYouTube.jsx";
import ManageYouTube from "./admin/YouTube.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects_User />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/youtube" element={<WatchMyYouTube />} />
        <Route path="/youtube/:id" element={<YouTubeDetails />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-project"
          element={
            <AdminRoute>
              <AddProject />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <AdminRoute>
              <Projects />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-blog"
          element={
            <AdminRoute>
              <AddBlog />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <AdminRoute>
              <Blogs />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/contact-messages"
          element={
            <AdminRoute>
              <ContactMessages />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/youtube"
          element={
            <AdminRoute>
              <ManageYouTube />
            </AdminRoute>
          }
        />

        <Route
          path="admin/youtube/new"
          element={
            <AdminRoute>
              <AddYouTube />
            </AdminRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
