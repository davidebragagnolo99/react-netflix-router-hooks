import { useEffect, useState } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

let authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4Njk1MzY4NWVjNDAwMTQ1MGI4NWQiLCJpYXQiOjE2OTQxNzk4NDgsImV4cCI6MTY5NTM4OTQ0OH0.PbF0KQKSACtSbh2z3jrYBluuvrJ-igu55FxojG7Yg0s";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieComments, setMovieComments] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const params = useParams();
  const location = useLocation();
  console.log("PARAMS:", params);
  console.log("LOCATION:", location);
  console.log("LOCATION:", location.pathname);

  useEffect(() => {
    fetchMovieDetails();
    fetchComments();
  }, []);

  const movieId = params.movieID;

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=ec91d2e&s=" + movieId);
      if (response.ok) {
        const data = await response.json();
        setMovieDetails(data);
        console.log(movieDetails);
      } else {
        console.log("errore nel recupero dati");
      }
    } catch (error) {
      console.log("error");
      setError(error);
      setErrorMsg(errorMsg);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + movieId, {
        headers: {
          Authorization: authorization,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMovieComments(data);
      } else {
        console.log("errore nel recupero dei dati");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      <Col md={4}>
        <img src={movieDetails.Poster} alt="film poster" className="img-fluid p-4" />
      </Col>
      <Col md={8}>
        <div className="p-4">
          <h4 className="text-light">{movieDetails.Title}</h4>
          <p className="text-light">{movieDetails.Plot}</p>
          <div>
            {movieComments.map((singleComment) => (
              <p className="bg-secondary text-light m-1 p-2 rounded">
                <Badge className="m-1">Rate: {singleComment.rate}</Badge>
                {singleComment.comment}
              </p>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
};
export default MovieDetails;
