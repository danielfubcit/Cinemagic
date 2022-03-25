import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from "@/utils/provider";
import { useRouter } from 'next/router';
import scss from '@/styles/pageStyles/home.module.scss';

// components
import Logo from '@/comps/Logo';
import SearchBar from '@/comps/SearchBar';
import TextUI from '@/comps/TextUI';
import NavBar from '@/comps/NavBar';
import GenreDropdownMenu from '@/comps/DropDownPicker/genre';
import YearDropdownMenu from '@/comps/DropDownPicker/year';
import DurationDropdownMenu from '@/comps/DropDownPicker/duration';
import TrendingCarousel from '@/comps/ImageCarousel/trending';
import GenreCarousel from '@/comps/ImageCarousel/genreTypes';
import YearlyCarousel from '@/comps/ImageCarousel/2021movies';
import PopUpCont from '@/comps/PopUpCont';
import DragIcons from '@/comps/DragIcon';
import Dropzone from '@/comps/Dropzone';


export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mode, setMode] = useState(false);
  const [view, setView] = useState(false);
  const [dropzonePop, setDropzonePop] = useState(false);
  const [setPop, setSetPop] = useState(false);
  
  const router = useRouter();

  const changeTheme = () => {
    setMode(!mode);
    setTheme(theme === 'light' ? 'default' : 'light')
    console.log("Theme", mode)
  }

  const changeView = () => {
    setView(!view);
    console.log("View", view)
  }

  const dropzone = () => {
    setDropzonePop(!dropzonePop);
  }
  
  const setting = () => {
    setSetPop(!setPop);
  }

  const filteringMoviesByGenre = genre => router.push(`/genre/${genre}`); 
  const filteringMoviesByYear = year => router.push(`/year/${year}`); 
  const filteringMoviesByDuration = dur => router.push(`/duration/${dur}`);

  return (
    <div className={scss.windowCont}>
      <div className={scss.phoneSizeCont}>
        {/* cinemagic logo/title */}
        <div className={scss.titleCont}>
          <Logo />
        </div>
       
        {/* search bar */}
        <div className={scss.searchBarCont}>
          <SearchBar onChange={ (e) => inputSearch(e.target.value) }/>
        </div>

        {/* drop down filter menus */}
        <div className={scss.dropDownCont}>
          <GenreDropdownMenu onSelection={ sel => filteringMoviesByGenre(`${sel}`) } />
          <YearDropdownMenu onSelection={ sel => filteringMoviesByYear(`${sel}`) } />
          <DurationDropdownMenu onSelection={ sel => filteringMoviesByDuration(`${sel}`) } />
        </div>

        {/* TRENDING subheading */}
        <div className={scss.trendingHeadingCont}>
          <TextUI Title="RECENT MOVIES" />
        </div>

        {/* movie carousel */}
        <div className={scss.carouselCont}>
          {/* <TrendingCarousel /> */}
          <YearlyCarousel />
        </div>

        {/* GENRE subheading */}
        <div className={scss.subHeadingCont}>
          <TextUI Title="GENRE" />
        </div>

        {/* movie carousel */}
        <div className={scss.carouselContGenre}>
          <GenreCarousel />
        </div>

        {/* Drag icon*/}
        <div>
          <DragIcons onClickDrag={dropzone}/>
        </div>

        {/* Dropzone pop up */}
        <Dropzone 
          display={dropzonePop === true ? "block" : "none"} 
        />

        {/* nav bar */}
        <div className={scss.navBarCont}>
          <NavBar onClickSetting={setting} />
        </div>

        {/* Setting pop up */}
        <PopUpCont 
          darkLight={changeTheme} 
          gridList={changeView} 
          onPressCloseBtn={setting} 
          display={setPop === true ? "block" : "none"} 
          position1={mode === true ? "0px" : "27px"} 
          position2={view === true ? "0px" : "27px"} 
        />
      </div>
    </div>
  )
}
