import React from "react";
import Joke from "./Joke";
import useLocalStorage from "./Hooks/useLocalStorage";
import "./JokeList.css";

const JokeList = () => {
    const { jokes, isLoading, vote, handleGetNewJokes } = useLocalStorage();

    const sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

    return (
        <div className="JokeList">
            <h1>Here are your Jokes</h1>
            <button 
            className="JokeList-getmore"
            onClick={handleGetNewJokes}>Get New Jokes</button>
            
            {isLoading ? (<p>loading...</p>) : 
               (sortedJokes.map((j, index)=> (
                <Joke 
                id={j.id}
                key={j.id}
                text={j.joke}
                votes={j.votes}
                vote={vote}
               />
            )))
            }

        </div>
    );
};

export default JokeList;
