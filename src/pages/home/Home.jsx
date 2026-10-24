import '../../styles/home.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import HeroSection from '../../components/HeroSection'
import PageContent from '../../components/PageContent'
import FooterHome from '../../components/Footer'
import { useMovies } from '../../hooks/useMovies'
import { useAuth } from '../../hooks/useAuth'


function Home(){
    // login logic
    const { movies, series, isLoading } = useMovies();
    const { user } = useAuth();
    
    if (!user) return null;   

    return(
        <>
        <Header username={user.username} email={user.email}></Header>
            <main>
            <HeroSection/>
            <PageContent movies={movies} series={series} isLoading={isLoading}/>
            </main>
        <FooterHome/>
    </>)
}

export default Home;