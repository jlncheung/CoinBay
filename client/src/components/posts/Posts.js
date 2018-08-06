import React, { Component } from 'react';
import SimpleMediaCard from '../simpleMediaCard/SimpleMediaCard';
import 'bootstrap/dist/css/bootstrap.css'
import 'mdbreact/dist/css/mdb.css'
import './posts.css';

class Posts extends Component {
	constructor(props) {
		super(props);

		console.log(props);

		let postingStatus;

		this.state = {
			format: "grid",
			counter: 20,
			results: 0,
			allPostings: []
		};

		fetch(`/api/postings_with_users`)
		.then(res => {
			// console.log(res);
			postingStatus = res.status;
			return res.json();
		})
		.then(body => {
			// console.log(body);
			// console.log("postingStatus", postingStatus);
			if(postingStatus == 200) {
			this.setState({
				allPostings: body
			});
			// console.log(this.state);
			}
			return body;
				})
				.catch(err => {
					console.log("ERROR!!");
					console.log(err);
				})

		fetch(`/api/postings/newest`)
		.then(res => {
			// console.log(res);
			postingStatus = res.status;
			return res.json();
		})
		.then(body => {
			// console.log(body);
			// console.log("postingStatus", postingStatus);
			if(postingStatus == 200) {
			this.setState({
				postings: body
			});
			// console.log(this.state);
			}
			return body;
				})
				.catch(err => {
					console.log("ERROR!!");
					console.log(err);
				})

		window.props = props;
	}
	componentDidMount() {
		window.addEventListener('scroll', function() {

			// console.log(window.innerHeight);
			// console.log(window.scrollY);
			// console.log(document.body.offsetHeight);

			if((window.innerHeight + window.scrollY)  + 300 >= document.body.offsetHeight) {
				this.setState(
					(prevState,props)=>{
					return {counter: this.state.counter += 20};
					}
				);
			}
		}.bind(this));
	}
	changeFormat(form) {
		if (form == "grid" && this.state.format !== "grid") {
			this.setState(
				(prevState,props)=>{
				return {format: "grid"};
				}
			);
		} else if (form == "list" && this.state.format !== "list") {
			this.setState(
				(prevState,props)=>{
				return {format: "list"};
				}
			);
		} else if (form == "detailed-list" && this.state.format !== "detailed-list") {
			this.setState(
				(prevState,props)=>{
				return {format: "detailed-list"};
				}
			);
		} else {
		}
	}
	classFormat(form) {
		if (this.state.format === "grid")
			return "items";
		else
			return "items-list";
	}
	postingView() {
		return (
			<div className="format-options tabs">
				<button className="grid grid-btn" i class="material-icons" onClick={() => this.changeFormat("grid")}>view_module</button>
				<button className="detailed-list detailed-list-btn" i class="material-icons" onClick={() => this.changeFormat("detailed-list")}>view_list</button>
				<button className="list list-btn" i class="material-icons" onClick={() => this.changeFormat("list")}>view_headline</button>
			</div>
		)
	}
	noResultsMsg(number) {
		if(number > 0)
			return "Results found: " + number;
		else
			return "No results found for that, try a different search?";
	}
 	render() {
		window.state = this.state;

		var idArr;

		// CHECK STATE
		if(this.props.location.state) {
				if(Array.isArray(this.props.location.state.searchResults)) {
					console.log(this.props.location.state.searchResults);
				idArr = [];

				for(var index = 0; index < Object.keys(this.props.location.state.searchResults).length; index++) {
					idArr.push(this.props.location.state.searchResults[index].id);
				}

				console.log(idArr);
			}
		}

		else if (this.props.searchResults) {
			idArr = [];

			for(var index = 0; index < Object.keys(this.props.searchResults).length; index++) {
				idArr.push(this.props.searchResults[index].id);
			}

			console.log(idArr);
		}

		if(!this.state.postings) {
			return (<div className="grid list detailed-list">Loading</div>)
		} else {
			window.postings = this.state.postings;
			if(idArr != null && idArr.length > 0) {
				console.log('hit');
				return (
					<div>
						<div>
							{this.postingView()}
						</div>
						<div className="container">
								{this.state.allPostings.map(posting => {
									if (idArr.includes(posting.id)) {
										return (
											<div className={this.classFormat(this.state.format)}>
												<SimpleMediaCard format={this.state.format} post={posting.id} title={posting.postingTitle} description={posting.description} price={posting.price} username={posting.User.username} rating={posting.User.rating} date={posting.createdAt} image={posting.images[0]}/>
											</div>
										)
									}
								})}
								<p className="return-results">{this.noResultsMsg(idArr.length)}</p>
						</div>
					</div>
				);
			} else if (this.props.match.params.category != null || (this.props.location.state != undefined && idArr == 0 && this.props.location.state.searchResults == 0)) {
				var counter = 0;
				return (
					<div>
						<div className="format-options">
							{this.postingView()}
						</div>
						<div className="container">
							{this.state.allPostings.map(posting => {
								if (posting.category == this.props.match.params.category) {
									counter++;
									return (
										<div className={this.classFormat(this.state.format)}>
											<SimpleMediaCard format={this.state.format} post={posting.id} title={posting.postingTitle} description={posting.description} price={posting.price} username={posting.User.username} rating={posting.User.rating} date={posting.createdAt} image={posting.images[0]}/>
										</div>
									)
								}
							})}
							<p className="return-results">{this.noResultsMsg(counter)}</p>
						</div>
					</div>
				);
			}
			else {
				return (
					<div>
						<div className="format-options">
							{this.postingView()}
						</div>
						<div className="container">
								{this.state.postings.slice(0, this.state.counter).map((posting, index) => {
									return (
										<div className={this.classFormat(this.state.format)} key={index}>
											<SimpleMediaCard format={this.state.format} post={posting.id} title={posting.postingTitle} description={posting.description} price={posting.price} username={posting.User.username} rating={posting.User.rating} date={posting.createdAt} image={posting.images}/>
										</div>
									)
								})}
						</div>
					</div>
				);
			}
		}
	}
}

export default Posts;
