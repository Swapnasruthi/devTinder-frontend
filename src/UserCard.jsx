const UserCard = ({user})=> {
    return user && (
        <div>
            <div className="card card-compact bg-base-300 w-80 shadow-xl">
            <figure>
                <img
                src={user.userPhoto}
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{user.firstName +" "+ user.lastName}</h2>
                {user.age && user.gender && <p>{user.age + ", "+user.gender}</p>}
                <p>{user.about}</p>
                <div className="card-actions justify-center my-2">
                <button className="btn btn-primary">Ignore</button>
                <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
    </div>
        </div>
    )
}
export default UserCard;