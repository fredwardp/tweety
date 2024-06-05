import { Link } from "react-router-dom";
import "./Home.css";
import Nav from "../../components/Nav/Nav";
import ProfileAside from "../../components/ProfileAside/ProfileAside";
import Dashboard from "../../components/Dasboard/Dashboard";
import TrendsAside from "../../components/TrendsAside/TrendsAside";

const Home = () => {
  return (
    <main className="home-main">
      <Nav></Nav>
      <section className="container dashboard-wrapper">
        <ProfileAside />
        <Dashboard />
        <TrendsAside />
      </section>
    </main>
  );
};

export default Home;
