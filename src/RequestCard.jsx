const RequestCard = ({request})=>{
    const {firstName, lastName, gender, skills, about, userPhoto, age} = request;
    return (
        <div className="w-[34rem] max-w-xl">
        <div className="flex flex-row shadow bg-base-300 my-5 rounded-lg">
            <div className="p-4">
                <div className="avatar m-auto">
                    <div className="w-16 rounded-full ">
                    <img src={userPhoto} alt="dp"/>
                    </div>
                </div>

               
            </div>

            <div className="p-4 flex flex-col flex-wrap">
                
                <div className="stat-value text-lg text-secondary">{firstName + " " + lastName}</div>
                {age && gender && <div className="stat-desc text-xs">{age + ", "+gender}</div>}

                <div className="text-xs flex-1 break-words line-clamp-2">{about}</div>
                <div className="">
                    <button className="mr-2 mt-2 btn-sm rounded-lg bg-red-500 btn-error font-bold hover:bg-red-600">Ignore</button>
                    <button className="btn-sm rounded-lg bg-green-500 btn-error font-bold hover:bg-green-700">Accept</button>

                </div>
            </div>
            
        </div>
        
    </div>
    )
}
export default RequestCard;