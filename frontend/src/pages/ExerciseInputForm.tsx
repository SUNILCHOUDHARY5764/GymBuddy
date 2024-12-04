import axios, { AxiosRequestConfig } from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bot from "../images/chatbot.png"

interface Exercise {
    _id?: string;
    id?: string;
    target: string;
    difficulty: string;
    category: string;
    // Add other properties if needed
}

export default function ExerciseInputForm() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // Initialize form data with search params or empty fields
    const [formdata, setFormdata] = useState({
        target: searchParams.get("target") || "",
        difficulty: searchParams.get("difficulty") || "",
        category: searchParams.get("category") || ""
    });

    // Handle input change for the form
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormdata({ ...formdata, [name]: value });
    };

    // Toast messages for different cases
    const showToastErrorMessage = () => {
        toast.error('Please login to access this function!!!', {
            position: toast.POSITION.TOP_CENTER
        });
    };

    const showToastMessage = () => {
        toast.success('Exercise Added!!', {
            position: toast.POSITION.TOP_CENTER
        });
    };

    const showToastNotFoundMessage = () => {
        toast.info('No workouts found for these preferences. Please select different preferences!', {
            position: toast.POSITION.TOP_CENTER
        });
    };

    // Headers with Authorization token for the request
    const headers: AxiosRequestConfig['headers'] = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    // Axios query parameters for the GET request
    const params: AxiosRequestConfig['params'] = formdata;

    // Handle form submission
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSearchParams(formdata);  // Update the search params in the URL

        axios.get<{ data: Exercise[] }>("http://localhost:5000/workouts", { headers, params })
            .then((res) => {
                // Check if no workouts are found
                if (!res.data || !res.data.data || res.data.data.length === 0) {
                    showToastNotFoundMessage();
                } else {
                    res.data.data.forEach((item: Exercise) => {
                        delete item["_id"];
                        delete item["id"];
                    });

                    // If the user is not logged in, redirect to sign-in page
                    if ((res.data as any).msg === "Please login to access this function!!!") {
                        navigate("/signin");
                        showToastErrorMessage();
                        return;
                    }

                    // Proceed to post the workouts to the server
                    fetch("http://localhost:5000/exercise/add", {
                        method: "POST",
                        headers: { 
                            "Content-Type": "application/json", 
                            Authorization: `Bearer ${token}` 
                        },
                        body: JSON.stringify({
                            userId: "sampleUserId",  // Replace with actual userId
                            username: "sampleUsername",  // Replace with actual username
                            exercises: res.data.data  // Wrap data in 'exercises' array
                        })
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            showToastMessage();
                            navigate("/exercise");
                        })
                        .catch((err) => {
                            console.error("Error adding exercise:", err);
                            alert("An error occurred while adding the exercise.");
                        });
                }
            })
            .catch((err) => {
                const errorMessage = err.response?.data?.msg || "An unexpected error occurred.";
                alert(errorMessage);
                console.error("Error:", err);
            });
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Select your preferences for generating workout videos
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Difficulty Dropdown */}
                        <div>
                            <label htmlFor="difficulty" className="block text-sm font-medium leading-6 text-white">
                                Level of Difficulty
                            </label>
                            <div className="py-2">
                                <select
                                    id="difficulty"
                                    name="difficulty"
                                    required
                                    value={formdata.difficulty}  // Controlled value
                                    onChange={handleInputChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value="">Select Difficulty</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                        </div>

                        {/* Target Muscle Dropdown */}
                        <div>
                            <label htmlFor="target" className="block text-sm font-medium leading-6 text-white">
                                Target Muscle
                            </label>
                            <div className="py-2">
                                <select
                                    id="target"
                                    name="target"
                                    required
                                    value={formdata.target}  // Controlled value
                                    onChange={handleInputChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value="">Select Target Muscle</option>
                                    <option value="Biceps">Biceps</option>
                                    <option value="Triceps">Triceps</option>
                                    <option value="Chest">Chest</option>
                                    <option value="Forearms">Forearms</option>
                                    <option value="Quads">Quads</option>
                                    <option value="Lats">Lats</option>
                                    <option value="Glutes">Glutes</option>
                                    <option value="Hamstring">Hamstring</option>
                                    <option value="Lower back">Lower back</option>
                                </select>
                            </div>
                        </div>

                        {/* Category Dropdown */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-white">
                                Category
                            </label>
                            <div className="py-2">
                                <select
                                    id="category"
                                    name="category"
                                    required
                                    value={formdata.category}  // Controlled value
                                    onChange={handleInputChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value="">Select Category</option>
                                    <option value="Dumbbells">Dumbbells</option>
                                    <option value="Bodyweight">Bodyweight</option>
                                    <option value="Stretches">Stretches</option>
                                    <option value="Band">Resistance Band</option>
                                    <option value="Barbell">Barbell</option>
                                    <option value="Plate">Plate</option>
                                    <option value="Cables">Cables</option>
                                    <option value="Yoga">Yoga</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer autoClose={3000} />
            {/* Chatbot Button */}
            <div onClick={() => navigate("/expert")}>
                <img style={{ float: 'right', width: "87px", fontSize: "70px", marginRight: "-18%", position: "fixed", top: "70%", left: "93.3%" }} src={bot} alt="Chatbot" />
            </div>
        </>
    )
}
