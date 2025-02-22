import React from 'react'

const Card = ({ user }) => {
    console.log(user);

    const { firstName, lastName, age, profileImg, skills, gender } = user
    return (
        <div>
            <div className="card bg-base-300 w-96 shadow-xl">
                <figure>
                    <img
                        src={profileImg}
                        alt="profile Img"
                    />

                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    <p>{age && gender && "age: " + age + " " + " Gender: " + gender}</p>
                    <p>{skills.join(" ,")}</p>
                    <div className="card-actions justify-center mt-2">
                        <button className="btn btn-primary bg-error border-none shadow-none">Ignored</button>
                        <button className="btn btn-primary">Intrested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
