import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SearchTrackPage from './SearchTrackPage';

function PlaylistDetails() {
  const [project, setProject] = useState(null);

  const { id } = useParams();

  const getProject = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${id}`);

      setProject(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProject();
    //If we were able to go from one details view straight to another we should pass id on the dependency array, so that everytime the component rerenders we get the information from the correct/latest id
  }, []);

  return (
    <div className='ProjectDetails'>
      {project && (
        /* React fragment - doesn't add anything to the html (only its contents) */
        <>
          <h1>{project.title}</h1>
          <img src={project.imageUrl} alt='project description' />
          <p>{project.description}</p>
        </>
      )}

      {project &&
        project.tasks.map((task) => (
          <li className='TaskCard card' key={task._id}>
            <h3>{task.title}</h3>
            <h4>Description:</h4>
            <p>{task.description}</p>
          </li>
        ))}

      <Link to={`/projects/edit/${id}`}>Edit Project</Link>
    </div>
  );
}

export default PlaylistDetails;
