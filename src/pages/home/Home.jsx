import Header from "../../components/header/Header"
import HeroSection from '../../components/hero/HeroSection'
import PageContent from '../../components/sections/PageContent'
import FooterHome from '../../components/layout/Footer'
import { useMovies } from '../../hooks/useMovies'   
import { useAuth } from '../../hooks/useAuth'
import '../../styles/home.css';


function Home(){
    // login logic
    const { movies, series, isLoading } = useMovies();

    const topFiveMovies = movies ? movies.slice(0,5) : [];
    
    const { user, handleLogout } = useAuth();
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