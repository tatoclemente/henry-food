import React, { useState } from "react";
import style from "./Form.module.css";
import { useSelector } from "react-redux";
// import { dietTypes } from '../../utils/data';

//Import Icons
import CloudUpload from "../../images/cloud-upload-icon.png";
import FileImage from "../../images/file-image.png";
import TrashWhite from "../../images/trash-white.png";
import TrashRed from "../../images/trash-red.png";
import DeleteIcon from "../../images/remove-icon.png";

import { validate } from '../../Functions/functions'
import Spinner from "../../components/Spinner/Spinner";


function Form({ postRecipe, showSpinner }) {
  const dietTypes = useSelector((state) => state.diets);

  //-----------------------------------------------------------------------------------
  // ERROS HANDLERS

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    healthScore: "",
    summary: "",
    steps: "",
  });

  //-----------------------------------------------------------------------------------
  // MAIN CATEGORIES HANDLERS

  const [form, setForm] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    image: null,
  });

  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState("");

  
  const [selectedDiets, setSelectedDiets] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedForm = { ...form, [name]: value };
    if (value.length <= maxCaracteres) {
      setForm({
        ...form,
        summary:value
      });
    if (value.length <= 60) {
      setForm({
        ...form,
        name: value
      })
    }
    setForm(updatedForm);
    }

    const fieldErrors = validate({ ...form, [name]: value }, fileName, currentStep);
    setErrors({ ...errors, [name]: fieldErrors[name] });
  };

  //------------------------------------------------------------------------------------
  /// SUMMARY LIMIT
  const varCharacters = form.summary.length
  const maxCaracteres = 500;

  //-----------------------------------------------------------------------------------
  /// STEPS HANDLERS



  const handleAddStep = (event) => {
    event.preventDefault();
    if (currentStep) {
      setSteps([...steps, currentStep]);
      setCurrentStep("");
      const stepsErors = validate(form, fileName, currentStep);
      setErrors({ ...errors, steps: stepsErors.steps  });
    }
  };

  const handleDeleteStep = (index) => {
    const newStep = [...steps];
    newStep.splice(index, 1);
    setSteps(newStep);
    const stepsErors = validate(form, fileName,newStep);
    setErrors({ ...errors, steps: stepsErors.steps  });
  
  };

  const handleChangeStep = (event) => {
    const { value } = event.target;
    setCurrentStep(value);
  };
  //-----------------------------------------------------------------------------------
  /// DIET TYPES HANDLERS


  // const [diets, setDiets] = useState([])

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setSelectedDiets((prevSelectedDiets) => {
      if (prevSelectedDiets.includes(value)) {
        return prevSelectedDiets.filter((diet) => diet !== value);
      } else {
        return [...prevSelectedDiets, value];
      }
    });
  };

  //-----------------------------------------------------------------------------------


    
  // IMAGE HANDLERS

  const validateFileSize = (file) => {
    const maxSize = 1 * 1024 * 1024; // 1MB
    if (file.size > maxSize) return false;
    return true;
  };


  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFilename] = useState("No selected image");

  const handleImageChange = (event) => {
    const { files } = event.target;
    if (files && files[0]) {
      const selectedFile = files[0];

      if (validateFileSize(selectedFile)) {
        setForm({ ...form, image: selectedFile });
        setFilename(files[0].name);
        setImageFile(URL.createObjectURL(files[0]));

        const imageErrors = validate(form, selectedFile.name, currentStep);
        setErrors((prevErrors) => ({ ...prevErrors, image: imageErrors.image }));

      } else {
        setErrors(
          window.alert("The selected file size exceeds the limit (1MB). Please select a smaller file.")
        );
      }
    } else {
      setForm({ ...form, image: null });
      setFilename("No selected image");
      setImageFile(null);
    }

    const imageErrors = validate(
      form,
      files && files[0] ? files[0].name : "No selected image");
    setErrors((prevErrors) => ({ ...prevErrors, image: imageErrors.image }));
  };

   // IMAGE DRAG AND DROP HANDLERS
  const handleDragOver = (event) => {
  event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    handleImageChange({ target: { files } });
  };


  const handleDeleteClick = () => {
    setFilename("No selected image");
    setImageFile(null);
    setForm({ ...form, image: null });

    const imageErrors = validate({ ...form, image: null }, "No selected image", currentStep);
    setErrors((prevErrors) => ({ ...prevErrors, image: imageErrors.image }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // window.alert("Simulamos que envio el formulario")

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("summary", form.summary);
    formData.append("healthScore", form.healthScore);
    formData.append("image", form.image);
    formData.append("steps", JSON.stringify(steps));
    formData.append("diets", JSON.stringify(selectedDiets));

    const errors = validate(form, fileName, steps);
    setErrors(errors);

    if (Object.values(errors).length === 0) {
      if (selectedDiets.length === 0 && !confirmNoDietSelected()) {
        return; // Detener el envío del formulario si el usuario cancela
      }
        
      postRecipe(formData);



      setForm({
        name: "",
        image: null,
        summary: "",
        healthScore: 0,
      });

      setSteps([]);

      setSelectedDiets([]);

      setImageFile(null);
      setFilename("No selected image");
    } else {
      window.alert("Unable to submit incomplete form, please complete all fields and try again")
    }
  };

  const confirmNoDietSelected = () => {
    return window.confirm(
      "You are about to create a recipe without any associated diet, is that correct?"
    );
  };

  const handleClick = () => {
    document.querySelector("#upload-input").click();
  };

  if (showSpinner) {
    return (
      <div className={style.spinnerContainer}>
        <p>Please Wait...</p>
         <Spinner /> 
      </div>
    )
   // Renderiza el spinner si showSpinner es true
  }


  return (
    <form className={style.formContainer}>
      <div className={style.bannerContainer}>
        <div className={style.bannerShadow}></div>
        <h1>GIVE US YOUR BEST DISH!</h1>
      </div>

      {/*---------------- NOMBRE DE LA RECETA ----------------------*/}
      <div className={style.inputContainer}>
        <label>Recipe name:</label>
        <input
          className={style.input}
          type="text"
          value={form.name}
          placeholder="Enter the name of your recipe..."
          onChange={handleChange}
          name="name"
          autoComplete="off"
        />
      {
        errors.name && 
          <div className={style.errorMessage}>
            <div className={style.arrowUp}></div>
            <p className={style.warning}>{errors.name}</p>
          </div>
      }
      </div>

      {/*---------------- RESUMEN DEL PLATO -----------------------*/}
      <div className={style.inputContainer}>
        <label>Dish Summary:</label>
        <textarea
          className={style.textarea}
          type="text"
          value={form.summary}
          placeholder="Describe the dish, for example: most important ingredients, its origin or brief history..."
          onChange={handleChange}
          name="summary"
          autoComplete="off"
        />
        {errors.summary &&
          <div className={style.errorMessage}>
            <div className={style.arrowUp}></div>
            <p className={style.warning}>{errors.summary}</p>
          </div>
        }
        <span className={style.docCharacters}>{`${varCharacters}/${maxCaracteres}`}</span>
      </div>

      {/*-------------- PUNTAJE DE SALUD -------------------------*/}
      <div className={style.inputContainer}>
        <label>
          Health Score: <span className={style.score}>{form.healthScore}</span>
        </label>
        <input
          id="healthScoreRange"
          className={style.inputScore}
          type="range"
          min={0}
          max={100}
          value={form.healthScore}
          onChange={handleChange}
          name="healthScore"
        />
        {errors.healthScore &&
          <div className={style.errorMessage}>
            <div className={style.arrowUp}></div>
            <p className={style.warning}>{errors.healthScore}</p>
          </div>
        }
      </div>

      {/* ------------ PASO A PASO ---------------------------*/}
      <section className={style.stepsContainer}>
        <label>Step by Step</label>
        <div className={style.inputSteps}>
          <input
            className={style.inputStep}
            type="text"
            value={currentStep}
            placeholder="Enter one step at a time..."
            onChange={handleChangeStep}
            name="steps"
          />
        </div>
        <button onClick={handleAddStep}>ADD STEP</button>
        <ul className={style.stepsList}>
          {steps.length > 0 &&
            steps.map((step, index) => {
              return (
                <li className={style.stepsListItem} key={index}>
                  <div className={style.stepsListItemTextContainer}>
                    <span className={style.stepsListItemText}>{step}</span>
                  </div>
                  <img
                    src={DeleteIcon}
                    alt="delete-icon"
                    className={style.deleteIcon}
                    onClick={() => handleDeleteStep(index)}
                  />
                </li>
              );
            })}
        </ul>
        {errors.steps &&
          <div className={style.errorMessageSteps}>
            <div className={style.arrowUp}></div>
            <p className={style.warning}>{errors.steps}</p>
          </div>
        }
      </section>

      {/* ------------------ IMAGEN -----------------*/}
      <div 
      className={style.uploaderContainer} 
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop} >
        <label></label>
        <input
          id="upload-input"
          type="file"
          accept="image/*"
          hidden
          name="image"
          onChange={handleImageChange}
        />

        {imageFile ? (
          <img src={imageFile} alt={fileName} className={style.image} />
        ) : (
          <>
            <img src={CloudUpload} alt="cloud-upload" className={style.uploaderIcon} />
            <p>Browse Files to Upload</p>
          </>
        )}
      </div>

      <section className={style.fileNameContainer}>
        <img src={FileImage} alt="file-icon" className={style.fileIcon} />
        <span className={style.nameContainer}>
          <span className={style.fileName}>{fileName} -</span>
          {imageFile ? (
            <img
              src={TrashRed}
              alt="trash-icon"
              className={style.deleteIcon}
              onClick={handleDeleteClick}
            />
          ) : (
            <img src={TrashWhite} alt="trash-icon" className={style.deleteIconNull} />
          )}
        </span>

        {errors.image &&
          <div className={style.errorMessageImage}>
            <div className={style.arrowUp}></div>
            <p className={style.warning}>{errors.image}</p>
          </div>
        }
      </section>

      {/*---------------- DIET TYPES ----------------------*/}
      <section className={style.inputContainer}>
        <label>Diet Types</label>
        <div className={style.dietsContainer}>
          {dietTypes.map((diet, index) => {
            return (
              <div className={style.dietsCheckboxContainer} key={index}>
                <input
                  type="checkbox"
                  value={diet}
                  name="diets"
                  checked={selectedDiets.includes(diet)}
                  className={style.dietsCheckbox}
                  onChange={handleCheckboxChange}
                />
                <label>{diet}</label>
              </div>
            );
          })}
        </div>
      </section>

      <button
        type="submit"
        className={style.submitButton}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
}
export default Form;
