import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { Container, Form, FormControl, Button } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const QUERYSTR_PREFIX = "q";

export default function Jobs() {
	let query = useQuery();
	let user = useSelector((state) => state.user);

	const getData = async () => {
		let url = `https://my-json-server.typicode.com/Yogitravel/it-viec/jobs`;
		let data = await fetch(url);
		let result = await data.json();

		setOriginalList(result);
		setJobs(result);
		query.get(QUERYSTR_PREFIX);
	};

	let history = useHistory();

	const searchByKeyword = (e) => {
		e.preventDefault(); //block the refresh the page
		console.log("keyword", keyword);
		history.push(`/jobs/?${QUERYSTR_PREFIX}${keyword}`);

		let filteredList = originalList;

		if (keyword) {
			filteredList = originalList.filter((item) => item.title.includes(keyword));
		}
		setJobs(filteredList);
	};

	useEffect(() => {
		getData();
	}, []);
	let [jobs, setJobs] = useState(null);
	//capture keyword moment
	let [keyword, setKeyword] = useState(null);
	let [originalList, setOriginalList] = useState(null);

	//tao function search

	return (
		<div>
			<Jumbotron fluid className="jumbotron">
				<div className="Login-email">
					<p> Login email: {user.email} </p>
				</div>
				<Container>
					<img className="itviec-logo" src="/logo-itviec.png" />

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
