import axios from "axios";
import { useDispatch } from "react-redux";
import { addFeed, removeUserFromFeed } from "./utils/feedSlice"; // Corrected import statement
import PropTypes from 'prop-types';
import { BACKEND_URL } from "./Constants";
const UserCard = ({ user }) => {
    const dispatch = useDispatch();
  
    
    const handleRequest = async (status, userId) => {
        try {
            await axios.post("http://localhost:4000/request/send/"+status+"/"+userId,{},{withCredentials:true});
            
            dispatch(removeUserFromFeed(userId));
            // Call feed API again to update the feed in the redux store
            const Res = await axios.get(BACKEND_URL+"/feed", { withCredentials: true });
            dispatch(addFeed(Res.data));
        } catch (err) {
            console.error(err.message);
        }
    };

    if (!user) {
        return null; // Return null if user is not defined
    }

    const { _id } = user;
    return (
        <div className="">
            <div className="card card-compact bg-base-300 w-80 shadow-xl max-h-[41rem]">
                <figure>
                    <img
                        className="h-80 w-full object-top"
                        src={user.userPhoto}
                        alt="user"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
                    {user.age && user.gender && <p>{user.age + ", " + user.gender}</p>}
                    <p className="break-words line-clamp-2">{user.about}</p>
                    <div className="card-actions justify-center my-2">
                        <button
                            className="btn btn-primary"
                            onClick={() => handleRequest("ignored", _id)}
                        >
                            Ignore
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => handleRequest("interested", _id)}
                        >
                            Interested
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
UserCard.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string,
        userPhoto: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        age: PropTypes.number,
        gender: PropTypes.string,
        about: PropTypes.string
    })
};

export default UserCard;