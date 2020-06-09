import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { Container, Form, FormControl, Button } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function Jobs() {
	const getData = async () => {
		let url = `https://my-json-server.typicode.com/Yogitravel/it-viec/jobs`;
		let data = await fetch(url);
		let result = await data.json();
		console.log(result);
		setJobs(result);
	};

	const searchByKeyword = (e) => {
		e.preventDefault(); //block the refresh the page
		console.log("keyword", keyword);
		let filteredList = jobs.filter((item) => item.title.includes(keyword));

		setJobs(filteredList);
	};

	useEffect(() => {
		getData();
	}, []);
	let [jobs, setJobs] = useState(null);
	//capture keyword moment
	let [keyword, setKeyword] = useState(null);

	//tao function search

	return (
		<div>
			<Jumbotron fluid className="jumbotron">
				<Container>
					<img className="itviec-logo" src="logo-itviec.png" />
					<Form inline onSubmit={(e) => searchByKeyword(e)}>
						<FormControl className="search-bar" type="text" placeholder="Keyword skill(Java, IOS...)" onChange={(e) => setKeyword(e.target.value)} />
						<Button type="submit" className="Search-button">
							Search
						</Button>
					</Form>
				</Container>
			</Jumbotron>
			<div className="ITjobs">
				<h1>6 IT jobs in Vietnam for you </h1>
			</div>
			<div className="job-cards">
				<Container>{jobs && jobs.map((job) => <JobCard job={job} key={job.id} />)}</Container>
			</div>
		</div>
	);
}
