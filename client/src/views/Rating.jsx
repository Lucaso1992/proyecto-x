import React, { useState } from 'react';
import StarRating from '../components/StarRating';

const RatingSystem = () => {
  const [ratings, setRatings] = useState([]);
  const [currentRating, setCurrentRating] = useState(0);

  const handleSubmit = () => {
    if (currentRating > 0) {
      setRatings([...ratings, currentRating]);
      setCurrentRating(0); // Restablece la calificación actual
    }
  };

  const getAverageRating = () => {
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return (total / ratings.length).toFixed(1); // Calcula el promedio con un decimal
  };

  return (
    <div>
      <h2>Valora este servicio</h2>
      <StarRating rating={currentRating} setRating={setCurrentRating} />
      <button onClick={handleSubmit}>Enviar valoración</button>

      {ratings.length > 0 && (
        <div>
          <h3>Promedio de calificaciones: {getAverageRating()} estrellas</h3>
        </div>
      )}
    </div>
  );
};

export default RatingSystem;
