import React, { useState, useEffect } from 'react';
import Card from './Card';
import { Button } from '@nextui-org/react'
import { ArrowLeftCircle, ArrowRightCircle } from 'react-feather';
import axios from 'axios';
import { Link } from 'react-router-dom';


interface Card {
  question: string;
  answer: string;
  id: string;
}

const AllCards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  const removeCard = async (id: string) => {
    try {
      console.log("Removing card with id:", id);
      const response = await axios.delete(`https://autocard-backend.vercel.app/cards/${id}`);
      if (response.status === 204) {
        console.log("Card deleted successfully");
        // Optionally, update the UI by removing the card from the state
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get<Card[]>('https://autocard-backend.vercel.app/cards');
            setCards(response.data); // Update the state with the fetched cards
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };
    console.log(cards)
    fetchData();
}, []); // Empty dependency array to run once on mount

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {cards.length > 0 ? (
        <>
      {/* Carousel Container */}
      <div className="overflow-hidden w-full flex justify-center mb-8">
        {/* Carousel */}
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${cards.length * 100}%`,
          }}
        >
          {cards.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-full flex items-center justify-center"
              style={{ minWidth: '100vw' }} // Ensure each card takes full width
            >
              <Card question={item.question} answer={item.answer} id={item.id} removeCard={removeCard}/>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between"> 
        <Button
          variant="flat"
          color="warning"
          onClick={handlePrev}
          isIconOnly
        >
          <ArrowLeftCircle />
        </Button>
        <Button
         variant="flat"
         color="warning"
          onClick={handleNext}
          isIconOnly
        >
         <ArrowRightCircle />
        </Button>
      </div>
      </>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen w-full text-center">
          <p style={{marginBottom: "20px", fontSize: "20px"}}>No cards added. Add a card!</p>
          <Link to="/">
            <Button variant="flat" color="warning">Create card</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AllCards;