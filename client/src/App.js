import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from 'react-router-dom';

import { useAuth, AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import About from './pages/About';
import ContactUs from './pages/Contact';
import Login from './pages/Login';
import DetailsPage from './pages/Details';
//import LiveClasses from './pages/LiveClasses';
import Dashboard from './pages/Dashboard';
import ProfilePage from './components/ProfilePage';

import JeeFoundation from './pages/Course/JeeFoundation';
import JeeMainCrash from './pages/Course/JeeMainCrash';
import JeeMainAdvanced from './pages/Course/JeeMainAdvanced';
import JeeTestSeries from './pages/Course/JeeTestSeries';
import JeeDoubtRevision from './pages/Course/JeeDoubtRevision';

import NeetFoundation from './pages/Course/NeetFoundation';
import Neet2025 from './pages/Course/Neet2025';
import Neet2026 from './pages/Course/Neet2026';
import NeetCrash from './pages/Course/NeetCrash';
import NeetTestSeries from './pages/Course/NeetTestSeries';

import Class1to5 from './pages/Course/Class1to5';
import Class6to8 from './pages/Course/Class6to8';
import Class9to10 from './pages/Course/Class9to10';
import Class11to12 from './pages/Course/Class11to12';
import LiveRecorded from './pages/Course/LiveRecorded';
import McqNotesPyq from './pages/Course/McqNotesPyq';

import MyCourses from './pages/MyCourses';
import OrderSummary from './pages/OrderSummary';
import PurchaseSuccess from './pages/PurchaseSuccess';
import LiveClasses from './pages/LiveClasses';
import LiveRoom from './pages/LiveRoom';
import DetailsRoute from './components/DetailsRoute';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCourses from './pages/admin/AdminCourses';
import AdminLive from './pages/admin/AdminLive';
import './App.css';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// PrivateRoute component to protect routes
const PrivateRoute = ({ children, redirectTo = '/login' }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to={redirectTo} replace />;
};

// NewUserRoute component to protect details page for new users only
const NewUserRoute = ({ children }) => {
  const { user, isNewUser } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return isNewUser ? children : <Navigate to="/dashboard" replace />;
};

// ExistingUserRoute to block new users from dashboard/profile etc
const ExistingUserRoute = ({ children }) => {
  const { user, isNewUser } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return !isNewUser ? children : <Navigate to="/details" replace />;
};

const AppRoutes = () => {
  const { user, isNewUser } = useAuth();
  const [purchasedCourses, setPurchasedCourses] = useState(() => {
    const saved = localStorage.getItem('purchasedCourses');
    return saved ? JSON.parse(saved) : [];
  });

  const handleCoursePurchase = (course) => {
    const updatedCourses = [...purchasedCourses, course];
    setPurchasedCourses(updatedCourses);
    localStorage.setItem('purchasedCourses', JSON.stringify(updatedCourses));
  };

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header />
      <main className="app-main">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/live" element={<LiveClasses />} />
        <Route path="/live/room/:room" element={<LiveRoom />} />
        <Route
          path="/courses/:id"
          element={<CourseDetails onPurchase={handleCoursePurchase} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <AdminRoute>
              <AdminCourses />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/live"
          element={
            <AdminRoute>
              <AdminLive />
            </AdminRoute>
          }
        />

        {/* Authentication pages: redirect logged-in users */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={isNewUser ? '/details' : '/dashboard'} replace />}
        />

        {/* Protected routes */}
        <Route
          path="/details"
          element={
            <NewUserRoute>
              <DetailsPage />
            </NewUserRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ExistingUserRoute>
              <Dashboard />
            </ExistingUserRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ExistingUserRoute>
              <ProfilePage />
            </ExistingUserRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <PrivateRoute>
              <MyCourses purchasedCourses={purchasedCourses} />
            </PrivateRoute>
          }
        />
        <Route
          path="/order-summary"
          element={
            <PrivateRoute>
              <OrderSummary />
            </PrivateRoute>
          }
        />

        <Route
          path="/purchase-success"
          element={
            <PrivateRoute>
              <PurchaseSuccess />
            </PrivateRoute>
          }
        />

        {/* Course detail pages */}
        <Route path="/course/jee-foundation" element={<JeeFoundation />} />
        <Route path="/course/jee-main-crash" element={<JeeMainCrash />} />
        <Route path="/course/jee-main-advanced" element={<JeeMainAdvanced />} />
        <Route path="/course/jee-test-series" element={<JeeTestSeries />} />
        <Route path="/course/jee-doubt-revision" element={<JeeDoubtRevision />} />

        <Route path="/course/neet-foundation" element={<NeetFoundation />} />
        <Route path="/course/neet-2025" element={<Neet2025 />} />
        <Route path="/course/neet-2026" element={<Neet2026 />} />
        <Route path="/course/neet-crash" element={<NeetCrash />} />
        <Route path="/course/neet-test-series" element={<NeetTestSeries />} />

        <Route path="/course/class-1-5" element={<Class1to5 />} />
        <Route path="/course/class-6-8" element={<Class6to8 />} />
        <Route path="/course/class-9-10" element={<Class9to10 />} />
        <Route path="/course/class-11-12" element={<Class11to12 />} />
        <Route path="/course/live-recorded" element={<LiveRecorded />} />
        <Route path="/course/mcq-notes-pyq" element={<McqNotesPyq />} />
    {/* Only show details page to new users */}
    <Route path="/complete-profile" element={<DetailsRoute />} />

{/* Protected Dashboard */}
<Route
            path="/details"
            element={
              <ProtectedRoute>
                <DetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div style={{ padding: '3rem', textAlign: 'center', fontSize: '1.5rem' }}>
              404 – Page Not Found
            </div>
          }
        />
      </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
