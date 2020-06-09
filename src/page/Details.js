import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import moment from "moment";

export default function Details() {
	const { id } = useParams();
	let history = useHistory();
	const [job, setJob] = useState(null);

	const getDetailData = async () => {
		let url = `http://localhost:3001/jobs/${id}`;
		let data = await fetch(url);
		let result = await data.json();
		setJob(result);
		console.log("show result", result);
	};

	useEffect(() => {
		getDetailData();
	}, []);
	if (job === null) {
		return <div> Loading </div>;
	}

	return (
		<div className="Details-box">
			<h1>
				<img src={job.img} /> {job.title}
			</h1>

			<h2> Salary: {job.salary} USD </h2>

			<h2> Benefits: {job.benefits} </h2>
			<h2> Description: {job.description} </h2>

			<h2> {job.tags} </h2>
			<h2>
				Location: {job.city} - District: {job.district}
			</h2>
			<h2> {job.time} </h2>

			<h1>{job.isHotjob} </h1>
		</div>
	);
}
