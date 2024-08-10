import cnd from './styles.module.css';
import CardAdd from '../../components/CardAdd';


document.addEventListener('DOMContentLoaded', function() {
    const titleCheckbox = document.getElementById('title-checkbox');
    document.addEventListener('click', function(event) {
        const titleDropdown = document.querySelector('.title-dropdown');
        if (titleDropdown && !titleDropdown.contains(event.target) && event.target !== titleCheckbox) {
            titleCheckbox.checked = false;
        }
    });
});

export function Header({ onAddCard }) {
    return (
        <div className={cnd.header}>
            <a href="http://localhost:3000/?" className={cnd.logo}><span>My</span>Tittle</a>
            <div className={cnd.title}>
                <input type="checkbox" id="title-checkbox" />
                <label htmlFor="title-checkbox" className={cnd.title}>
                    AddTittle
                    <div className={cnd.title_dropdown}>
                        <CardAdd onAddCard={onAddCard} />
                    </div>
                </label>
            </div>
        </div>
    );
}

export default Header;
