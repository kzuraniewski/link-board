import { Container, Button, Row, Col } from 'react-bootstrap';
import React from 'react';

export default function About() {
	return (
		<article className="article">
			<div className="article__group">
				<Container>
					<Row className="article__row">
						<Col className="article__content-container">
							<h1>This is a prototype</h1>
							<p>
								LinkBoard is a web app prototype allowing you to store bookmarks in
								grouped tiles. It uses React and Firebase.
							</p>
						</Col>
						<Col className="article__content-container article__content-container--center">
							<p>Project available here:</p>
							<div>
								<Button
									size="lg"
									style={{
										backgroundColor: 'rgba(0, 0, 0, 0.8)',
									}}
									href="https://github.com/nick-here/LinkBoard"
									className="social-btn"
								>
									<i className="fab fa-github"></i>
								</Button>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		</article>
	);
}
