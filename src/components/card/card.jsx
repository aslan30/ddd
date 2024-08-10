import React, { useState, useEffect } from 'react';
import cl from './styles.module.css';

const isDeadlineExpired = (deadline) => {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    return deadlineDate < currentDate;
};

function Card({ cardData, onCardStatusChange, onCardDelete }) {
    const [isExpired, setIsExpired] = useState(isDeadlineExpired(cardData.deadline));
    const [status, setStatus] = useState(cardData.status);
    const [hasBeenMarked, setHasBeenMarked] = useState(status === 'done' || status === 'done late');

    useEffect(() => {
        if (status !== 'done') {
            setIsExpired(isDeadlineExpired(cardData.deadline));
        }
    }, [cardData.deadline, status]);

    const handleMarkAsDone = () => {
        if (hasBeenMarked) {
            return;
        }

        const updatedStatus = isExpired ? 'done late' : 'done';
        const updatedData = { ...cardData, status: updatedStatus };
        onCardStatusChange(updatedData);
        setStatus(updatedStatus);
        setHasBeenMarked(true);
    };

    const handleDelete = () => {
        if (window.confirm('Вы действительно хотите удалить эту заметку?')) {
            onCardDelete(cardData.id);
            alert('Заметка успешно удалена!!!')
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }
        return date.toLocaleString();
    };

    return (
        <div className={`${cl.cardList} ${isExpired ? cl.expired : ''}`}>
            <h3>Card Details</h3>
            <p><strong>Title:</strong> {cardData.title}</p>
            <p><strong>Description:</strong> {cardData.description}</p>
            <p><strong>Date Added:</strong> {formatDate(cardData.date_add)}</p>
            <p><strong>Deadline:</strong> {formatDate(cardData.deadline)}</p>
            {isExpired && status !== 'done' && <p className={cl.deadlineExpired}>Deadline expired!</p>}
            <p><strong>Status:</strong> {status}</p>
            <div className={cl.buttons}>
                {!hasBeenMarked && status !== 'done late' && (
                    <button type='button' className={cl.done} onClick={handleMarkAsDone}>
                        Mark as Done
                    </button>
                )}
                <button type='button' className={cl.delete} onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Card;
