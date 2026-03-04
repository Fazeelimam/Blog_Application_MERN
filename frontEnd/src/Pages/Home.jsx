import React from "react";
import Navbar from "../Components/Navbar.jsx";
import Header from "../Components/Header.jsx";
import Bloglist from "../Components/BlogList.jsx";
import BlogCard from "../Components/BlogCard.jsx";
import NewsLetter from "../Components/NewsLetter.jsx";
import Footer from "../Components/Footer.jsx";

function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <Bloglist />
      <BlogCard />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default Home;
