import React, { useState } from 'react'
//components
import Search from '../components/Search'
import Content from '../components/Content'

export default function Main() {
	const [ movies, setMovies ] = useState([])
	return (
		<>
			<Search movies={movies} setMovies={setMovies}></Search>
			<Content movies={movies} setMovies={setMovies}></Content>
		</>
	)
}
