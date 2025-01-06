import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import axiosInstance from "../apis/config";
import axios from 'axios';
import LanguageContext from '../context/language';

export default function Search( props ) {
	const [search, setSearch] = useState('')
	const { movies, setMovies } = props;
	const { language } = React.useContext(LanguageContext);
	const handleSearch = () => {
		console.log(search)
		axiosInstance.get('/search/movie', {
			params: {
				query: search,
				language: language
			}
		}).then((res) => {
			setMovies(res.data.results) || console.log(res.data.results)
		})
	}
	return (
		<Container style={{ backgroundColor: 'grey', borderRadius:'10px', padding:'20px' }}>
			<Row >
				<Col style={{ textAlign: 'left' }}>
					<h1>Welcome to our Movie-app</h1>
					<p className='mx-4'>Our catalog contains millions of movies and TV shows</p>
					<Form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
						<div className='d-flex gap-2'>
							<Form.Control 
								placeholder='Search for millions of content...' 
								value={search} 
								onChange={(e) => setSearch(e.target.value)}
							/>
							<Button 
								style={{backgroundColor: 'rgb(190, 168, 68)', border:"none"}} 
								type="submit"
							>
								Search
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}
