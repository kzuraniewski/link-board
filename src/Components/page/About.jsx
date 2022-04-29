import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import React from 'react';

export default function About() {
	return (
		<article className="article">
			<div className="article__group">
				<MDBContainer>
					<MDBRow className="article__row">
						<MDBCol className="article__content-container">
							<h1>This is a prototype</h1>
							<p>
								LinkBoard is a web app prototype allowing you to store bookmarks in
								grouped tiles. It uses React and Firebase.
							</p>
						</MDBCol>
						<MDBCol className="article__content-container article__content-container--center">
							<p>Project available here:</p>
							<div>
								<MDBBtn
									size="lg"
									floating
									style={{
										backgroundColor: 'rgba(0, 0, 0, 0.8)',
									}}
									href="https://github.com/nick-here/LinkBoard"
								>
									<i className="fab fa-github"></i>
								</MDBBtn>
							</div>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
			</div>
		</article>
	);
}
