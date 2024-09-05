import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notiflix from 'notiflix';
import jsPDF from 'jspdf';
import Footer from '../components/footer/Footer';
import './form.css';
import env from '../data/env';

const plantDetails = {
  'Type 25': {
    title: 'TRI 2025',
    description: [
      'This clone is drought tolerant.',
      'Suitable for cultivation in all provinces of Sri Lanka.',
      'Early growth rate of the plant is low.',
      'After two years the fruit of the tea plant can be obtained.',
      'The durability of the tea plant is very long.',
      'Tea leaf yield is less compared to other clones.',
      'Cultivation is very easy as the impact of diseases is very low.',
      'Any type of soil suitable for tea cultivation is suitable and fertilization can be done as usual.',
    ],
  },
  'Type 26': {
    title: 'TRI 2026',
    description: [
      'Suitable for lowland to midland areas of Sri Lanka.',
      'This clone does not tolerate dry climates.',
      'Tea leaves can be harvested after two years.',
      'Here the yield of tea leaves is very high.',
      'The growth rate of tea plants is very high.',
      'The durability of the tea plant is very short.',
      'The possibility of disease transmission is very high.',
      'Any soil group suitable for tea cultivation is suitable and fertilization can be done as usual.',
    ],
  },
  'Type Purple': {
    title: 'TRI 2043',
    description: [
      'Suitable for all provinces of Sri Lanka.',
      'The growth of the plant is very slow.',
      'It is very suitable for cultivation even under windy environmental conditions.',
      'A very good harvest of tea leaves can be obtained.',
      'The longevity of the tea plant is very good.',
      'The possibility of getting sick is very less.',
      'Any soil suitable for growing tea plants is suitable for this and fertilization can be done as usual.',
    ],
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

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('Guidelines for planting:', 10, 10);
    
    if (plantDetails[prediction.predicted_class]) {
      const details = plantDetails[prediction.predicted_class];
      doc.setFontSize(16);
      doc.text(details.title, 10, 20);

      doc.setFontSize(12);
      details.description.forEach((item, index) => {
        doc.text(`${index + 1}. ${item}`, 10, 30 + (index * 10));
      });
    }

    doc.save('prediction_result.pdf');
  };

  return (
    <>
      <div className='form-body'>
        <video autoPlay loop muted className='video-background'>
          <source src={process.env.PUBLIC_URL + '/videos/sample.mp4'} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        
        <div className={`max-w-md mx-auto mt-8 p-6 rounded-md shadow-md container form-container ${prediction?'form-container-lg':''}`}>
          <div className="logo-container">
            <img src={process.env.PUBLIC_URL + '/images/logo-em.png'} height={60} alt='logo' />
            <span className='custom-title'>TeaClone</span>
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
                  {plantDetails[prediction.predicted_class] && (
                    <>
                      <h5 className="text-lg font-semibold mt-4">{plantDetails[prediction.predicted_class].title}</h5>
                      <nl className="mt-2 list-disc list-inside">
                        {plantDetails[prediction.predicted_class].description.map((item, index) => (
                          <li key={index}><b>{index+1}.</b> {item}</li>
                        ))}
                      </nl>
                      <button
                        className="custom-button light mt-4"
                        onClick={handleDownloadPDF}
                      >
                        Download PDF
                      </button>
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
