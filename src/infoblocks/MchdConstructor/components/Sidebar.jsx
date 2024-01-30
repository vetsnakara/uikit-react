export const Sidebar = () => (
    <nav className="navigation">
        <button className="navigation__preview" aria-expanded="false" role="combobox" aria-haspopup="listbox">
            Сведения о доверенности
        </button>
        <div className="navigation__list">
            <a href="#chapter-1" className="navigation__item navigation__item_active">
                Сведения о доверенности
            </a>
            <a href="#chapter-2" className="navigation__item">
                Сведения о доверителе
            </a>
            <a href="#chapter-3" className="navigation__item">
                Сведения о представителе
            </a>
            <a href="#chapter-4" className="navigation__item">
                Сведения о полномочиях
            </a>
        </div>
    </nav>
);
