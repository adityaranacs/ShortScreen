"use client"
import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Sparkles, Flame, TrendingUp, Zap, Film, Tv } from 'lucide-react'
import Link from "next/link"
import { MainNav } from "../components/main-nav"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ClipPreview } from "../components/clip-player"
import { SeriesCard } from "../components/series-card"
import { MoviePoster } from "../components/movie-poster"



// Featured clips (regular landscape videos)
const featuredClips = [
  {
    id: "1",
    title: "The Midnight Chronicles",
    creator: "VisualStorysmith",
    views: 1876500,
    likes: 92340,
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
    creatorAvatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    category: "Thriller",
  },
  {
    id: "2",
    title: "Neon City Nights",
    creator: "CyberpunkDirector",
    views: 2145000,
    likes: 103250,
    thumbnail: "https://images.unsplash.com/photo-1493804714600-6edb1cd93080",
    creatorAvatar: "https://images.unsplash.com/photo-1519638399535-1b036603ac77",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    category: "Sci-Fi",
  },
  {
    id: "3",
    title: "Beyond the Horizon",
    creator: "CosmicVisions",
    views: 935000,
    likes: 78500,
    thumbnail: "https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf",
    creatorAvatar: "https://images.unsplash.com/photo-1518709594023-6ebd2b2b69c4",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    category: "Adventure",
  },
  {
    id: "4",
    title: "Faded Memories",
    creator: "VintageFilms",
    views: 1568000,
    likes: 127500,
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
    creatorAvatar: "https://images.unsplash.com/photo-1487174244970-cd18784bb4a4",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    category: "Drama",
  },
  {
    id: "5",
    title: "Silent Shadows",
    creator: "NoirCinema",
    views: 2340000,
    likes: 158900,
    thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
    creatorAvatar: "https://images.unsplash.com/photo-1542204165-65bf26472b9b",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    category: "Mystery",
  },
  {
    id: "7",
    title: "Dreams of Mars",
    creator: "SpaceExplorer",
    views: 1920000,
    likes: 132000,
    thumbnail: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9",
    creatorAvatar: "https://images.unsplash.com/photo-1581822261290-991b38693d1b",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    category: "Sci-Fi",
  },
  {
    id: "8",
    title: "Whispers in the Dark",
    creator: "HorrorMaster",
    views: 890000,
    likes: 76300,
    thumbnail: "https://images.unsplash.com/photo-1535016120720-40c646be5580",
    creatorAvatar: "https://images.unsplash.com/photo-1542185546-1866f643f368",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    category: "Horror",
  },
  {
    id: "9",
    title: "Desert Odyssey",
    creator: "WanderlustFilms",
    views: 1450000,
    likes: 94200,
    thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
    creatorAvatar: "https://images.unsplash.com/photo-1553481187-be93c21490a9",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    category: "Adventure",
  },
  {
    id: "10",
    title: "Echoes of Tomorrow",
    creator: "FuturistDirector",
    views: 2580000,
    likes: 187000,
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    creatorAvatar: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    category: "Sci-Fi",
  },
  {
    id: "11",
    title: "The Last Stand",
    creator: "ActionHero",
    views: 1230000,
    likes: 108500,
    thumbnail: "https://images.unsplash.com/photo-1507924538820-ede94a04019d",
    creatorAvatar: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    category: "Action",
  },
  {
    id: "12",
    title: "Urban Legends",
    creator: "CityTales",
    views: 675000,
    likes: 59800,
    thumbnail: "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34",
    creatorAvatar: "https://images.unsplash.com/photo-1570610155223-66279ba81b41",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    category: "Mystery",
  },
  {
    id: "13",
    title: "Infinite Cosmos",
    creator: "GalacticStudios",
    views: 1890000,
    likes: 145200,
    thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
    creatorAvatar: "https://images.unsplash.com/photo-1543286386-713bdd548da4",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    category: "Sci-Fi",
  },
  {
    id: "14",
    title: "Golden Hour",
    creator: "SunsetCinema",
    views: 945000,
    likes: 82700,
    thumbnail: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d",
    creatorAvatar: "https://images.unsplash.com/photo-1506102383123-c8ef1e872756",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    category: "Drama",
  },
  {
    id: "15",
    title: "Neon Rain",
    creator: "NightlifeDirector",
    views: 2120000,
    likes: 168500,
    thumbnail: "https://images.unsplash.com/photo-1520034475321-cbe63696469a",
    creatorAvatar: "https://images.unsplash.com/photo-1542791851-97dcc10e5b56",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    category: "Action",
  },
  {
    id: "16",
    title: "Ancient Mysteries",
    creator: "HistoricJourneys",
    views: 1370000,
    likes: 112300,
    thumbnail: "https://images.unsplash.com/photo-1496275068113-fff8c90750d1",
    creatorAvatar: "https://images.unsplash.com/photo-1499334650700-42e4f7ffc63d",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    category: "Documentary",
  },
]

