import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const LOCAL_STORAGE_KEY = 'jokes';

const useLocalStorage = () => {
    const [jokes, setJokes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Memoize the getJokes function
    const getJokes = useCallback(async () => {
        let seenJokes = new Set();
        let newJokes = [];

        while (newJokes.length < 5) {
            let res = await axios.get("https://icanhazdadjoke.com", {
                headers: { Accept: "application/json" }
            });

            let joke = res.data;

            if (!seenJokes.has(joke.id)) {
                seenJokes.add(joke.id);
                newJokes.push({ ...joke, votes: 0 });
            } else {
                console.log("duplicate found!");
            }
        }

        setJokes(newJokes);
        saveJokesToLocalStorage(newJokes);
        setIsLoading(false);
    }, []);

    // Memoize the loadJokesFromLocalStorage function
    const loadJokesFromLocalStorage = useCallback(() => {
        const savedJokes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (savedJokes) {
            setJokes(savedJokes);
            setIsLoading(false);
        } else {
            getJokes();
        }
    }, [getJokes]);

    // Function to save jokes to local storage
    const saveJokesToLocalStorage = (jokes) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(jokes));
    };

    useEffect(() => {
        loadJokesFromLocalStorage();
    }, [loadJokesFromLocalStorage]);

    const vote = (id, delta) => {
        const updatedJokes = jokes.map(j =>
            j.id === id ? { ...j, votes: j.votes + delta } : j
        );
        setJokes(updatedJokes);
        saveJokesToLocalStorage(updatedJokes);
    };

    return { jokes, isLoading, vote, handleGetNewJokes: getJokes };
};

export default useLocalStorage;
