import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollTop from "./layout/ScrollTop";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import InfluencerLayout from "./pages/Influencers/InfluencerLayout";
import SingleInfluencer from "./pages/Influencers/SingleInfluencer";
import SharedLayout from "./layout/SharedLayout";
import Error from "./pages/Error";

function App() {
  return (
    <BrowserRouter>
      <ScrollTop>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/influencers" element={<InfluencerLayout />}>
              <Route index element={<SingleInfluencer />} />
              <Route path=":infName" element={<SingleInfluencer />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </ScrollTop>
    </BrowserRouter>
  );
}

export default App;