// New portrait mode series
const portraitSeries = [
  {
    id: "stranger-things",
    title: "Stranger Things",
    creator: "NetflixOriginals",
    episodes: 8,
    seasons: 4,
    views: 15250000,
    likes: 985000,
    thumbnail: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=500&h=800&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?w=800&h=500&fit=crop",
    creatorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop",
    description:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    category: "Sci-Fi",
    isPortrait: true,
    year: 2016,
    rating: "TV-14",
  },
  
  {
    id: "breaking-bad",
    title: "Breaking Bad",
    creator: "AMCOriginals",
    episodes: 62,
    seasons: 5,
    views: 18500000,
    likes: 1285000,
    thumbnail: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=500&h=800&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=800&h=500&fit=crop",
    creatorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop",
    description:
      "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family's future.",
    category: "Drama",
    isPortrait: true,
    year: 2008,
    rating: "TV-MA",
  },
  {
    id: "the-witcher",
    title: "The Witcher",
    creator: "NetflixOriginals",
    episodes: 16,
    seasons: 2,
    views: 14200000,
    likes: 925000,
    thumbnail: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=500&h=800&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=500&fit=crop",
    creatorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop",
    description:
      "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    category: "Fantasy",
    isPortrait: true,
    year: 2019,
    rating: "TV-MA",
  },
  {
    id: "squid-game",
    title: "Squid Game",
    creator: "NetflixOriginals",
    episodes: 9,
    seasons: 1,
    views: 22500000,
    likes: 1485000,
    thumbnail: "https://images.unsplash.com/photo-1634157703702-3c124b455499?w=500&h=800&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1635002964051-aacc233a8290?w=800&h=500&fit=crop",
    creatorAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop",
    description:
      "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
    category: "Thriller",
    isPortrait: true,
    year: 2021,
    rating: "TV-MA",
  },
]

// Movie posters in landscape mode
const moviePosters = [
  {
    id: "inception",
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    rating: "PG-13",
    duration: "2h 28m",
    poster: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&h=450&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=600&fit=crop",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genre: "Sci-Fi",
    stars: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
  },
  {
    id: "interstellar",
    title: "Interstellar",
    director: "Christopher Nolan",
    year: 2014,
    rating: "PG-13",
    duration: "2h 49m",
    poster: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=450&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: "Sci-Fi",
    stars: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
  },
  {
    id: "blade-runner",
    title: "Blade Runner 2049",
    director: "Denis Villeneuve",
    year: 2017,
    rating: "R",
    duration: "2h 44m",
    poster: "https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=800&h=450&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1493804714600-6edb1cd93080?w=1200&h=600&fit=crop",
    description:
      "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.",
    genre: "Sci-Fi",
    stars: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
  },
  {
    id: "dune",
    title: "Dune",
    director: "Denis Villeneuve",
    year: 2021,
    rating: "PG-13",
    duration: "2h 35m",
    poster: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=450&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?w=1200&h=600&fit=crop",
    description:
      "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
    genre: "Sci-Fi",
    stars: ["Timothée Chalamet", "Rebecca Ferguson", "Zendaya"],
  },
  {
    id: "joker",
    title: "Joker",
    director: "Todd Phillips",
    year: 2019,
    rating: "R",
    duration: "2h 2m",
    poster: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=800&h=450&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=600&fit=crop",
    description:
      "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
    genre: "Drama",
    stars: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
  },
  {
    id: "parasite",
    title: "Parasite",
    director: "Bong Joon Ho",
    year: 2019,
    rating: "R",
    duration: "2h 12m",
    poster: "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?w=800&h=450&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=1200&h=600&fit=crop",
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    genre: "Thriller",
    stars: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
  },
]

// Updated trending hashtags
const trendingHashtags = [
  { name: "#CinematicEdits", count: "3.2M" },
  { name: "#ThrillerFilms", count: "2.5M" },
  { name: "#SciFiSeries", count: "2.1M" },
  { name: "#ActionShorts", count: "1.9M" },
  { name: "#MysteryClips", count: "1.7M" },
  { name: "#DramaScenes", count: "1.4M" },
]

// Updated categories
const categories = [
  { name: "For You", icon: Sparkles },
  { name: "Trending", icon: TrendingUp },
  { name: "Action", icon: Flame },
  { name: "Sci-Fi", icon: Zap },
]

