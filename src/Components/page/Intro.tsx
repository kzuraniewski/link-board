import { Container, Button, Col, Row } from 'react-bootstrap';
import React from 'react';
import Logo from '../Logo';
import badBookmarks from '../../images/bad-bookmarks.png';
import goodBookmarks from '../../images/good-bookmarks.png';
import preview from '../../images/preview.png';

export default function Intro() {
	return (
		<article className="article">
			<div className="article__group">
				<Container>
					<Row className="article__row">
						<Col size="md" className="article__content-container">
							<h1 className="article__big">
								Too many bookmarks? <Logo /> is for you!
							</h1>
							<p>
								Clean up your bookmarks bar by moving them to <Logo small />.
							</p>

							<div className="btn-container">
								<Button href="#/board" className="article__cta">
									Your board
								</Button>
							</div>
						</Col>
						<Col
							size="md"
							className="article__content-container article__content-container--center"
						>
							<img
								src={badBookmarks}
								alt="Bad bookmarks"
								className="article__image"
							/>

							<i className="fas fa-long-arrow-alt-down article__arrow"></i>

							<img
								src={goodBookmarks}
								alt="Good bookmarks"
								className="article__image"
							/>
						</Col>
					</Row>
				</Container>
			</div>

			<div className="article__group">
				<Container>
					<div className="article__content-container article__content-container--center">
						<h1 className="article__big">
							Over <span className="accent">1</span> users worldwide
						</h1>
						<p>Join our community today!</p>

						{/* icons */}
						<div className="article__icon-container">
							<i className="fas fa-mobile"></i>
							<i className="fas fa-tablet"></i>
							<i className="fas fa-laptop"></i>
						</div>
					</div>
				</Container>
			</div>

			<div className="article__group">
				<Container>
					<Row className="article__row">
						<Col
							size="md"
							className="article__content-container article__content-container--center"
						>
							<img src={preview} alt="Board preview" className="article__image" />
						</Col>

						<Col size="md" className="article__content-container">
							<h1 className="article__big">Store your links in one place</h1>
							<p>Gain access to your bookmarks from any browser or device.</p>
						</Col>
					</Row>
				</Container>
			</div>
		</article>
	);
}
