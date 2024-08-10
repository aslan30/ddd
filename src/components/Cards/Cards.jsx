import React, { useState } from 'react';
import Card from '../card/card';
import n from './styles.module.css';

// Функция фильтрации карточек
const filterCards = (cards, filter) => {
    const currentDate = new Date();

    switch (filter) {
        case 'done':
            return cards.filter(card => card.status === 'done' || card.status === 'done late');
        case 'done_late':
            return cards.filter(card => card.status === 'done late');
        case 'not_done':
            return cards.filter(card => card.status !== 'done' && card.status !== 'done late');
        case 'expired':
            return cards.filter(card => new Date(card.deadline) < currentDate && card.status !== 'done' || card.status !== 'done late');
        case 'all':
        default:
            return cards;
    }
};

function Cards({ cardsData, onCardStatusChange, onCardDelete }) {
    const [filter, setFilter] = useState('all');
    const [limit, setLimit] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setCurrentPage(1); // Сбросить текущую страницу при изменении фильтра
    };

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setCurrentPage(1); // Сбросить текущую страницу при изменении лимита
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const filteredCards = filterCards(cardsData, filter);

    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCards = filteredCards.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredCards.length / limit);


    // Для заголовка 
    const getHeaderText = (filter) => {
        switch (filter) {
            case 'done':
                return 'Completed';
            case 'done_late':
                return 'Completed Late';
            case 'not_done':
                return 'Not Completed';
            case 'expired':
                return 'Expired';
            case 'all':
            default:
                return 'All Cards';
        }
    };

    return (
        <div className={n.cardsListView}>
            <div className={n.filterContainer}>
                <label htmlFor='filter' className={n.filterLabel}>Filter:</label>
                <select id='filter' className={n.filterSelect} value={filter} onChange={handleFilterChange}>
                    <option value='all'>All</option>
                    <option value='done'>Completed</option>
                    <option value='done_late'>Completed Late</option>
                    <option value='not_done'>Not Completed</option>
                    <option value='expired'>Expired</option>
                </select>

                <label htmlFor='limit' className={n.filterLabel}>Limit:</label>
                <select id='limit' className={n.filterSelect} value={limit} onChange={handleLimitChange}>
                    <option value={8}>8</option>
                    <option value={16}>16</option>
                    <option value={24}>24</option>
                    <option value={32}>32</option>
                </select>
            </div>

            <div className={n.hac}>
                {filteredCards.length > 0 ? (
                    <h2 className={n.hac}>{getHeaderText(filter)}</h2>
                ) : (
                    <h2>No cards</h2>
                )}
            </div>

            <div className={n.allcards}>
                {paginatedCards.length > 0 ? (
                    paginatedCards.map((card) => (
                        <Card
                            key={card.id}
                            cardData={card}
                            onCardStatusChange={onCardStatusChange}
                            onCardDelete={onCardDelete}
                        />
                    ))
                ) : (
                    <p>No card data available</p>
                )}
            </div>
            
            <div className={n.pagination}>
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    &laquo; Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                >
                    Next &raquo;
                </button>
            </div>
        </div>
    );
}

export default Cards;