export default function Home() {
  const featuredScrollRef = useRef<HTMLDivElement>(null)
  const seriesScrollRef = useRef<HTMLDivElement>(null)
  const movieScrollRef = useRef<HTMLDivElement>(null)
  const [autoScrollPaused, setAutoScrollPaused] = useState(false)
  const [activeCategory, setActiveCategory] = useState("For You")
  const [showConfetti, setShowConfetti] = useState(false)

  // Auto-scroll functionality - client-side only
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (typeof window !== "undefined" && featuredScrollRef.current) {
      const start = () => {
        if (autoScrollPaused || !featuredScrollRef.current) return

        let scrollAmount = 0
        const distance = 1
        const scrollWidth = featuredScrollRef.current.scrollWidth
        const clientWidth = featuredScrollRef.current.clientWidth

        const autoScroll = () => {
          if (!featuredScrollRef.current || autoScrollPaused) return

          scrollAmount += distance
          featuredScrollRef.current.scrollLeft = scrollAmount

          if (scrollAmount >= scrollWidth - clientWidth) {
            scrollAmount = 0
          }
        }

        interval = setInterval(autoScroll, 50)
      }

      start()
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [autoScrollPaused])

  // Pause auto-scroll on hover or touch
  const pauseAutoScroll = () => setAutoScrollPaused(true)
  const resumeAutoScroll = () => setAutoScrollPaused(false)

  const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[#0c0a09] text-white">
      <MainNav />

      {/* Confetti effect - client-side only */}
      {showConfetti && typeof window !== "undefined" && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-5%`,
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  borderRadius: Math.random() > 0.5 ? "50%" : "0",
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 3 + 3}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="container px-4 py-8 mx-auto">
        {/* Portrait Mode Series Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Portrait Series
            </h2>
            <Link href="/browse-series">
              <Button variant="outline" size="sm" className="bg-purple-900 hover:bg-purple-700 border-0 text-white">
                Browse All
              </Button>
            </Link>
          </div>

          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full border-white/10 text-white hover:bg-black/70 hover:text-white"
              onClick={() => scrollLeft(seriesScrollRef)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div
              ref={seriesScrollRef}
              className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto py-4 px-10 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {portraitSeries.map((series) => (
                <div key={series.id} className="snap-start w-[180px] sm:w-[220px]">
                  <SeriesCard series={series} />
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full border-white/10 text-white hover:bg-black/70 hover:text-white"
              onClick={() => scrollRight(seriesScrollRef)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Movie Posters Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Featured Movies
            </h2>
            <Link href="/browse-movies">
              <Button variant="outline" size="sm" className="bg-red-900 hover:bg-red-700 border-0 text-white">
                Browse All
              </Button>
            </Link>
          </div>

          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full border-white/10 text-white hover:bg-black/70 hover:text-white"
              onClick={() => scrollLeft(movieScrollRef)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div
              ref={movieScrollRef}
              className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto py-4 px-10 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {moviePosters.map((movie) => (
                <div key={movie.id} className="snap-start w-[320px] sm:w-[380px]">
                  <MoviePoster movie={movie} />
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full border-white/10 text-white hover:bg-black/70 hover:text-white"
              onClick={() => scrollRight(movieScrollRef)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Featured section with auto-scroll */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Featured Clips
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-900 hover:bg-blue-500 border-0 text-white"
              onClick={triggerConfetti}
            >
              Surprise Me!
            </Button>
          </div>

          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full border-white/10 text-white hover:bg-black/70 hover:text-white"
              onClick={() => scrollLeft(featuredScrollRef)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div
              ref={featuredScrollRef}
              className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto py-4 px-10 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onMouseEnter={pauseAutoScroll}
              onMouseLeave={resumeAutoScroll}
              onTouchStart={pauseAutoScroll}
              onTouchEnd={resumeAutoScroll}
            >
              {featuredClips.map((clip, index) => (
                <div key={`${clip.id}-${index}`} className="snap-start w-[240px]">
                  <ClipPreview clip={clip} onClick={() => (window.location.href = `/shorts?id=${clip.id}`)} />
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full border-white/10 text-white hover:bg-black/70 hover:text-white"
              onClick={() => scrollRight(featuredScrollRef)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

   

        {/* Category Tabs */}
        <div className="mb-8">
          <Tabs defaultValue="For You" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6 bg-black/20">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.name}
                  value={category.name}
                  className="data-[state=active]:bg-blue-800 data-[state=active]:text-white"
                  onClick={() => setActiveCategory(category.name)}
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.name} value={category.name} className="mt-0">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    {category.name} Videos
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {featuredClips
                      .filter(
                        (clip) =>
                          category.name === "For You" ||
                          category.name === "Trending" ||
                          clip.category === category.name,
                      )
                      .slice(0, 12)
                      .map((clip, index) => (
                        <div key={`${category.name}-${clip.id}-${index}`} className="w-full">
                          <ClipPreview clip={clip} onClick={() => (window.location.href = `/shorts?id=${clip.id}`)} />
                        </div>
                      ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}


