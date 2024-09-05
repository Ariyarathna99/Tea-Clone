import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notiflix from 'notiflix';
import Footer from '../components/footer/Footer';
import './form.css';
import env from '../data/env';

const plantDetails = {
  'Type 25': {
    title: 'TRI 2025',
    description: `2000, 3000, 5000 tea plants have been transplanted by TRI in Sri Lanka. The clone TRI 2025 belongs to the TRI 2000 strain. The most distinctive feature to distinguish this species from other species is its leaf shape. Its leaf gets a very good round shape. And the leaf takes a round edged form. This clone is suitable for cultivation in all provinces of Sri Lanka and its special feature is its resistance to drought. Although the growth rate of the plant is slow in the beginning, this plant is able to give a very good fruit after two years. Because this clone is less affected by diseases, cultivation can be done very easily, minimizing the difficulties in cultivation.`,
  },
  'Type 26': {
    title: 'TRI 2026',
    description: `2000, 3000, 5000 tea plants have been transplanted by TRI in Sri Lanka. The clone TRI 2026 belongs to the TRI 2000 strain. The most distinguishing characteristic of this clone is its leaf shape. Considering its leaf, the shape is thin and oblong. And the edge of the leaf is wavy. It is suitable for areas such as the lowlands of Sri Lanka, but does not tolerate dry climates. Although the growth rate of the plant is very fast, the durability of this plant is very low. Also, due to the high impact of diseases, care should be taken during cultivation. After two years of planting this clone, it will be possible to get a very good yield of leaves.`,
  },
  'Type Purple': {
    title: 'TRI 2043',
    description: `2000, 3000, 5000 tea plants have been transplanted by TRI in Sri Lanka. The clone TRI 2043 belongs to the TRI 2000 strain. The most distinguishing characteristic of this clone is the nature of its leaves. Considering its leaf, its leaf shape is slightly elongated. Its most special feature is that the leaf acquires a purple color. This clone is suitable for growing in any part of Sri Lanka and the ability to grow even in a windy environment is a unique feature of this clone. It is a clone of tea plants that can be cultivated very successfully because the possibility of suffering from diseases is very minimal. This clone bears the alias "China Tea" and is used to produce "Silver Tips" tea leaves.`,
  },
};

const ImageUpload = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSignUp = async () => {
    const formData = new FormData();
    formData.append('file', avatar);

    try {
      const response = await fetch(env.ML_URL + '/predict-tea-plant', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        Notiflix.Report.success(
          'Success',
          'Image uploaded successfully',
          'Okay'
        );
        setPrediction(result);
      } else {
        throw new Error(result.message || 'Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Notiflix.Notify.failure('Error uploading image. Please try again.');
    }
  };

  return (
    <>
      <div className='form-body'>
        <video autoPlay loop muted className='video-background'>
          <source src={process.env.PUBLIC_URL + '/videos/sample.mp4'} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        
        <div className="max-w-md mx-auto mt-8 p-6 rounded-md shadow-md container form-container form-container-lg">
          <div className="logo-container">
            <img src={process.env.PUBLIC_URL + '/images/logo-em.png'} height={60} alt='logo' />
            <span className='custom-title'>TeaPlant</span>
          </div>
          <div className='form-columns'>
            <div className="left-column">
              <h1 className="text-3xl font-semibold mb-6">Image Uploader</h1>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Image of tea plant you need to identify
              </label>

              <div className="mb-4">
                <input
                  type="file"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  onChange={handleFileChange}
                />
                {preview && (
                  <div className="preview-container mt-4">
                    <img src={preview} alt="Avatar Preview" className="rounded-md" />
                  </div>
                )}
              </div>

              <button
                className="custom-button light mr-3"
                onClick={handleSignUp}
              >
                Predict
              </button>

              <p className="mt-4 text-center text-gray-600">
                Go Back{' '}
                <Link to="/" className="custom-link">
                  To Home
                </Link>
              </p>
            </div>
            {prediction && <div className="right-column">
              {prediction && (
                <div className="prediction-result mt-4 p-4 rounded-md shadow-md">
                  <h4 className="text-xl font-semibold">Prediction Result:</h4>
                  {/* <p className="mt-2">Predicted Class: {prediction.predicted_class}</p> */}
                  {plantDetails[prediction.predicted_class] && (
                    <>
                      <h5 className="text-lg font-semibold mt-4">{plantDetails[prediction.predicted_class].title}</h5>
                      <p className="mt-2">{plantDetails[prediction.predicted_class].description}</p>
                    </>
                  )}
                </div>
              )}
            </div>}
          </div>
          
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default ImageUpload;
