import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Row, Col, Badge } from "react-bootstrap";
import moment from "moment";

export default function Details() {
	const { id } = useParams();
	let history = useHistory();
	const [job, setJob] = useState(null);

	const getDetailData = async () => {
		let url = `https://my-json-server.typicode.com/Yogitravel/it-viec/jobs/${id}`;
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
		<div className="job-content container">
			<Col>
				<h1>
					<img src={job.img} /> <h2> {job.title}</h2>
				</h1>
			</Col>
			<Col xs={8}>
				<div>Salary: {job.salary} USD </div>
				<div>Benefits: {job.benefits}</div>
				<div>Description: {job.description}</div>
			</Col>
			<Col>
				<div className="date-location-box">
					<div className="jobcard-location">
						<div>Location: {job.city} </div>
						<div>District: {job.district} </div>
					</div>
					<div className="job-time"></div>
				</div>
				<div>
					<Badge variant="secondary" className="badge-style">
						{job.tags}
					</Badge>
				</div>
				{job.isHotjob ? <div className="hotjob-label">Hot Job</div> : <div></div>}
			</Col>
		</div>
	);
}
