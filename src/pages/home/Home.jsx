import '../../styles/home.css';
import Header from '../../components/Header';
import HeroSection from '../../components/HeroSection'
import PageContent from '../../components/PageContent'
import FooterHome from '../../components/Footer'
import { useMovies } from '../../hooks/useMovies'
import { useAuth } from '../../hooks/useAuth'


function Home(){
    // login logic
    const { movies, series, isLoading } = useMovies();
    const { user, handleLogout } = useAuth();
    
    if (!user) return null;   

    return(
        <>
        <Header username={user.username} email={user.email} handleLogout={handleLogout}></Header>
            <main>
            <HeroSection featuredMovie={movies[0]} />
            <PageContent movies={movies} series={series} isLoading={isLoading}/>
            </main>
        <FooterHome/>
    </>)
}

export default Home;