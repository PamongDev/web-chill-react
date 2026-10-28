import '../../styles/home.css';
import Header from '../../components/Header';
import HeroSection from '../../components/HeroSection'
import PageContent from '../../components/PageContent'
import FooterHome from '../../components/Footer'
import { useMovies } from '../../hooks/useMovies'
import { useAuth } from '../../hooks/useAuth'
import { useEffect, useMemo, useState } from 'react';


function Home(){
    // login logic
    const { movies, series, isLoading } = useMovies();

    const topFiveMovies = movies ? movies.slice(0,5) : [];
    const { user, handleLogout } = useAuth();
    const library = [...(movies || []), ...(series || [])];

    const randomIndex = Math.floor(Math.random() * library.length);
    const featuredMovie = library[randomIndex];
    
    if (!user) return null;   

    return(
        <>
        <Header username={user.username} email={user.email} handleLogout={handleLogout}></Header>
            <main>
            <HeroSection topFiveMovies={topFiveMovies} />
            <PageContent movies={movies} series={series} isLoading={isLoading}/>
            </main>
        <FooterHome/>
    </>)
}

export default Home;