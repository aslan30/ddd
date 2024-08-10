import cnb from './styles.module.css';

function Footer() {
    return (
        <div className={cnb.footers}>
            <a href="http://localhost:3000/?" className={cnb.footer__logo}><span>My</span>Tittle</a>
        </div>
    );
}

export default Footer;