import React from 'react'
import Layout from '../components/Layout'
import HomeComp1 from '../components/HomeComp1'
import About from '../components/About'
import Contact from '../components/Contact'


const Home = () => {
  return (
    <Layout>
        <HomeComp1/>
        <About/>
        <Contact/>
    </Layout>
  )
}

export default Home