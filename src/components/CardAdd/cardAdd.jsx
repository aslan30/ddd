import React, { useRef, useState, useEffect } from 'react';
import с from './styles.module.css';

function CardAdd({ onAddCard }) {
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString());
    const [deadlineDate, setDeadlineDate] = useState(new Date(new Date().setDate(new Date().getDate() + 5)).toISOString());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date().toISOString());
        }, 1000);

        const intervalDeadline = setInterval(() => {
            setDeadlineDate(new Date(new Date().getTime() + 1 * 60 * 1000).toISOString());
        }, 1000);

        return () => {
            clearInterval(interval);
            clearInterval(intervalDeadline);
        };
    }, []);

    const cardSave = (e) => {
        e.preventDefault();

        const newCard = {
            id: Date.now(),
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            date_add: currentDate,
            deadline: deadlineDate,
            status: "not done"
        };

        onAddCard(newCard);

        alert('Создание заметки прошло успешно!!!');
        e.target.reset();
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString();
    };

    return (
        <div className={с.add_card}>
            <form id='form_card' className={с.form_card} onSubmit={cardSave}>
                <label htmlFor='title' className={с.labelTitle}>Title:</label>
                <input type="text" id='title' className={с.title} ref={titleRef} />
                
                <label htmlFor='description' className={с.labelDescription}>Description:</label>
                <textarea id='description' className={`${с.description} ${с.textarea}`} ref={descriptionRef} />
                
                <div className={с.dateSection}>
                    <p className={с.date}>Date:</p>
                    <p className={с.date_add} id='date_add'>{formatDate(currentDate)}</p>
                </div>
                
                <div className={с.dateSection}>
                    <p className={с.dateDeadline}>Deadline:</p>
                    <p className={с.deadline} id='deadline'>{formatDate(deadlineDate)}</p>
                </div>
                
                <button type='submit' id='add_card' className={с.addButton}>Создать заметку</button>
            </form>
        </div>
    );
}

export default CardAdd;
