import React, { useState } from "react";

const initialState = {
    height: "",
    width: "",
    backgroundColor: ""
}

const NewBoxForm = ({ createBox }) => {
    const [formData, setFormData] = useState(initialState);

    const [idCounter, setIdCounter] = useState(1);
    const [errors, setErrors] = useState({});

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.height) newErrors.height = "Height is required.";
        if (!formData.width) newErrors.width = "Width is required.";
        if (!formData.backgroundColor) newErrors.backgroundColor = "Background color is required.";
        if (isNaN(formData.height) || formData.height <= 0) newErrors.height = "Height must be a positive number.";
        if (isNaN(formData.width) || formData.width <= 0) newErrors.width = "Width must be a positive number.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            createBox({ ...formData, id: idCounter });
            setIdCounter(idCounter + 1);
            setFormData({ height: "", width: "", backgroundColor: "" });
            setErrors({});
        }
    };

    return (
        <div>
            <br />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="height">Height</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="height"
                        value={formData.height}
                        id="height"
                    />
                    {errors.height && <div style={{ color: "red" }}>{errors.height}</div>}
                </div>
                <div>
                    <label htmlFor="width">Width</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="width"
                        id="width"
                        value={formData.width}
                    />
                    {errors.width && <div style={{ color: "red" }}>{errors.width}</div>}
                </div>
                <div>
                    <label htmlFor="backgroundColor">Background Color</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="backgroundColor"
                        value={formData.backgroundColor}
                        id="backgroundColor"
                    />
                    {errors.backgroundColor && <div style={{ color: "red" }}>{errors.backgroundColor}</div>}
                </div>
                <br />
                <button id="newBoxButton">Add a new box!</button>
            </form>
        </div>
    );
};

export default NewBoxForm;
