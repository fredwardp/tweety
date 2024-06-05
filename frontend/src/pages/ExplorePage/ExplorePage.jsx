import ExploreDashboard from "../../components/ExploreDashboard/ExploreDashboard";
import Nav from "../../components/Nav/Nav";
import ProfileAside from "../../components/ProfileAside/ProfileAside";
import ProfileDashboard from "../../components/ProfileDashboard/ProfileDashboard";
import TrendsAside from "../../components/TrendsAside/TrendsAside";
import "./ExplorePage.css";
const ExplorePage = () => {
  return (
    <main className="profile-main">
      <Nav></Nav>
      <section className="container dashboard-wrapper">
        <ProfileAside />
        <ExploreDashboard />
        <TrendsAside />
      </section>
    </main>
  );
};

export default ExplorePage;
